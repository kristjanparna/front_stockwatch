<template>

  <div>

    <Logo/>

    <div class="align-items-center mt-5 row">
      <div class="col"></div>
      <div class="input-group col-6">
        <span class="input-group-text col-2" id="basic-addon1">Kasutajanimi</span>
        <input type="text" class="form-control col-4" placeholder="Username">
      </div>
      <div class="col"></div>
    </div>

    <div class="row align-items-center mt-4">
      <div class="input-group col">
        <span class="input-group-text" id="basic-addon1">Salasõna</span>
        <input type="password" class="form-control" placeholder="Password">
      </div>
    </div>

    <div class="row align-items-center mt-4">
      <div>
        <button type="button" class="btn btn-dark row-cols-lg-4">Logi sisse</button>
      </div>
    </div>

    <div class="row align-items-center mt-4">
      <div>
        <button type="button" class="btn btn-dark col-lg-2">Registreeri</button>
      </div>
    </div>


  </div>


</template>


<script>
import Logo from "@/components/Logo";

export default {
  name: "LoginView",
  components: {Logo},

}
</script>
