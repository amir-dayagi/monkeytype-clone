<template>
  <div
    class="content"
    tabindex="0"
    @keypress="keyPressHandler($event)"
    @keydown="keyDownHandler($event)"
  >
    <Word
      v-for="(word, idx) in displayedContent"
      :key="idx"
      v-bind:word="word"
    />
  </div>
</template>

<script>
import Word from "./Word";
import { mapGetters, mapActions } from "vuex";
import { KEY, WORD_STATUS } from "../necessities/constants";

export default {
  name: "Content",
  components: {
    Word
  },
  computed: mapGetters(["displayedContent", "wordIdx", "getWord"]),
  methods: {
    ...mapActions(["changeWordIdxBy", "startTimer", "resetContent"]),

    keyPressHandler(ev) {
      const keyInput = ev.key;
      const currentWord = this.getWord(this.wordIdx);

      this.startTimer();

      const inputType = currentWord.keyHandler(keyInput);
      if (inputType === KEY.SPACE) {
        this.changeWordIdxBy(1);
      }
    },

    keyDownHandler(ev) {
      const keyInput = ev.key;
      const currentWord = this.getWord(this.wordIdx);

      if (keyInput === "Backspace") {
        const inputType = currentWord.keyHandler(keyInput);
        if (inputType === KEY.BACKSPACE_START && this.wordIdx > 0) {
          const previousWord = this.getWord(this.wordIdx - 1);
          if (previousWord.status === WORD_STATUS.INCORRECT) {
            this.changeWordIdxBy(-1);
          }
        }
      }
    }
  },
  mounted() {
    this.resetContent();
  }
};
</script>

<style></style>
