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
        <p class="c_title_2 pt-6 pb-1 mb-0">Sign in</p>
        <p class="c_body pb-6 mb-0">Please enter your email and password</p>
      </v-row>
      <v-row>
        <v-text-field
          placeholder="Your email address"
          outlined
          solo
          dense
          flat
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          placeholder="Password"
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
          color="primary"
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

<style lang="sass" scoped>
.login
  display: flex
  flex-direction: column
  max-width: 376px
  background-color: white
  padding: 40px
  border-radius: 8px
  &__icon
    height: 40px
    width: 40px
</style>
