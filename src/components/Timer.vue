<template>
  <div class="timer">
    {{ remainingTime }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Timer",
  computed: mapGetters(["remainingTime"])
};
</script>

<style></style>
