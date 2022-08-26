import { CalcStat } from "../../necessities/classes";

const state = {
  correct: 0,
  incorrect: 0,
  extra: 0,
  incomplete: 0,
  // error: 0,
  calcStats: []
  // accuracy: -1,
  // grossWpm: -1,
  // wpm: -1
};

const getters = {
  correct: state => state.correct,
  incorrect: state => state.incorrect,
  extra: state => state.extra,
  incomplete: state => state.incomplete,
  // error: state => state.error,
  calcStats: state => state.calcStats,
  // accuracy: state => state.accuracy,
  // grossWpm: state => state.grossWpm,
  wpm: state => state.wpm
};

const actions = {
  resetStats({ commit }) {
    commit("setCorrect", 0);
    commit("setIncorrect", 0);
    commit("setExtra", 0);
    commit("setIncomplete", 0);
    // commit("setErrors", 0);
    commit("setCalcStats", []);
  },
  changeCorrect(obj, amount) {
    if (state.correct + amount >= 0) {
      obj.commit("setCorrect", state.correct + amount);
    }
    // actions.calcAccuracy(obj);
    // actions.calcWpm(obj);
  },
  changeIncorrect(obj, amount) {
    obj.commit("setIncorrect", state.incorrect + amount);
    // actions.calcAccuracy(obj);
    // actions.calcWpm(obj);
  },
  changeExtra(obj, amount) {
    obj.commit("setExtra", state.extra + amount);
    // actions.calcAccuracy(obj);
    // actions.calcWpm(obj);
  },
  // changeError(obj, amount) {
  //   obj.commit("setError", state.error + amount);
  //   // actions.calcAccuracy(obj);
  //   // actions.calcWpm(obj);
  // },
  calcIncomplete({ commit }) {
    let ic = 0;
    this.content.some(word => {
      word.chars.forEach(char => {
        if (char.status === -1) {
          ic++;
        }
      });
      return word.isActive;
    });
    commit("setIncomplete", ic);
  },
  addCalcStat({ commit }, time) {
    const statsObj = {
      correct: state.correct,
      incorrect: state.incorrect,
      extra: state.extra,
      incomplete: state.incomplete,
      error: state.error,
      time
    };
    const newStat = new CalcStat(statsObj);

    commit("pushToCalcStat", newStat);
  }
  // calcAccuracy({ commit }) {
  //   const total = state.correct + state.incorrect + state.extra;
  //   const prec = (state.correct / total) * 100;
  //   commit("setAccuracy", Math.round(prec * 100) / 100);
  // },
  // calcGrossWpm({ commit, getters }) {
  //   const timeInMin = (getters.time - getters.remainingTime) / 60;
  //   const words = state.correct / 5;
  //   const WPM = words / timeInMin;
  //   commit("setGrossWpm", Math.round(WPM * 10) / 10);
  // },
  // calcWpm({ commit, getters }) {
  //   let sum = 0;
  //   state.calcStats.forEach(stat => {
  //     // if (idx > 0) {
  //     sum += stat.grossWpm;
  //     // }
  //   });
  //   const avg = sum / state.calcStats.length;
  //   const timeInMin = getters.time / 60;
  //   const errorPerMin = state.error / timeInMin;
  //   const wpm = avg - errorPerMin;
  //   commit("setWpm", Math.round(wpm * 100) / 100);
  // }
};

const mutations = {
  setCorrect: (state, correct) => (state.correct = correct),
  setIncorrect: (state, incorrect) => (state.incorrect = incorrect),
  setExtra: (state, extra) => (state.extra = extra),
  setIncomplete: (state, incomplete) => (state.incomplete = incomplete),
  setError: (state, error) => (state.error = error),
  setCalcStats: (state, calcStats) => (state.calcStats = calcStats),
  pushToCalcStat: (state, stat) => state.calcStats.push(stat),
  // setAccuracy: (state, accuracy) => (state.accuracy = accuracy),
  // setGrossWpm: (state, grossWpm) => (state.grossWpm = grossWpm),
  setWpm: (state, wpm) => (state.wpm = wpm)
};

export default {
  state,
  getters,
  actions,
  mutations
};
