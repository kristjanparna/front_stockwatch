<template>

  <div>

    <Navbar/>


    <h1>{{ userId }}</h1>
    <p>WATCHLIST</p>

  </div>

</template>

<script>
import Navbar from "@/components/navbars/Navbar";

export default {
  name: "WatchListView",
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

