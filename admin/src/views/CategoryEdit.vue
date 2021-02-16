<template>
  <div>
    <!-- 如果id存在，进入编辑分类，否则进入新建分类-->
    <h1>{{id ? '编辑':'新建'}}分类</h1>
    <!-- @submit.native.prevent="save" 阻止默认提交不要跳转页面-->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    // 接收动态参数:id
    id: {},
    // parents: []
  },
  data() {
    return {
      model: {},
      parents: []
    }
  },
  components: {},
  created() {
    this.fetchParents()

    // 如果存在id获取到原有数据填到编辑页面里
    this.id && this.fetch()
  },
  methods: {
    // 保存提交分类并跳转页面到分类界面
    async save() {
      let res
      // 有id,编辑分类的时候
      if (this.id) {
        res = await this.$http.put(`rest/categories/${this.id}`, this.model)
      } else {
        // 没id,新建分类的时候
        res = await this.$http.post('rest/categories', this.model)
      }
      console.log('save')
      // const res = await this.$http.post("categories", this.model);
      // 点击保存分类后跳转到分类列表界面
      this.$router.push('/categories/list')
      // 保存成功，弹出成功保存提示框
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`)
      this.model = res.data
    },
    async fetchParents() {
      // 拿到分类列表的数据赋给下拉框的选项
      const res = await this.$http.get(`rest/categories`)
      this.parents = res.data
    }
  }
}
</script>

<style scoped></style>
