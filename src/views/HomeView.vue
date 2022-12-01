<template>
  <div class="row">
    <div class="container">
      <div>
        <div class="row mt-5 justify-content-center">
          <div class="col-6">
            <Logo/>
          </div>
        </div>
        <div class="input-group justify-content-center">
          <div class="col-3 mt-1">
            <input v-model="username" type="text" class="form-control justify-content-center" placeholder="Kasutaja">
          </div>
        </div>
        <div class="input-group mt-1 justify-content-center">
          <div class="col-3">
            <input v-model="password" v-on:keyup.enter="login" type="password"
                   class="form-control justify-content-center"
                   placeholder="Salasõna">
          </div>
        </div>
        <div class="mt-1 offset-3 input-group">
          <div class="col-6">
            <ErrorAlert :message="error.message"/>
          </div>
        </div>

        <div class="mt-4 justify-content-center">
          <button v-on:click="login" type="button" class="btn btn-dark col-1">Logi sisse</button>
        </div>

        <div class="mt-4 justify-content-center">
          <RegisterButton/>
        </div>
      </div>
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
      error: {
        message: '',
        errorCode: '',
      },

      loginInfo: {
        userId: '',
        roleId: '',
        username: ''
      }
    }
  },
  methods: {
    fieldsNotFilledError() {
      this.error.message = 'Palun täida kõik väljad';
    },
    sendLoginRequest: function () {
      this.$http.get("/login", {
            params: {
              username: this.username,
              password: this.password
            }
          }
      ).then(response => {
        this.loginInfo = response.data;
        sessionStorage.setItem('userId', this.loginInfo.userId);
        sessionStorage.setItem('roleId', this.loginInfo.roleId);
        sessionStorage.setItem('username', this.loginInfo.username);
        if (this.loginInfo.roleId !== 1) {
          this.$router.push({name: 'watchListRoute'});
        } else {
          this.$router.push({path: '/admin'})
        }
      }).catch(error => {
        this.error.message = error.response.data.message
      })
    },
    login: function () {
      this.error.message = ''
      if (this.username.length === 0 || this.password.length === 0) {
        this.fieldsNotFilledError.call(this);
      } else {
        this.sendLoginRequest();
      }
    }
  }
}
</script>
