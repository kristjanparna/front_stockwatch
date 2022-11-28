<template>
  <div class="container">
    <div class="row mt-xl-5">
      <div class="col">
        <Logo/>
      </div>
    </div>

    <div class="mt-5 offset-3 input-group">
      <div class="col-lg-2">
        <span class="input-group-text justify-content-center" id="basic-addon1">Eesnimi</span>
      </div>
      <div class="col-lg-4">
        <input v-model="registerRequest.firstname" type="text" class="form-control justify-content-center" placeholder="Raibert">
      </div>
    </div>

    <div class="mt-1 offset-3 input-group">
      <div class="col-lg-2">
        <span class="input-group-text justify-content-center" id="basic-addon1">Perekonnanimi</span>
      </div>
      <div class="col-lg-4">
        <input v-model="registerRequest.lastname" type="text" class="form-control justify-content-center" placeholder="Rebane">
      </div>
    </div>

    <div class="mt-1 offset-3 input-group">
      <div class="col-lg-2">
        <span class="input-group-text justify-content-center" id="basic-addon1">Email</span>
      </div>
      <div class="col-lg-4">
        <input v-model="registerRequest.email" type="text" class="form-control justify-content-center" placeholder="Raibert@neti.ee">
      </div>
    </div>

    <div class="offset-3 input-group">
      <div class="col-lg-2 mt-1">
        <span class="input-group-text justify-content-center" id="basic-addon1">Kasutajanimi</span>
      </div>
      <div class="col-lg-4 mt-1">
        <input v-model="registerRequest.username" type="text" class="form-control justify-content-center" placeholder="AwesomeUser1">
      </div>
    </div>

    <div class="mt-1 offset-3 input-group">
      <div class="col-lg-2">
        <span class="input-group-text justify-content-center" id="basic-addon1">Salasõna</span>
      </div>
      <div class="col-lg-4">
        <input v-model="registerRequest.password" type="password" class="form-control justify-content-center"
               placeholder="SecretPassword1">
      </div>
    </div>

    <div class="mt-1 offset-3 input-group">
      <div class="col-lg-2">
        <span class="input-group-text justify-content-center" id="basic-addon1">Korda salasõna</span>
      </div>
      <div class="col-lg-4">
        <input v-model="passwordConfirmation" v-on:keyup.enter="validateInputs(); register()" type="password"
               class="form-control justify-content-center"
               placeholder="SecretPassword1">
      </div>
    </div>

    <div class="mt-1 offset-3 input-group">
      <div class="col-lg-6">
        <ErrorAlert :message="errorMessage"/>
      </div>
    </div>

    <div class="mt-4">
      <button v-on:click="validateInputs(); register()" type="button" class="btn btn-dark col-lg-2">Registreeri</button>
    </div>

  </div>
</template>

<script>
import UsernameInput from "@/components/inputs/UsernameInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import RegisterButton from "@/components/buttons/RegisterButton";
import Logo from "@/components/Logo";
import ErrorAlert from "@/components/ErrorAlert";

export default {
  name: "RegisterView",
  components: {
    UsernameInput, PasswordInput, RegisterButton, Logo, ErrorAlert
  },
  data: function () {
    return {
      registerRequest: {
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: '',
      },
      passwordConfirmation: '',
      errorMessage: ''
    }
  },
  methods: {
    validateInputs() {
      this.errorMessage = ''

      if (this.registerRequest.firstname.length === 0 || this.registerRequest.lastname.length === 0 ||
          this.registerRequest.email.length === 0 || this.registerRequest.username.length === 0 ||
          this.registerRequest.password.length === 0 || this.passwordConfirmation.length === 0) {
        this.errorMessage = 'Palun täida kõik väljad'
      } else if (!this.registerRequest.email.includes('@') || !this.registerRequest.email.includes('.')) {
        this.errorMessage = 'Palun kontrolli meiliaadressi'
      } else if (this.registerRequest.password !== this.passwordConfirmation) {
        this.errorMessage = 'Salasõnad ei kattu'
      }
    },
    register: function () {
      this.$http.post("/register", this.registerRequest
      ).then(response => {
        this.registerRequest = response.data
        alert("Kasuataja loomine õnnestus!")
        this.$router.push({name: 'home'})
      }).catch(error => {
        this.errorMessage = error.response.data.message
      })
    }
  }
}
</script>
