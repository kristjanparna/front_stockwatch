<template>

  <div class="container">
    <div>
      <NavbarAdmin/>
    </div>
  </div>

</template>

<script>
import NavbarAdmin from "@/components/navbars/NavbarAdmin";


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

