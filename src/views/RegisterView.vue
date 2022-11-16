<template>
  <div>

    <div class="mt-5 offset-3 input-group">
      <div class="col-lg-2">
        <span class="input-group-text justify-content-center" id="basic-addon1">Eesnimi</span>
      </div>
      <div class="col-lg-4">
        <input type="text" class="form-control justify-content-center" placeholder="Raibert">
      </div>
    </div>

    <div class="mt-1 offset-3 input-group">
      <div class="col-lg-2">
        <span class="input-group-text justify-content-center" id="basic-addon1">Perekonnanimi</span>
      </div>
      <div class="col-lg-4">
        <input type="text" class="form-control justify-content-center" placeholder="Rebane">
      </div>
    </div>


    <UsernameInput/>

    <PasswordInput/>

    <div class="mt-4">
      <RegisterButton/>
    </div>


  </div>



</template>

<script>
import UsernameInput from "@/components/UsernameInput";
import PasswordInput from "@/components/PasswordInput";
import RegisterButton from "@/components/RegisterButton";

export default {
  name: "RegisterView",
  components:{UsernameInput, PasswordInput, RegisterButton}
}
</script>
