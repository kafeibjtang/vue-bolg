export default {

    "login": [
        {
            label: "用户名",
            query: "username",
            type: "text",
            placeholder: " 6-8位 字母数字"
        },
        {
            label: "密码",
            query: "password",
            type: "password",
            placeholder: "6-12位 最少包含一位(数字/大小写字母)"
        }
    ],

    "register": [
        {
            label: "昵称",
            query: "nickname",
            type: "text",
            placeholder: " 请输入昵称"
        },
        {
            label: "用户名",
            query: "username",
            type: "text",
            placeholder: " 6-8位 字母数字"
        },

        {
            label: "密码",
            query: "password",
            type: "password",
            placeholder: " 6-12位 最少包含一位(数字/大小写字母)"
        },
        {
            label: "邮箱",
            query: "email",
            type: "text",
            placeholder: "请输入邮箱地址"
        }
    ],
    "postColumn": [
        {
            label: "分类名称",
            query: "name",
            type: "text",
            placeholder: "请输入需要添加的分类"
        },
    ],


    "userInfo": [
        {
            label: "昵称",
            query: "nickname",
            type: "text",
            placeholder: " 请输入昵称"
        },
        {
            label: "用户名",
            query: "username",
            readonly: true,
            type: "text",
            placeholder: " 6-8位 字母数字"
        },

        {
            label: "邮箱",
            query: "email",
            type: "text",
            placeholder: "请输入邮箱地址"
        },
        {
            label: "个性签名",
            query: "signature",
            type: "text",
            placeholder: "这个人很懒，什么都没有留下...."
        }
    ],
}