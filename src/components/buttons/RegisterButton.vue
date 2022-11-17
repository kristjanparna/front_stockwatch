<template>
  <div>
    <router-link to="/register">
      <button type="button" class="btn btn-dark col-lg-2">
        Registreeri
      </button>
    </router-link>

  </div>
</template>
<script>
import Logo from "@/components/Logo";

export default {
  name: 'RegisterButton',
  components: {Logo}
}
</script>