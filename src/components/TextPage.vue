<template>
  <div class="text-page">
    <Timer />
    <Content />
    <div class="center-btn">
      <button @click="restart">Restart</button>
    </div>
  </div>
</template>

<script>
import Timer from "./Timer";
import Content from "./Content";
import { mapActions } from "vuex";

export default {
  name: "TextPage",
  components: {
    Timer,
    Content
  },
  methods: {
    ...mapActions(["resetContent", "resetStats", "resetTimer"]),
    restart() {
      this.resetTimer();
      this.resetContent();
      this.resetTimer();
    }
  }
};
</script>

<style></style>
