<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3>Register</h3>
          </div>
          <div class="card-body">
            <div v-if="errorMsg" class="alert alert-danger mt-3">
              {{ errorMsg }}
            </div>
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="registerModel.name">
                <span class="text-danger" v-if="errorData.name">{{ errorData.name }}</span>
              </div>
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="registerModel.username">
                <span class="text-danger" v-if="errorData.username">{{ errorData.username }}</span>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="registerModel.password">
                <span class="text-danger" v-if="errorData.password">{{ errorData.password }}</span>
              </div>
              <div class="mb-3">
                <label for="cPassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="cPassword" v-model="registerModel.cPassword">
                <span class="text-danger" v-if="errorData.cPassword">{{ errorData.cPassword }}</span>
              </div>
              <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary" :disabled="loading">
                  {{ loading ? 'Please wait...' : 'Register' }}
                </button>
                <router-link to="/auth/login" class="text-decoration-none">Login</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {AuthService} from "@/services/AuthService";
import router from "@/router";

const dataInit = {
  name     : null,
  username : null,
  password : null,
  cPassword: null,
};

export default {
  name: "UserRegister",
  data() {
    return {
      authService  : new AuthService(),
      registerModel: {
        ...dataInit
      },
      errorData    : {
        ...dataInit
      },
      errorMsg     : null,
      loading      : false,
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      this.errorMsg = null;
      this.errorData = {
        ...dataInit
      };

      if (this.registerModel.password !== this.registerModel.cPassword) {
        this.errorMsg = "Register Failed";
        this.errorData.cPassword = "password doesn't match";
      } else {
        const res = await this.authService.register({
          name    : this.registerModel.name,
          password: this.registerModel.password,
          username: this.registerModel.username,
        });

        if (res.statusCode === 200) {
          const login = await this.authService.login({username: this.registerModel.username, password: this.registerModel.password});

          if (login.statusCode === 200) {
            localStorage.setItem("auth-token", login.data.token);
            router.push('/')
          } else {
            this.errorMsg = login.message;
            if (login.data) {
              this.errorData = login.data;
            }
          }
        } else {
          this.errorMsg = res.message;
          if (res.data) {
            this.errorData = res.data;
          }
        }
      }

      this.loading = false;
      // localStorage.setItem('token', response.data.token)
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 50px;
}

.card {
  padding: 20px;
}
</style>
