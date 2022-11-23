<template>

  <div class="container">
    <div class="row">
      <div class="col">
        <Logo/>
      </div>
    </div>

    <UsernameInput v-model="username"/>

    <PasswordInput v-model="password"/>

    <div class="mt-1 offset-3 input-group">
      <div class="col-lg-6">
      <ErrorAlert :message="errorMessage"/>
    </div>
    </div>


    <div class="mt-4">
    <button v-on:click="login" type="button" class="btn btn-dark col-lg-2">Logi sisse</button>
    </div>

    <div class="mt-4 row">
      <RegisterButton/>
    </div>

  </div>


</template>

<script>
import Logo from "@/components/Logo";
import UsernameInput from "@/components/inputs/UsernameInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import LoginButton from "@/components/buttons/LoginButton";
import RegisterButton from "@/components/buttons/RegisterButton";
import ErrorAlert from "@/components/ErrorAlert";

export default {
  name: "HomeView",
  components: {ErrorAlert, RegisterButton, LoginButton, PasswordInput, UsernameInput, Logo},
  data: function () {
    return {
      username: '',
      password: '',
      errorMessage: '',
      loginInfo: {
        userId: '',
        roles: {
          roleName: ''
        }
      }
    }
  },
  methods: {
    login: function () {
      this.errorMessage = ''

      if (this.username.length === 0 || this.password.length === 0) {
        this.errorMessage = 'Palun täida kõik väljad'
      }
    },
  }
}
</script>
