<template>
  <div class="section">
    <div class="comment">
      <div class="frame">
        <div class="box">
          <textarea node-type="textarea" placeholder="一起来吐槽的神马,来盖楼吧" class="textarea-comment"
            v-model="content"></textarea>
        </div>
        <a><span class="oButton" @click="sendComment">
            <i class="el-icon-s-promotion" style="margin-right: 10px"></i> Send
            Message
          </span></a>
      </div>

      <div class="show">
        <div class="tl">评论区：{{ comments?.length }}</div>

        <div class="people" v-for="comment in comments" :key="comment.id">
          <div class="issuer-img">
            <img v-if="comment.uid.avatar" :src="comment.uid.avatar" alt="" />
            <i v-else class="el-icon-user-solid avatar"></i>
            <span class="issuer">{{ comment.uid?.nickname }}</span>
          </div>
          <span class="issue">{{ comment.content }}</span>
          <span class="time">{{ comment.date }}</span>
          <div>
            <a class="a3"><span class="reply">回复</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postComment } from "@/api";
export default {
  data() {
    return {
      content: "",
    };
  },
  props: ["comments", "articleId"],

  methods: {
    async sendComment() {
      let data = this.content.trim();
      if (data) {
        await postComment({
          aid: this.articleId,
          content: data,
        }).then((res) => {
          this.$message.success("评论成功");
          this.$emit("upData");
          this.content = "";
        }).catch((err) => {
          this.$message.error(err.response.data.message);
          return Promise.reject(err);
        });
        return false;
      }
      this.$message.info("先填写内容哦~");
    },
  },
  computed: {},
};
</script>

<style scoped lang="less">
.comment {
  padding: 10px;
  background-color: #f8fafb;

  .frame {
    position: relative;
    margin-bottom: 40px;
    padding: 10px;
    height: 200px;

    .box {
      position: relative;
      top: 45px;
      padding: 20px;
      height: 70px;
      border: 1px solid #ccc;
      border-radius: 10px;
      background-color: #f3f3f3;
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.4),
        inset 0 0 10px rgba(255, 255, 255, 0.4);

      textarea {
        margin: 0 auto;
        width: 100%;
        height: 100%;
        font-size: 16px;
        resize: none;
        outline: none;
        border: 0;
        background-color: #f3f3f3;
      }
    }

    a {
      position: relative;
      top: 55px;
      display: flex;
      justify-content: right;

      .oButton {
        background-image: linear-gradient(to right,
            #f62d12 0%,
            #f58c7e 50%,
            #f62d12 100%);
        background-size: 200% auto;
        border-radius: 30px;
        border: 0;
        box-shadow: 0 3px 35px #f62d1233, 0 8px 16px #f62d1226;
        color: #fff;
        cursor: pointer;
        font-size: 16px;
        font-weight: 400;
        line-height: inherit;
        white-space: nowrap;
        padding: 10px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .show {
    position: relative;
    padding: 15px;

    .tl {
      position: absolute;
      top: -31px;
      padding: 0 5px;
      text-align: center;
      line-height: 30px;
    }

    .people {
      padding: 15px;
      margin-bottom: 10px;
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.4),
        inset 0 0 10px rgba(255, 255, 255, 0.4);
      border-radius: 15px;
      position: relative;
      min-height: 80px;

      .issuer-img {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        color: #ccc;

        img {
          width: 50px;
          height: 50px;
          border-radius: 40%;
        }

        .issuer {
          margin: 5px 0 0 15px;
          font-size: 14px;
        }
      }

      .issue {
        margin: 5px 0 0 20px;
        width: 84%;
      }

      .time {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 14px;
        color: #9d9d9d;
      }

      .a3 {
        position: absolute;
        bottom: 15px;
        right: 25px;
      }
    }
  }
}
</style>