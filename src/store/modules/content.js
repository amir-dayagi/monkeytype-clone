import { Word, WordBank } from "../../necessities/classes";

const state = {
  wordGetter: new WordBank(),
  content: [],
  wordIdx: 0
};

const getters = {
  content: state => state.content,
  displayedContent: state => state.content.filter(word => word.row >= 1),
  wordIdx: state => state.wordIdx,
  getWord: state => idx => state.content[idx]
};

const actions = {
  fetchContent({ commit, dispatch }) {
    if (document.getElementsByClassName("content")[0]) {
      const rowWidth = window.innerWidth * 0.6;
      const letterWidth =
        parseInt(
          window.getComputedStyle(document.getElementsByClassName("content")[0])
            .fontSize
        ) * 0.6;

      const arr = [];

      let rowCount = 1;
      let currWidth = letterWidth;
      while (rowCount <= 3) {
        const nextWord = state.wordGetter.nextWord();
        currWidth += nextWord.length * letterWidth;
        if (currWidth > rowWidth) {
          rowCount++;
          currWidth = nextWord.length * letterWidth + letterWidth;
        }
        currWidth += letterWidth;
        arr.push(new Word(nextWord, dispatch, rowCount));
      }
      state.wordGetter.previousWord();
      arr.pop();

      commit("setContent", arr);
      state.content[0].activeSwitch();
    }
  },

  changeWordIdxBy(obj, amount) {
    if (
      state.wordIdx + amount >=
        state.content.findIndex(word => word.row === 1) &&
      state.wordIdx + amount < state.content.length
    ) {
      state.content[state.wordIdx].activeSwitch();
      obj.commit("setWordIdx", state.wordIdx + amount);
      state.content[state.wordIdx].activeSwitch();
      obj.dispatch("changeCorrect", amount);
    }
    if (state.content[state.wordIdx].row === 3) {
      actions.rowChange(obj);
    }
  },

  rowChange(obj) {
    const newRow = [];

    const rowWidth = window.innerWidth * 0.6;
    const letterWidth =
      parseInt(
        window.getComputedStyle(document.getElementsByClassName("content")[0])
          .fontSize
      ) * 0.6;

    let currWidth = letterWidth;
    while (currWidth < rowWidth) {
      const nextWord = state.wordGetter.nextWord();
      currWidth += nextWord.length * letterWidth + letterWidth;
      newRow.push(new Word(nextWord, obj.dispatch, 3));
    }
    state.wordGetter.previousWord();
    newRow.pop();

    actions.addRow(obj, newRow);
  },

  addRow({ commit }, newRow) {
    state.content.forEach(word => {
      word.row--;
    });
    commit("addToContent", newRow);
    // commit("setDisplayedContent", newDisplayedContent);
  },

  resetContent(obj) {
    actions.fetchContent(obj);
    obj.commit("setWordIdx", 0);
  }
};

const mutations = {
  setContent: (state, content) => (state.content = content),
  addToContent: (state, addition) => state.content.push(...addition),
  setWordIdx: (state, idx) => (state.wordIdx = idx)
};

export default {
  state,
  getters,
  actions,
  mutations
};
