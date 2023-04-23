<template>
  <el-card>
    <div class="separate">
      <h1>文章分类</h1>
      <span class="sub-separate">BlogClassify </span>
    </div>
    <div class="articles-colunm">
      <div class="articles-colunm-tabs">
        <div class="articles-colunm-list">
          <span @click="getArticlesList" :class="{ 'tabs-active': idx === '1' }"
            >全部</span
          >
          <ul>
            <li
              v-for="item in columns"
              :class="{ 'tabs-active': item.id === idx }"
              :key="item.id"
              @click="columnList(item.id)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <el-button type="primary" icon="el-icon-plus" round @click="addColumns">
          添加分类</el-button
        >
      </div>
      <div class="articles-colunm-content">
        <div v-if="articleList.length === 0" class="listBoxShow">
          当前分类没有文章
          <router-link
            :to="{
              name: 'Compiler',
              params: {
                id: idx,
              },
            }"
            >去写一篇</router-link
          >
          吗？
        </div>
        <ArticleList v-else :articleslist="articleList" :maxWidth="'280px'" />
      </div>
    </div>
    <Footer />
  </el-card>
</template>

<script>
import { mapState } from "vuex";
import ArticleList from "@/components/ArticleList.vue";
import Footer from '@/components/Footer.vue';
import qs from "qs";
import { getColumns, getSearchData } from "@/api";
export default {
  data() {
    return {
      columns: [],
      idx: "1",
      q: ""
    };
  },
  components: {
    ArticleList, Footer
  },
  created() {
    //监听Dialog组件添加分类事件
    this.$bus.$on("upColumns", (id) => {
      this.getColumnsList(id)
    })
    //初始化获取分类列表
    this.getColumnsList();

    let val = this.$route.query.val
    if (val) {
      this.searchArticle(val)
      return false
    }
    //初始化获取全部文章
    this.$store.dispatch("article/getArticles")
  },

  methods: {
    //获取分类列表
    async getColumnsList(id) {
      try {
        let { list } = await getColumns();
        this.columns = list;
        //如果有id则重新获取当前分类、文章
        if (id) {
          this.columnList(id)
        }
      } catch (error) {
        this.$message.error(error.response.data.message);
        return Promise.reject(error);
      }
    },
    //获取当前分类的文章列表
    async columnList(id) {
      this.idx = id
      this.$store.dispatch("article/getColumnsArticle", id);
    },
    //获取全部文章
    getArticlesList() {
      this.$store.dispatch("article/getArticles").then(() => {
        this.idx = "1"
      })

    },
    //添加分类
    addColumns() {
      let token = sessionStorage.getItem("token")
      if (!token) {
        this.$message.error("请先登录")
        return false
      }
      //唤醒弹窗组件
      this.$store.dispatch("modal/formType", "postColumn");
    },
    //获取搜索文章
    async getSearchValue(data) {
      this.idx = "1"
      await getSearchData(qs.stringify(data)).then((res) => {
        this.$store.commit("article/GETARTICLES", res.list)
      })
    },
    searchArticle(val) {
      this.$router.push({ query: {} })
      let data = {}
      let q = val || undefined
      let query = JSON.parse(JSON.stringify({ q }))
      if (Object.entries(query).length > 0) {
        data.query = qs.stringify(query)
      }
      this.getSearchValue(data)
    }
  },
  computed: {
    ...mapState("article", ["articleList"]),
  },
  watch: {
    "$route.query.val"(val) {
      if (val) {
        this.searchArticle(val)
      }
    }
  }

};
</script>

<style scoped lang="less">
.el-card {
  flex: 6;
  margin: 0 15px;
  border-radius: 10px !important;

  /deep/.el-card__body {
    padding: 0 !important;
  }

  .separate {
    position: relative;
    padding: 10px;
    margin-bottom: 30px;

    h1 {
      font-size: 30px;
      position: relative;
      font-weight: 700;
      color: #44566c;

      &::after {
        content: "";
        position: absolute;
        bottom: -24px;
        left: 0;
        width: 15%;
        border-bottom: 4px solid #f56525;
        border-radius: 2px;
      }
    }

    .sub-separate {
      position: absolute;
      bottom: -10px;
      left: 12px;
      color: #d7d7d7;
    }
  }

  .articles-colunm-tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 25px;

    .articles-colunm-list {
      display: flex;
      align-items: center;

      span {
        padding: 5px 15px;
        cursor: pointer;
        color: #44566c;
        font-size: 16px;
      }

      ul {
        display: flex;
        box-sizing: border-box;
        flex-wrap: wrap;

        li {
          padding: 5px 15px;
          cursor: pointer;
          color: #44566c;
          font-size: 16px;
        }
      }
    }
  }

  .tabs-active {
    color: orangered !important;
  }

  .article-box {
    padding: 20px;
    display: flex;
  }

  .listBoxShow {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    min-height: 480px;

    a {
      margin: 0 10px;
    }
  }
}
</style>