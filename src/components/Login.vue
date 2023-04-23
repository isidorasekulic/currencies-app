<template>
  <v-form class="login">
    <v-container>
      <v-row>
        <div>
          <v-img
            class="login__icon"
            :src="require('@/assets/menu-icon.svg')"
          ></v-img>
        </div>
      </v-row>
      <v-row>
        <p class="text-h6 font-weight-bold pt-6 pb-1 mb-0">Sign in</p>
        <p class="subtitle-2 font-weight-regular pb-6 mb-0">
          Please enter your email and password
        </p>
      </v-row>
      <v-row>
        <v-text-field
          label="Your email address"
          outlined
          solo
          dense
          flat
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          label="Password"
          type="password"
          outlined
          solo
          dense
          flat
        ></v-text-field>
      </v-row>
      <v-row>
        <v-btn
          block
          color="#FF6600"
          height="34"
          :ripple="false"
          depressed
          class="white--text text-none"
          @click="signIn()"
          >Sign in</v-btn
        >
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  signIn() {
    this.$router.push("/currencies");
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  max-width: 376px;
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  .login__icon {
    height: 40px;
    width: 40px;
  }
}
.v-input--is-focused .v-input__slot {
  border: 2px solid green !important;
  border-bottom-color: rgba(0, 0, 0, 0.38) !important;
}
</style>
