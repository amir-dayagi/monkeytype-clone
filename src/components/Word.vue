<template>
  <div
    class="word"
    :class="{
      incorrect: word.status === WORD_STATUS.INCORRECT
    }"
  >
    <span
      class="char"
      v-for="(char, idx) in word.chars"
      :key="idx"
      :class="{
        correct: char.status === CHAR_STATUS.CORRECT,
        incorrect: char.status === CHAR_STATUS.INCORRECT,
        extra: char.status === CHAR_STATUS.EXTRA,
        leftCursor: char.cursor === CURSOR.LEFT,
        rightCursor: char.cursor === CURSOR.RIGHT
      }"
    >
      {{ char.char }}
    </span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { CHAR_STATUS, CURSOR, WORD_STATUS } from "../necessities/constants";

export default {
  name: "Word",
  props: ["word"],
  computed: {
    ...mapGetters(["getWord"])
  },
  data() {
    return {
      CHAR_STATUS,
      CURSOR,
      WORD_STATUS
    };
  }
};
</script>

<style></style>
