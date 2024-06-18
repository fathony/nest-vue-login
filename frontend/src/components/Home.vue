<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <h3>Welcome</h3>
            <button class="btn btn-danger" @click="logout">Logout</button>
          </div>
          <div class="card-body">
            <h6>{{ user?.name }}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {UserService} from "@/services/UserService";
import router from "@/router";

export default {
  name: "HomeComponent",
  data() {
    return {
      user       : null,
      userService: new UserService(),
    }
  },
  async created() {
    const res = await this.userService.profile();
    if (res.statusCode === 200) {
      this.user = res.data;
    } else {
      switch (res.statusCode) {
        case (401):
          this.logout();
      }

    }
  },
  methods: {
    logout() {
      localStorage.removeItem("auth-token");
      router.push("/auth/login");
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
