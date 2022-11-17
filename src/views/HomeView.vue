<template>
  <div class="container justify-content-center">
    <div class="row align-items-center">
      <div class="col">
        <Logo/>
      </div>
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
  </div>

</template>

<script>
import Logo from "@/components/Logo";
import UsernameInput from "@/components/inputs/UsernameInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import LoginButton from "@/components/buttons/LoginButton";
import RegisterButton from "@/components/buttons/RegisterButton";

export default {
  name: "HomeView",
  components: {RegisterButton, LoginButton, PasswordInput, UsernameInput, Logo},
}
</script>
