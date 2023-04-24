import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from "element-ui"

Vue.use(VueRouter)
//重写路由push方法，捕获重定向路由错误
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

const routes = [
  {
    path: "/",
    redirect: "/about"
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About"),
    meta: {
      title: "Mr.Xiao | 关于我"
    }
  },
  {
    path: "/articles",
    name: "Articles",
    component: () => import("@/views/Articles"),
    meta: {
      title: "Mr.Xiao | 文章列表",
      search:""
    }
  },
  {
    path: "/articles/:id",
    name: "Article",
    component: () => import("@/views/Article"),
    meta: {
      title: "Mr.Xiao | 文章详情"
    }
  },
  {
    path: "/compiler",
    name: "Compiler",
    component: () => import("@/views/Compiler"),
    meta: {
      title: "Mr.Xiao | 文章编辑"
    }
  },
  {
    path: "/socket",
    name: "Socket",
    component: () => import("@/views/Socket"),
    meta: {
      title: "Mr.Xiao | 聊天室"
    }
  },
  {
    path: "/user",
    name: "User",
    component: () => import("@/views/UserInfo"),
    meta: {
      title: "Mr.Xiao | 个人中心"
    }
  },
]


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === "/compiler") {
    let token = sessionStorage.getItem("token")
    if (!token) {
      Message.warning("登录后才能发表文章哦~")
    }
  }
  next()
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
