<template>
  <div class="socket-box">
    <div class="separate">
      <h1>聊天室</h1>
      <span class="sub-separate">ChatRoom </span>
    </div>
    <div class="socke-msg-box" ref="scrollBox">
      <div>
        <div :class="`socke-msg-${chat.dis}`" v-for="chat in chatList" :key="chat.id">
          <p class="msg-time">{{ chat.time }}</p>
          <span>
            <p class="msg-nickname" v-if="chat.dis === 'left'">
              {{ chat.nickname }}
            </p>
            <p class="msg">{{ chat.msg }}</p>
            <p class="msg-nickname" v-if="chat.dis === 'right'">
              {{ chat.nickname }}
            </p>
          </span>
        </div>
      </div>
    </div>
    <div class="socke-send">
      <el-input v-model="sendMsg" placeholder="请输入内容" @keyup.native.enter="sendChat"></el-input>
      <span class="oButton" @click="sendChat">
        <i class="el-icon-s-promotion" style="margin-right: 10px"></i> Send
        Message
      </span>
    </div>
    <Footer />
  </div>
</template>

<script>
import formatDate from '@/util/formatDate'
import { io } from 'socket.io-client'
import Footer from '@/components/Footer.vue';
let idx = 0
export default {
  data() {
    return {
      sendMsg: '',
      chatList: [],
      nickname: '',
      uid: '',
      ws: null,
    }
  },
  components: { Footer },
  created() {
    this.ws = io("ws://111.230.17.116:3004", { transports: ['websocket'] })
    this.getUserInfo()

    //用户进入聊天室，把id和昵称带给服务器
    this.ws.emit('enterChat', { uid: this.uid, nickname: this.nickname })

    //注册事件，获取服务器广播的消息数据
    this.ws.on('chat', (data) => {
      this.serverChat(data)
    })

    //离开聊天室
    this.ws.on('logout', (nickname) => {
      this.serverLog({ nickname, isLogin: false })
    })
    //进入聊天室
    this.ws.on('logged', (nickname) => {
      this.serverLog({ nickname, isLogin: true })
    })

  },
  methods: {
    //初始化用户信息
    getUserInfo() {
      let uid = sessionStorage.getItem("uid") || this.createTempId()
      let nickname = sessionStorage.getItem("nickname") || `游客${this.createTempId()}`
      this.nickname = nickname
      this.uid = uid
      this.ws.emit('online', { uid, nickname })
      this.ws.on("disconnect", () => {
        this.ws = null
        this.$message.warning("账号已在其它设备登录")
        if (this.$route.name !== "About") {
          this.$router.push("/about")
        }
        this.$store.commit("LOGOUT")
      })
    },
    //创建一个临时昵称
    createTempId() {
      return Date.now() + Math.random().toString(36).slice(-6)
    },
    //发送消息
    sendChat() {
      if (!this.sendMsg) {
        this.$message.warning("请输入内容")
        return false
      }
      let msg = this.sendMsg
      this.addChat({
        isMe: true,
        msg,
        nickname: this.nickname
      })
      //通知服务器广播消息
      this.ws.emit('send', msg)
      this.sendMsg = ''
    },
    enterChat() {
      this.ws.emit('enterChat', { nickname: this.nickname })
    },
    //存储发送的消息详情
    addChat({ type = "msg",
      msg = "",
      nickname = '',
      time = formatDate(),
      isMe = false }) {
      let dis = 'left'
      if (type === 'action') {
        dis = 'center'
      }
      if (isMe) {
        dis = 'right'
      }
      this.chatList.push({
        type, msg, nickname, time, isMe, dis, id: ++idx
      })
      this.$nextTick(() => {
        if (this.$refs["scrollBox"]) {
          this.$refs["scrollBox"].scrollTop = this.$refs["scrollBox"].scrollHeight
        }
      })
    },
    serverChat({ msg = '', nickname = "陌生人", time = "" }) {
      this.addChat({
        nickname, msg, time
      })
    },
    //监听用户进入离开
    serverLog({ nickname, isLogin }) {
      let state = isLogin ? '进入' : '离开'
      let msg = `${nickname} ${state}了聊天室`
      this.addChat({
        type: 'action', msg
      })
    }
  },
  beforeDestroy() {
    //关闭socket
    if (this.ws !== null) {
      this.ws.emit('leaveChat')
    }
  },
}
</script>

<style lang="less" scoped>
.socket-box {
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

  .socke-msg-box {
    margin: 0 15px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f3f3f3;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.4),
      inset 0 0 10px rgba(255, 255, 255, 0.4);
    height: 500px;
    overflow: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    .socke-msg-left,
    .socke-msg-right,
    .socke-msg-center {
      font-size: 14px;
      margin: 10px 0;

      span {
        display: flex;
        align-items: center;

        .msg {
          margin: 0 10px;
          padding: 5px 10px;
          background-color: orangered;
          border-radius: 10px;
          color: #fff;
        }
      }
    }

    .socke-msg-right {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .socke-msg-center {
      display: flex;
      flex-direction: column;
      align-items: center;

      .msg {
        background-color: #ccc !important;
      }
    }
  }

  .socke-send {
    padding-left: 15px;
    display: flex;
    align-items: center;

    /deep/.el-input {
      input {
        padding: 0 15px;
        border: 1px solid #ccc;
        border-radius: 10px;
        border: none;
        background-color: #f3f3f3;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.4),
          inset 0 0 10px rgba(255, 255, 255, 0.4);
      }
    }

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
      padding: 10px;
      margin: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
    }
  }
}
</style>