<template>
  <div class="article-data">
    <div class="separate">
      <h1>文章编辑</h1>
      <span class="sub-separate">BlogCompiler </span>
    </div>
    <div class="columns-box">
      <div class="columns-rad">
        <h4>文章分类：</h4>
        <el-radio-group v-model="checkList">
          <el-radio :label="item.id" v-for="item in columns" :key="item.id" :name="item.name">
            {{ item.name }}
          </el-radio>
        </el-radio-group>
      </div>
      <div class="columns-title">
        <h4>文章标题：</h4>
        <el-input placeholder="请输入内容" v-model="titleData" clearable>
        </el-input>
      </div>
    </div>
    <div class="editor">
      <div ref="Editor" class="editor-box typo"></div>
      <div class="editor-btn">
        <span class="oButton" @click="clearData">
          <i class="el-icon-delete-solid" style="margin-right: 10px"></i>
          Empty
        </span>
        <span class="oButton" @click="submitEditer">
          <i class="el-icon-s-promotion" style="margin-right: 10px"></i> Send
          Article
        </span>
      </div>
    </div>
    <FooterVue />
  </div>
</template>

<script>
import Editor from "wangeditor";
import { getColumns, uploadArticle, getArticleList } from "@/api";
import FooterVue from '@/components/Footer.vue';
export default {
  components: { FooterVue },
  data() {
    return {
      editor: null,
      htmlData: "",
      columns: "",
      checkList: "641e613b45ad351b7c9d2b2d",
      titleData: "",
      URL: 'http://111.230.17.116:3001/upload/article'
    };
  },

  created() {
    let id = this.$route.params?.id
    if (id) {
      this.checkList = id
    }
    this.getColumnsList();
  },
  mounted() {
    this.editor = new Editor(this.$refs.Editor)
    this.upload()
    this.editor.create()
  },

  methods: {
    upload() {
      this.editor.config.zIndex = 1
      this.editor.config.uploadImgServer = this.URL
      this.editor.config.uploadImgMaxSize = 5 * 1024 * 1024 // 5M
      this.editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
      this.editor.config.uploadImgMaxLength = 1
      this.editor.config.uploadFileName = 'file'
      this.editor.config.uploadImgHeaders = {
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
      }
      this.editor.config.menus = ['head', 'bold', 'fontSize', 'fontName', 'italic', 'underline', 'strikeThrough', 'indent', 'lineHeight', 'link', 'list', 'todo', 'justify', 'quote', 'code', 'splitLine', 'undo', 'redo', 'image',]
      this.editor.config.uploadImgHooks = {
        customInsert: function (insertImg, result, editor) {
          insertImg(result.data.src);
        }
      };
    },
    clearData() {
      this.editor.txt.clear()
    },

    async getColumnsList() {
      try {
        let data = await getColumns();
        this.columns = data;
      } catch (error) {
        this.$message.error(err.response.data.message);

        return Promise.reject(error);
      }
    },

    async submitEditer() {
      let newContent = this.editor.txt.html().replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, reSrc) {
        let newImg = ` <img src=${reSrc}  />`;
        return newImg;
      });
      let data = {
        title: this.titleData,
        content: this.editor.txt.text(),
        detailed: newContent,
        column: this.checkList,
        writer: sessionStorage.getItem("uid"),
      };
      if (!this.verificationContent(data)) {
        return false;
      }
      await uploadArticle(data).then((res) => {
        this.$message.success("上传成功");
        this.$router.push("/articles")
      }).catch((err) => {
        this.$message.error(err.response.data.message);
        return Promise.reject(err);
      });
    },
    verificationContent(data) {
      const dataMap = {
        title: "标题不能为空",
        content: "内容不能为空",
        column: "请选择分类",
      };
      let errData = Object.entries(data).filter(([key, value]) => {
        return !value || value.length === 0;
      })[0]?.[0]
      if (dataMap[errData]) {
        this.$message.error(dataMap[errData]);
        return false;
      }
      return true;
    },
  },
  beforeDestroy() {
    if (this.editor == null) {
      return false;
    }
    this.editor.destroy(); // 组件销毁时，及时销毁编辑器
    this.editor = null
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/style/typo.css");

.article-data {
  flex: 6;

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

  .columns-rad {
    padding: 10px 10px 10px 20px;
    display: flex;
    align-items: center;
  }

  .columns-title {
    display: flex;
    padding: 10px 20px;
    align-items: center;

    .el-input {
      flex: 8;

      /deep/.el-input__inner:focus {
        border: 1px solid #dcdfe6;
      }
    }
  }

  h4 {
    font-size: 16px;
    font-weight: 500;
    color: #44566c;
  }

  .editor-btn {
    display: flex;
    justify-content: right;
    padding: 20px 20px 0 20px;

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
      margin: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .editor {
    padding: 20px;

    .editor-box {
      min-height: 500px;
      border: none;
      border-top: 1px solid #f62d12;
      border-bottom: 1px solid #f62d12;

      /deep/.w-e-toolbar {
        border: none !important;
      }

      /deep/.w-e-text-container {
        border: none !important;
        height: 500px !important;
      }
    }
  }
}
</style>