<template>
  <div>

    <Navbar/>
    <p>HISTORY</p>

  </div>
</template>
<script>
import Navbar from "@/components/navbars/Navbar";

export default {
  name: "HistoryView",
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
