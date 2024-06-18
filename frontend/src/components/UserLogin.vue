<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3>Login</h3>
          </div>
          <div class="card-body">
            <div v-if="error.message" class="alert alert-danger mt-3">
              {{ error.message }}
            </div>
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username">
                <span class="text-danger" v-if="error.data.username">{{ error.data.username }}</span>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password">
                <span class="text-danger" v-if="error.data.password">{{ error.data.password }}</span>
              </div>
              <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary" :disabled="loading">
                  {{ loading ? 'Please wait...' : 'Login' }}
                </button>
                <router-link to="/auth/register" class="text-decoration-none">Create Account</router-link>
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

export default {
  name: "UserLogin",
  data() {
    return {
      loading    : false,
      username   : '',
      password   : '',
      error      : {
        message: null,
        data   : {
          username: null,
          password: null,
        }
      },
      authService: new AuthService(),
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.error = {
        message: null,
        data   : {
          username: null,
          password: null,
        }
      }

      const res = await this.authService.login({username: this.username, password: this.password});

      if (res.statusCode === 200) {
        localStorage.setItem("auth-token", res.data.token);
        router.push('/')
      } else {
        this.error.message = res.message;
        if (res.data) {
          this.error.data = res.data;
        }
      }
      this.loading = false;
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
