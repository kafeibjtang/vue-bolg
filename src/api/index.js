import http from "../util/require";
//登录api
export const ResLogin = (parmas) => {
    return http.post('/admin/login', parmas)
}
//注册api
export const ResRegister = (parmas) => {
    return http.post('/admin/register', parmas)
}
//获取公钥api
export const getPubKey = () => {
    return http.get('/keys')
}

//获取文章列表
export const getArticleList = () => {
    return http.get('/api/rest/articles')
}
//获取文章详情
export const getArticle = (data) => {
    return http.get(`/api/rest/articles/${data}`)
}
//发表文章评论
export const postComment = (data) => {
    return http.post(`/api/rest/comments`, data)
}
//文章点赞
export const likes = (id) => {
    return http.post(`/articles/likes/${id}`)
}

//获取文章分类
export const getColumns = () => {
    return http.get("/api/rest/columns")
}
//获取文章分类详情
export const getcolumnList = (id) => {
    return http.get(`/api/rest/columns/${id}`)
}

//提交文章
export const uploadArticle = (data) => {
    return http.post("/api/rest/articles", data)
}
//添加分类
export const addColumnsList = (data) => {
    return http.post("/api/rest/column", data)
}

//查询文章
export const getSearchData = (data) => {
    return http.get(`/api/rest/articles/?${data}`)
}

//获取用户信息
export const getUserInfo = () => {
    return http.get("/userInfo")
}

//修改用户信息
export const putUser = (data) => {
    return http.put("/userInfo",data)
}