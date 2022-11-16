<template>
  <div>

    <FirstNameInput/>

    <LastNameInput/>

    <EmailInput/>

    <UsernameInput/>

    <PasswordInput/>

    <PasswordConfirmationInput/>

    <div class="mt-4">
      <RegisterButton/>
    </div>

  </div>
</template>

<script>
import UsernameInput from "@/components/inputs/UsernameInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import RegisterButton from "@/components/buttons/RegisterButton";
import FirstNameInput from "@/components/inputs/FirstNameInput";
import LastNameInput from "@/components/inputs/LastNameInput";
import EmailInput from "@/components/inputs/EmailInput";
import PasswordConfirmationInput from "@/components/inputs/PasswordConfirmationInput";

export default {
  name: "RegisterView",
  components: {
    PasswordConfirmationInput,
    EmailInput, LastNameInput, FirstNameInput, UsernameInput, PasswordInput, RegisterButton}
}
</script>
