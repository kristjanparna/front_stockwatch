<template>


  <div class="container">

    <NavbarAdmin/>

  </div>

</template>

<script>
import NavbarAdmin from "@/components/NavbarAdmin";


export default {
  name: "AdminView",
  components: {NavbarAdmin},
  data: function () {
    return {
      username: ''
    }
  },
  methods: {
    getUserName: function () {
      this.username = sessionStorage.getItem('username')
    }
  },
  mounted() {
    this.getUserName()
  }
}
</script>

