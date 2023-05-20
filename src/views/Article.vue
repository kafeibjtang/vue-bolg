<template>
  <div class="article-data">
    <div class="separate">
      <h1>文章详情</h1>
      <span class="sub-separate">BlogView </span>
    </div>
    <div class="post-box">
      <h1 class="post-title">{{ articleData.title }}</h1>
      <div class="post-time">
        <span><i class="el-icon-time"></i>{{ articleData.date }}</span>
        <span><i class="el-icon-document"></i>{{ articleData.column?.name }}</span>
      </div>
      <div class="post-body typo">
        <div v-html="articleData.detailed" class="post-detailed typo" ref="detailed"></div>
        <div class="post-footer">
          <div class="post-footer-tags">
            <i class="el-icon-edit-outline" style="color: orangered; margin-right: 5px">
            </i>
            <span style="font-size: 14px">笔记<!----></span>
          </div>
          <div class="post-footer-tags">
            <i class="el-icon-user" style="color: orangered; margin-right: 5px">
            </i>
            <span style="font-size: 14px">作者：{{ articleData.writer?.nickname }}</span>
          </div>
        </div>
      </div>
      <div class="post-hit_num">
        <p><i class="el-icon-view"></i>{{ articleData.hit_num }}</p>
        <p>
          <i class="el-icon-star-off" :class="{ active: isLike }" @click="likeArticle"></i>
          {{ likeNums }}
        </p>
        <p>
          <i class="el-icon-chat-dot-round"></i>{{ articleData.comments?.length }}
        </p>
      </div>
    </div>
    <Comments :comments="articleData.comments" :articleId="articleData.id" @upData="getArticleDetails(articleData.id)" />
    <Footer />
  </div>
</template>

<script>
import { getArticle, likes } from "@/api";
import Comments from "@/components/Comments.vue";
import Footer from "@/components/Footer.vue";
export default {
  data() {
    return {
      articleData: {},
      id: "",
      isLike: false,
      time: null,
      likeNum: 0
    };
  },
  components: { Comments, Footer },
  mounted() {
    this.id = this.$route.params.id;
    this.getArticleDetails(this.id);
  },
  methods: {
    async getArticleDetails(id) {
      try {
        this.articleData = await getArticle(id);
        let uid = sessionStorage.getItem("uid")
        this.isLike = this.articleData.like_users?.includes(uid)
      } catch (error) {
        this.$message.error("获取文章失败");
        return Promise.reject(error);
      }
    },
    likeArticle() {
      //每次点击清除定时器，防止多次点击同时开启多个定时器
      clearTimeout(this.time)
      this.likeNum += this.isLike ? -1 : 1
      this.isLike = !this.isLike
      try {
        //10s内只触发一次点赞，防止多次请求
        this.time = setTimeout(async () => {
          await likes(this.id).then(() => {
            this.likeNum = 0
            this.getArticleDetails(this.id)
          })
        }, 5000)
      } catch (error) {
        return Promise.reject(error)
      }

    }
  },
  computed: {
    likeNums() {
      return this.articleData.like_num + this.likeNum
    }
  },
  beforeDestroy() {
    //组件销毁前判断定时器是否存在，如果有定时器，说明用户点击了点赞按钮需要发送请求
    if (this.time !== null) {
      clearTimeout(this.time)
      likes(this.id).then(() => {
        this.getArticleDetails(this.id)
      })
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/style/typo.css");

.article-data {
  margin: 0 15px;

  .active {
    color: #f5651e;
  }

  .post-box {
    padding: 20px;
    position: relative;

    .post-title {
      text-align: center;
      margin-bottom: 10px;
      font-weight: 700;
      font-size: 20px;
    }

    .post-time {
      text-align: center;
      color: #8697a8;
      font-size: 14px;
      text-transform: uppercase;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        margin: 10px;

        i {
          margin-right: 5px;
        }
      }
    }

    .post-body {
      color: #3c4e64;
      word-break: break-word;
      font-size: 16px;
      word-spacing: 10px;
      font-family: Trebuchet MS, Lucida Sans Unicode, Lucida Grande, Lucida Sans,
        Arial, sans-serif;
      text-indent: 2em;
      padding: 20px;

      .post-detailed {
        p {
          width: 100%;
          word-wrap: normal
        }
      }
    }

    .post-footer {
      margin-bottom: 2rem;
      margin-top: 2rem;
      padding-top: 2rem;
      position: relative;
      display: flex;
      justify-content: space-between;

      &::before {
        content: "";
        background-color: #f5651e;
        height: 1px;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 30%;
      }

      .post-footer-tags {
        padding-top: 20px;
        text-indent: 0;
      }
    }

    .post-hit_num {
      display: flex;
      justify-content: right;

      p {
        margin: 0 10px;
        color: #3c4e64;
        font-size: 16px;

        i {
          margin-right: 5px;
        }
      }
    }
  }

  .post-hit_num {
    display: flex;
    justify-content: right;

    p {
      margin: 0 10px;
      color: #3c4e64;
      font-size: 16px;

      i {
        margin-right: 5px;
      }
    }
  }

  .separate {
    position: relative;
    padding: 10px;

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
        width: 10%;
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
}
</style>