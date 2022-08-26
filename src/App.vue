<template>
  <div id="app">
    <TextPage v-if="remainingTime > 0" />
    <StatsPage v-else />
  </div>
</template>

<script>
import TextPage from "./components/TextPage";
import StatsPage from "./components/StatsPage";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    TextPage,
    StatsPage
  },
  computed: mapGetters(["remainingTime"]),
  methods: {
    ...mapActions(["resetTimer"])
  },
  mounted() {
    this.resetTimer();
  }
};
</script>

<style>
* {
  --content-font-size: 26px;

  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Lucida Console", Monaco, monospace;
}

.text-page {
  min-height: 100vh;
  overflow: hidden;
}

.timer {
  text-align: center;
  margin-top: 15%;
  font-size: 50px;
}

.content {
  display: flex;
  flex-flow: row wrap;
  font-size: var(--content-font-size);
  margin: 2% 20%;
  max-height: calc(var(--content-font-size) * 4.15);
  overflow: hidden;
}

.content:focus {
  outline: none;
}

.center-btn {
  text-align: center;
}

.cursor-line {
  position: absolute;
  min-height: 1.45em;
  margin-left: -1px;
}

.word {
  margin-left: 0.6em;
  display: flex;
  flex-direction: row;
  border-bottom: transparent solid;
  border-bottom-width: 2px;
}

.word.incorrect {
  border-bottom-color: red;
}

.char {
  color: grey;
}

.char.correct {
  color: black;
}

.char.incorrect {
  color: red;
}

.char.extra {
  color: brown;
}

.content:focus .char.leftCursor {
  border-left: darkblue solid 2px;
  margin-left: -2px;
}

.content:focus .char.rightCursor {
  border-right: darkblue solid 2px;
  margin-right: -2px;
}

.stats-container {
  min-height: 100vh;
  overflow: hidden;
  justify-content: center;
}

.stats-top {
  font-size: 50px;
  margin-top: 10%;
  text-align: center;
}

.stats-bottom {
  font-size: 25px;

  text-align: center;
}
.chart-container {
  position: relative;
  margin: auto;
  max-height: 60%;
  max-width: 60%;
}
</style>
