const state = {
    blogPosts: [],
  };
  
  const mutations = {
    SET_BLOG_POSTS(state, posts) {
      state.blogPosts = posts;
    },
    ADD_BLOG_POST(state, post) {
      state.blogPosts.unshift(post);
    },
    UPDATE_BLOG_POST(state, { index, post }) {
      state.blogPosts.splice(index, 1, post);
    },
    DELETE_BLOG_POST(state, index) {
      state.blogPosts.splice(index, 1);
    },
  };
  
  const actions = {
    setBlogPosts({ commit }, posts) {
      commit('SET_BLOG_POSTS', posts);
    },
    addBlogPost({ commit }, post) {
      commit('ADD_BLOG_POST', post);
    },
    updateBlogPost({ commit }, { index, post }) {
      commit('UPDATE_BLOG_POST', { index, post });
    },
    deleteBlogPost({ commit }, index) {
      commit('DELETE_BLOG_POST', index);
    },
  };
  
  export default {
    state,
    mutations,
    actions,
  };
  