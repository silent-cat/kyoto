<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor
          useCustomImageHandler
          @image-added="handleImageAdded"
          v-model="model.body"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入富文本编辑器
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      categories: [],
    };
  },
  components: {
    // 注册
    VueEditor,
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/articles", this.model);
      }
      console.log("save");
      // const res = await this.$http.post("categories", this.model);
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      console.log(res.data)
      this.categories = res.data.filter(
        (v) => !v.parent &&v.name!='英雄'
      );
    },
    afterUpload(res) {
      // res 是 element 的on-success附带参数
      // 数据赋值会有问题，需要显式赋值
      // vue推荐用法
      this.$set(this.model, "icon", res.url);
      // 获取后台生成的url，赋值给model.icon
      this.model.icon = res.url;
    },
  },
};
</script>

<style scoped></style>

<style></style>
