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
    getTransactionHistory: function () {
      this.$http.get("/history", {
            params: {
              userId: sessionStorage.getItem('userId')

            }
          }
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
  },
  mounted() {
    this.getUserId()
  },
  beforeMount() {
    this.getTransactionHistory()
  }
}
</script>
