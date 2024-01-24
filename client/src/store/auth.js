const state = {
    user: null,
    token: null,
  };
  
  const mutations = {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    LOGOUT(state) {
      state.user = null;
      state.token = null;
    },
  };
  
  const actions = {
    login({ commit }, { user, token }) {
      commit('SET_USER', user);
      commit('SET_TOKEN', token);
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
  };
  
  export default {
    state,
    mutations,
    actions,
  };
  