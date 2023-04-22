<template>
  <div class="login_container">
    <Login />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Login from "@/components/Login.vue"; // @ is an alias to /src

@Component({
  components: {
    Login,
  },
})
export default class LoginView extends Vue {}
</script>

<style lang="scss" scoped>
.login_container {
  background: url("../assets/background.svg");
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
