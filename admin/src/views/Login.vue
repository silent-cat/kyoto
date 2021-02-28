<template>
  <div>
    <el-card header="请先登录" class="login_container">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
    };
  },
  components: {},
  created() {},
  methods: {
    async login() {
      //   console.log(this.model);
      const res = await this.$http.post("login", this.model);
      // console.log(res.data);
      // 存储token
      localStorage.token = res.data.token;
      // sessionlStorage.token = res.data.token
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登录成功",
      });
    },
  },
};
</script>

<style scoped>

.login_container {
  width: 25rem;
  margin: 8rem auto;
}
</style>
