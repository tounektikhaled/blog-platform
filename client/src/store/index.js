import { createStore } from 'vuex';
import auth from './auth';
import blog from './blog';

const store = createStore({
  modules: {
    auth,
    blog,
  },
});

export default store;
