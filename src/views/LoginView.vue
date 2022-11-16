<template>

  <div class="container">
    <div class="row">
      <div class="col">
        <Logo/>
      </div>
    </div>

    <UsernameInput/>

    <PasswordInput/>

    <div class="mt-4">
      <LoginButton/>
    </div>

    <div class="mt-4">
      <RegisterButton/>
    </div>


  </div>


</template>


<script>
import Logo from "@/components/Logo";
import UsernameInput from "@/components/UsernameInput";
import PasswordInput from "@/components/PasswordInput";
import LoginButton from "@/components/LoginButton";
import RegisterButton from "@/components/RegisterButton";

export default {
  name: "LoginView",
  components: {RegisterButton, LoginButton, PasswordInput, UsernameInput, Logo},

}
</script>
