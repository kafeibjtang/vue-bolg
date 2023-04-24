<template>
  <div class="article-box">
    <el-Card
      class="box-card"
      v-for="article in articleslist"
      :key="article._id"
      :style="{ 'max-width': maxWidth ? maxWidth : '255px' }"
    >
      <router-link :to="{ name: 'Article', params: { id: article._id } }">
        <div class="article-img">
          <img :src="article.cover" alt="文章图片" />
          <span>{{ article.date }}</span>
        </div>
        <div class="arctile-content">
          <h1>{{ article.title }}</h1>
          <p>{{ article.content }}</p>
        </div>
      </router-link>
    </el-Card>
  </div>
</template>

<script>
export default {
  props: {
    "articleslist": Array,
    "maxWidth": String
  },

};
</script>

<style lang="less" scoped>
.article-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .box-card {
    flex: 1;
    margin: 5px;
    border-radius: 10px;
    cursor: pointer;
    color: #44566c;
    background-color: #f8fafb;
    min-width: 255px;
    max-width: 255px;
    max-height: 400px;
    min-height: 400px;

    a {
      color: #44566c;
    }

    .article-img {
      position: relative;
      width: 100%;
      height: 160px;
      display: flex;
      align-items: center;
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
      }

      span {
        position: absolute;
        bottom: 0;
        padding: 0 10px;
        font-size: 12px;
        background-color: #f8fafb;
        border-radius: 0 10px 0 0;
        color: orangered;
      }
    }

    .arctile-content {
      h1 {
        padding: 5px;
        font-size: 20px;
      }

      p {
        padding: 10px;
        font-size: 14px;
        height: 150px;
        display: -webkit-box;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
}
</style>