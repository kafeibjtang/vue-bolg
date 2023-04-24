<template>
  <div>
    <div class="separate">
      <h1>个人中心</h1>
      <span class="sub-separate">PersonalCenter </span>
    </div>
    <div class="userInfo">
      <div class="userInfo-title">
        <div class="userInfo-avatar">
          <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="" />
          <i v-else class="el-icon-s-custom"></i>
        </div>
        <div class="userInfo-signature">
          <p>
            <i class="el-icon-edit"></i>
            {{ userInfo.signature }}
          </p>
        </div>
        <div class="userInfo-name">
          <p>
            <i class="el-icon-postcard"></i>昵称：<em>{{
              userInfo.nickname
            }}</em>
          </p>
          <p>
            <i class="el-icon-mobile-phone"></i>账号：<em>{{
              userInfo.username
            }}</em>
          </p>
          <p>
            <i class="el-icon-message"></i>邮箱：<em>{{ userInfo.email }}</em>
          </p>
          <p class="userInfo-set" @click="setInfo">
            <i class="el-icon-setting"></i>修改资料
          </p>
        </div>
      </div>
      <div class="userInfo-article">
        <!-- <div class="userInfo-comments">
          <h2 class="title">发布的分类：{{ userInfo.columnCount }}</h2>
          <span class="sub-title">Published articles</span>
        </div> -->
        <div class="userInfo-articles">
          <h2 class="title">发表过的文章：{{ userInfo.articleCount }}</h2>
          <span class="sub-title">Published articles</span>
        </div>
      </div>
    </div>
    <Footer />
    <el-dialog title="个人信息" :visible.sync="dialogVisible" :before-close="close" width="30%">
      <el-form ref="user" :model="userInfo" label-width="80px">
        <div class="setAvatar">
          <p>上传头像</p>
          <el-upload class="avatar-uploader" ref="upload" action="http://127.0.0.1:3000/upload/user" :headers="headers"
            :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarError"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl ? imageUrl : userInfo.avatar" :src="imageUrl ? imageUrl : userInfo.avatar"
              class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <el-form-item v-for="item in userFrom" :key="item.query" :label="item.label" :prop="item.query">
          <el-input v-model="userInfo[item.query]" :type="item.type" :name="item.query" :placeholder="item.placeholder"
            :disabled="item.readonly"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="putUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Form from "@/components/config/Form";
import { getUserInfo, putUser } from "@/api"
import Footer from '@/components/Footer.vue';
export default {
  data() {
    return {
      userInfo: {},
      dialogVisible: false,
      imageUrl: "",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      }
    }
  },
  components: {
    Footer
  },
  created() {
    //初始化获取用户信息
    this.getUser()

  },

  methods: {
    //获取用户信息
    async getUser() {
      if (!sessionStorage.getItem("token")) {
        this.$message.error("请先登录")
        return false
      }
      try {
        let res = await getUserInfo()
        this.userInfo = res
      } catch (error) {
        this.$message.error("获取用户信息失败")
        return Promise.reject(error)
      }
    },
    //修改个人信息
    setInfo() {
      if (!sessionStorage.getItem("token")) {
        this.$message.error("请先登录")
        return false
      }
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
      this.$refs["user"].resetFields();
    },
    //头像上传成功回调
    handleAvatarSuccess(res) {
      this.imageUrl = res.data.fileURL
    },
    //头像上传失败回调
    handleAvatarError(err) {
      this.$message.error(JSON.parse(err.message)?.message)
    },
    //头像上传前校验
    beforeAvatarUpload(file) {
      let { size, type } = file
      //头像必须是类型为image
      let isPass = /image/g.test(type) && size < 5 * 1024 * 1024
      if (!isPass) {
        let errMsg = /image/g.test(type) ? "文件不得大于5M" : "请选择图片文件"
        this.$message.error(errMsg)
        this.$refs.upload.abort(file)
        return false
      }
    },
    async putUserInfo() {
      let data = {
        ...this.userInfo
      }
      data.avatar = this.imageUrl
      try {
        await putUser(data).then((res) => {
          this.$message.success(res.message)
          this.imageUrl = ""
          this.close()
          this.getUser()
        })

      } catch (error) {
        this.$message.error("修改失败")
        return Promise.reject(error)
      }
    }
  },
  computed: {
    userFrom() {
      return Form["userInfo"]
    }
  }
};
</script>

<style scoped lang="less">
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

.userInfo {
  position: relative;

  .userInfo-title {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .userInfo-avatar {
      border: 1px solid #ccc;

      i {
        &::before {
          font-size: 100px;
        }
      }

      img {
        width: 100px;
        height: 100px;
        vertical-align: middle
      }
    }

    .userInfo-set {
      position: absolute;
      top: 0;
      right: 40px;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        color: #f56525;
      }
    }

    .userInfo-name {
      display: flex;
      font-size: 1rem;
      padding: 10px 20px;
      min-width: 100px;
      text-align: center;

      p {
        padding: 0 10px;

        em {
          color: #f56525;
          padding: 5px;
          border-bottom: 1px solid #44566c;
        }

        i {
          margin-right: 5px;
        }
      }
    }

    .userInfo-signature {
      display: flex;
      align-items: center;
      margin-top: 20px;

      p {
        font-weight: 500;
        font-size: 14px;
        margin-top: 0;
        color: #f56525;
      }
    }
  }

  .userInfo-article {
    display: flex;
    margin: 0 20px;
    color: #44566c;
    font-size: 16px;
    border-top: 1px solid #f56525;

    .userInfo-articles,
    .userInfo-comments {
      padding: 20px;
      min-height: 250px;

      .sub-title {
        color: #d7d7d7;
      }
    }

    .userInfo-comments {
      min-height: 50px;
    }
  }
}

/deep/.el-dialog {
  border-radius: 15px;

  .el-dialog__header {
    border-bottom: 1px solid #d9d9d9;
  }
}

.setAvatar {
  display: flex;
  align-items: center;

  p {
    margin: 0 8px 0 15px;
  }

  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>