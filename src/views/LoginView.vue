<template>

  <div>

    <div class="container align-items-center">

      <div class="row align-items-center">
        <div class="col">
          <img class="img-fluid col-6" alt="Logo" src="../assets/logo-no-background.png">
        </div>
      </div>
    </div>

    <div class="align-items-center mt-4">
      <div class="input-group">
        <span class="input-group-text col-6" id="basic-addon1">Kasutajanimi</span>
        <input type="text" class="form-control col-6" placeholder="Username">
      </div>
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

export default {
  name: "LoginView",
}
</script>
