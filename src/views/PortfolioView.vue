<template>
  <div>

    <Navbar/>


  </div>
</template>

<script>
import Navbar from "@/components/navbars/Navbar";

export default {
  name: "PortfolioView",
  components: {Navbar},
  data: function () {
    return {
      userId: '',

    }
  },
  methods: {
    getUserId: function () {
      this.userId = sessionStorage.getItem('userId')
    },
  },
  mounted() {
    this.getUserId()
  }
}
</script>

