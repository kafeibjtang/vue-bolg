<template>
  <el-dialog
    :title="title"
    :visible.sync="isShow"
    width="30%"
    :before-close="close"
  >
    <el-form
      :ref="type"
      :model="formList"
      :rules="rulesForm"
      label-width="80px"
    >
      <el-form-item
        v-for="item in formData"
        :key="item.query"
        :label="item.label"
        :prop="item.query"
      >
        <el-input
          v-model="formList[item.query]"
          :type="item.type"
          :name="item.query"
          :placeholder="item.placeholder"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button
        v-for="btn in btns"
        :key="btn.targetName"
        type="primary"
        @click="handlerBtn(btn.targetName, btn.isSubmit)"
        >{{ btn.name }}</el-button
      >
    </span>
  </el-dialog>
</template>
  
<script>
import Modal from "./config/LoginConfig";
import Form from "./config/Form";
import { mapState } from "vuex";
import { addColumnsList } from "@/api"

export default {
  data() {
    return {
      formList: {},
      rulesForm: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 1, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    handlerBtn(btnType, submit) {
      if (submit) {
        this.submitForm(this.type);
        return false;
      }
      this[btnType] && this[btnType]();
    },
    close() {
      this.$store.commit("modal/ISSHOW");
      this.$refs[this.type].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (formName === "postColumn") {
            try {
              await addColumnsList(this.formList).then(({ id }) => {
                this.$bus.$emit("upColumns", id)
                this.close()
              })
            } catch (error) {
              this.$message.error(error.response.data.message)
              return Promise.reject(error)
            }
            return false
          }
          this.$store.dispatch(formName, this.formList).then(() => {
            this.close()
            this.$message.success("登录成功")
          })
        } else {
          this.$message.error("请检查输入格式是否正确")
          return false;
        }
      });
    },
  },

  computed: {
    ...mapState("modal", ["isShow", "type"]),
    title() {
      return Modal[this.type]?.title ?? "默认";
    },
    btns() {
      return Modal[this.type]?.btns ?? "默认";
    },
    formData() {
      return Form[this.type];
    },
  },
  watch: {
    type(newVal) {
      if (Form[newVal]) {
        this.formList = Form[newVal].reduce((acc, curr) => {
          acc[curr["query"]] = "";
          return acc;
        }, {});
      }
    },
  },
};
</script>
  
<style scoped lang="less">
/deep/.el-dialog {
  border-radius: 20px;
  min-width: 365px !important;
}
</style>