const state = {
  time: 30,
  remainingTime: -1,
  timerInterval: undefined
};

const getters = {
  time: state => state.time,
  remainingTime: state => state.remainingTime,
  timerInterval: state => state.timerInterval
};

const actions = {
  startTimer(obj) {
    if (!state.timerInterval) {
      obj.commit(
        "setTimerInterval",
        setInterval(() => {
          if (state.remainingTime > 0) {
            obj.commit("setRemainingTime", --state.remainingTime);
            obj.dispatch("addCalcStat", state.time - state.remainingTime);
          } else {
            actions.endTimer(obj);
          }
        }, 1000)
      );
    }
  },

  endTimer({ commit }) {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      commit("setTimerInterval", undefined);
    }
  },

  resetTimer(obj) {
    actions.endTimer(obj);
    obj.commit("setRemainingTime", state.time);
  },

  changeTime({ commit }, newTime) {
    commit("setTime", newTime);
  }
};

const mutations = {
  setTime: (state, time) => (state.time = time),
  setRemainingTime: (state, remainingTime) =>
    (state.remainingTime = remainingTime),
  setTimerInterval: (state, timerInterval) =>
    (state.timerInterval = timerInterval)
};

export default {
  state,
  getters,
  actions,
  mutations
};
