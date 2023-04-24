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
      <div class="editor-box">
        <Toolbar style="border-bottom: 1px solid #f62d12" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor style="height: 500px; overflow-y: hidden" v-model="htmlData" :defaultConfig="editorConfig" :mode="mode"
          @onCreated="onCreated" />
      </div>
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
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { getColumns, uploadArticle } from "@/api";
import FooterVue from '@/components/Footer.vue';
export default {
  components: { Editor, Toolbar, FooterVue },
  data() {
    return {
      editor: null,
      htmlData: "",
      toolbarConfig: {},
      editorConfig: {
        placeholder: "请输入内容...",
      },
      mode: "default", // or 'simple'
      columns: "",
      checkList: "641e613b45ad351b7c9d2b2d",
      titleData: "",
    };
  },

  created() {
    let id = this.$route.params?.id
    if (id) {
      this.checkList = id
    }
    this.getColumnsList();
  },

  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor);
      let uploadImgConfig = editor.getMenuConfig("uploadImage");
      uploadImgConfig.server = "http://127.0.0.1:3000/upload/article";
      uploadImgConfig.uploadFileName = "file";
      uploadImgConfig.headers = {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      };
      uploadImgConfig.timeout = 5 * 1000;
      uploadImgConfig.customInsert = (res, insertFn) => {
        insertFn(res.data.src);
      };
      uploadImgConfig.onSuccess = (file, res) => {
        this.$message.success(`${file.name} 上传成功`);
      };
      uploadImgConfig.onError = (file, err, res) => {
        this.$message.error(`${file.name} 上传出错，请检查是否登录`);
      };
    },

    async getColumnsList() {
      try {
        let { list } = await getColumns();
        this.columns = list;
      } catch (error) {
        this.$message.error(err.response.data.message);

        return Promise.reject(error);
      }
    },
    clearData() {
      this.editor.clear();
      this.titleData = "";
      this.checkList = "";
    },
    async submitEditer() {
      let newContent = this.editor.getHtml().replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, reSrc) {
        let newImg = `<img  src="${reSrc}" style="width:50%;" />`;
        return newImg;
      });
      let data = {
        title: this.titleData,
        content: this.editor.getText(),
        detailed: newContent,
        column: this.checkList,
        cover: this.htmlData.match(/src="([^"']*)"/)?.[1],
        writer: sessionStorage.getItem("uid"),
      };
      if (!this.verificationContent(data)) {
        return false;
      }
      await uploadArticle(data).then((res) => {
        this.$message.success("上传成功");
        this.clearData();
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
        cover: "请上传封面图",
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
    const editor = this.editor;
    if (editor == null) {
      return false;
    }
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="less" scoped>
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
      border-top: 1px solid #f62d12;
      border-bottom: 1px solid #f62d12;
    }
  }

}
</style>