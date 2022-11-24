<template>

  <div class="container">
    <div class="row mt-xl-5">
      <div class="col">
        <Logo/>
      </div>
    </div>

    <div class="offset-3 input-group">
      <div class="col-lg-2 mt-1">
        <span class="input-group-text justify-content-center" id="basic-addon1">Kasutajanimi</span>
      </div>
      <div class="col-lg-4 mt-1">
        <input v-model="username" type="text" class="form-control justify-content-center" placeholder="AwesomeUser1">
      </div>
    </div>

    <div class="mt-1 offset-3 input-group">
      <div class="col-lg-2">
        <span class="input-group-text justify-content-center" id="basic-addon1">Salasõna</span>
      </div>
      <div class="col-lg-4">
        <input v-model="password" v-on:keyup.enter="login" type="password" class="form-control justify-content-center"
               placeholder="SecretPassword1">
      </div>
    </div>

    <div class="mt-1 offset-3 input-group">
      <div class="col-lg-6">
        <ErrorAlert :message="error.message"/>
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
      error:{
        message: '',
        errorCode: '',
      },

      //TODO: Back-endis tuleb sõnumi struktuuri muuta - hetkel me saame tagasi
      //TODO: userId, username ja password aga peaks olema ainult userId ja roll
      loginInfo: {
        id: '',
        username: '',
        password: '',
      }
    }
  },
  methods: {
    login: function () {
      this.error.message = ''

      if (this.username.length === 0 || this.password.length === 0) {
        this.error.message = 'Palun täida kõik väljad';
      } else {
        this.$http.get("/login", {
              params: {
                username: this.username,
                password: this.password
              }
            }
        ).then(response => {
          this.loginInfo = response.data;
          sessionStorage.setItem('userId', this.loginInfo.id);

          // TODO: Siin tuleb loginInfo.id vahetada role'i vastu
          if (this.loginInfo.id !== 1) {
            this.$router.push({name: 'watchListRoute'});
          } else {

            // TODO: Sellist route'i pole veel olemas
            this.$router.push({name: 'adminViewRoute'})
          }

        }).catch(error => {
          this.error.message = error.response.data.message
        })
      }
    },
  }
}
</script>
