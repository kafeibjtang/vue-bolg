<template>
  <el-card class="search">
    <el-input placeholder="搜索文章" v-model="searchVal" @keydown.native.enter="searchArticle">
      <i slot="suffix" class="el-input__icon el-icon-search" @click.stop="searchArticle"></i>
    </el-input>
  </el-card>
</template>

<script>

export default {
  data() {
    return {
      searchVal: ""
    }
  },
  created() { },
  methods: {
    searchArticle() {
      this.$router.push({ name: 'Articles', query: { val: this.searchVal } })

      if (!this.searchVal.trim()) {
        this.$message.warning("先输入内容在搜索啊！！！")
        return false
      }
      this.searchVal = '';
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  border-radius: 15px;
  margin-right: 15px;
  margin-bottom: 15px;

  /deep/.el-input__inner {
    border: none;

    &:focus {
      border: none;
    }
  }
}
</style>