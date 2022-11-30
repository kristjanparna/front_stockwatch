<template>
  <div class="container">
    <div>

      <Navbar @searchTicker="searchTicker" />
    </div>
    <div>

      <div class="row">
        <div class="col-9">
          <table class="table table-hover searchTable" >
            <thead>
            <tr>
              <th scope="col">Ticker</th>
              <th scope="col">Ettevõtte nimi</th>
              <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="quote in quotes" v-on:click="searchInstrument(quote.symbol)">
              <td> {{ quote.symbol }}</td>
              <td> {{ quote.shortname }}</td>
              <td> {{ }}</td>

            </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbars/Navbar";
import router from "@/router";

export default {
  name: "SearchView",
  components: {Navbar},
  data: function () {
    return {
      userId: '',
      quotes: [
        {
          shortname: '',
          symbol: ''
        }
      ]
    }
  },
  methods: {
    getUserId: function () {
      this.userId = sessionStorage.getItem('userId')
    },
    searchTicker: function () {
      this.$http.get("/ticker", {
            params: {
              search: sessionStorage.getItem('search'),
            }
          }
      ).then(response => {
        this.quotes = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    searchInstrument: function (symbol) {
      this.$http.get("/search", {
            params: {
              symbol: symbol
            }
          }
      ).then(response => {
        console.log(response.data)
        this.$router.push('/addToWatchlist')
      }).catch(error => {
        console.log(error)
      })
    },
  },
  mounted() {
    this.getUserId()
  },
  beforeMount() {
    this.searchTicker()

  }
}
</script>

