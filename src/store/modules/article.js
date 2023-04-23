import { getArticleList, getcolumnList } from "@/api"
import { Message } from "element-ui"
export default {
    namespaced: true,
    state: {
        articleList: [],
    },
    getters: {
        articles(state) {
            return state.articleList?.slice(0, 3)
        }
    },
    mutations: {
        GETARTICLES(state, data) {
            state.articleList = data
        }
    },
    actions: {
        async getArticles({ commit }) {
            try {
                let { list } = await getArticleList()
                commit("GETARTICLES", list)
            } catch (error) {
                Message.error(error)
            }
        },
        async getColumnsArticle({ commit }, id) {
            try {
                let { aids } = await getcolumnList(id)
                commit("GETARTICLES", aids)
            } catch (error) {
                Message.error(error)
            }
        }

    }
}
