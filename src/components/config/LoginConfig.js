export default {
    "login": {
        title: '登录',
        formType: "login",
        btns: [
            {
                targetName: 'close',
                name: '取消'
            },
            {
                targetName: 'confirm',
                name: '提交',
                isSubmit: true
            }
        ]
    },
    "register": {
        title: '注册',
        formType: "register",
        btns: [
            {
                targetName: 'close',
                name: '取消'
            },
            {
                targetName: 'confirm',
                name: '注册',
                isSubmit: true
            }
        ]
    },
    "postColumn": {
        title: '添加分类',
        formType: "postColumn",
        btns: [
            {
                targetName: 'close',
                name: '取消'
            },
            {
                targetName: 'confirm',
                name: '提交',
                isSubmit: true
            }
        ]
    },
    "userInfo": {
        title: '用户信息',
        formType: "putUserInfo",
        btns: [
            {
                targetName: 'close',
                name: '取消'
            },
            {
                targetName: 'confirm',
                name: '提交',
                isSubmit: true
            }
        ]
    },
}