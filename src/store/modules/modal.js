
export default {
    namespaced: true,
    state: {
        type: "",
        isShow: false,
    },
    getters: {
      
    },
    mutations: {
        ISSHOW(state) {
            state.isShow = !state.isShow
        },
        TYPE(state, data) {
            state.type = data
        },
     
    },
    actions: {
        formType({ commit }, data) {
            commit("ISSHOW")
            commit("TYPE", data)
        }
       
    }
}
