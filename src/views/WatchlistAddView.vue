<template>
  <div class="container">
    <Navbar/>
    <div class="row">
      <div class="col-6">
        <table class="table">
          <thead>
          <tr>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">Sümbol</th>
            <td>{{ results.ticker }}</td>
          </tr>
          <tr>
            <th scope="row">Nimi</th>
            <td>{{ results.shortName }}</td>
          </tr>
          <tr>
            <th scope="row">Hind</th>
            <td>{{ results.currentPrice }} {{ results.currency }}</td>
          </tr>
          <tr>
            <th scope="row">Muutus</th>
            <td>{{ results.priceChangePercentage }}%</td>
          </tr>
          <tr>
            <th scope="row">Turg</th>
            <td>{{ results.exchange }}</td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
    <div class="row">
      <div class="col-6">
        <div class="input-group">
          <textarea v-model="userComment" class="form-control" aria-label="With textarea"
                    placeholder="Sisesta kommentaar"></textarea>
        </div>
      </div>
    </div>
    <div class="inputBoxes">
      <div class="col-1 ">
      <div class="input-group-sm">
        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
      </div>
    </div>
    </div>
    <div class="row">
      <div>
        <div class="submitButton">
          <button v-on:click="addToWatchlist" class="btn btn-dark" type="button">Lisa watchlisti</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Navbar from "@/components/navbars/Navbar";

export default {

  name: "WatchlistAddView",
  components: {Navbar},

  data: function () {
    return {
      symbol: '',
      results: {
        ticker: '',
        exchange: '',
        shortName: '',
        currencySymbol: '',
        currency: '',
        currentPrice: '',
        priceChangePercentage: '',
      }
    }
  },
  methods: {
    searchInstrument: function () {
      this.$http.get("/search", {
            params: {
              symbol: sessionStorage.getItem('symbol')
            }
          }
      ).then(response => {
        console.log(response.data)
        this.results = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    getUserId: function () {
      this.userId = sessionStorage.getItem('userId')
    },
    addToWatchlist: function () {
      this.$http.post("/watchlist/save", this.results, null
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
  },
  beforeMount() {
    this.searchInstrument()
    this.getUserId()
  }
}
</script>
