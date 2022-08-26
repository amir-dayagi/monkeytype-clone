import Vue from "vue";
import Vuex from "vuex";
import content from "./modules/content";
import timer from "./modules/timer";
import stats from "./modules/stats";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    content,
    timer,
    stats
  }
});
