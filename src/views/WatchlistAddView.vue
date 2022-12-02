<template>
  <div class="container">
    <Navbar/>
    <div class="row">
      <div class="col-6">
        <table class="table">
          <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">Symbol</th>
            <td>{{ searchResult.ticker }}</td>
          </tr>
          <tr>
            <th scope="row">Nimi</th>
            <td>{{ searchResult.shortName }}</td>
          </tr>
          <tr>
            <th scope="row">Hind</th>
            <td>{{ searchResult.currentPrice }} {{ searchResult.currency }}</td>
          </tr>
          <tr>
            <th scope="row">Muutus</th>
            <td>{{ searchResult.priceChangePercentage }}%</td>
          </tr>
          <tr>
            <th scope="row">Turg</th>
            <td>{{ searchResult.exchange }}</td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
    <div class="row">
      <div class="col-6">
        <div class="input-group">
          <textarea v-model="watchlistRequest.userComment" class="form-control" aria-label="With textarea"
                    placeholder="Sisesta kommentaar"></textarea>
        </div>
      </div>
    </div>
    <div>
      <div>
        <div class="d-inline-flex">
          <p1 class="priceLabel">Hind</p1>
          <input v-model="watchlistRequest.priceLower" type="text" class="form-control inputBoxes">
        </div>
      </div>
    </div>
    <div>
      <div>
        <div class="d-inline-flex">
          <p1 class="priceLabel">Hind</p1>
          <input v-model="watchlistRequest.priceHigher" type="text" class="form-control inputBoxes">
        </div>
      </div>
    </div>
    <div class="row">
      <div>
        <div class="submitButton mb-5">
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
      watchlistRequest: {
        ticker: '',
        userId: Number( sessionStorage.getItem('userId')),
        priceHigher: '',
        priceLower: '',
        userComment: '',
        priceAtAddition: '',
      },
      symbol: '',
      searchResult: {
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
        this.searchResult = response.data
        this.watchlistRequest.ticker = this.searchResult.ticker
        this.watchlistRequest.priceAtAddition = this.searchResult.currentPrice

      }).catch(error => {
        console.log(error)
      })
    },
    getUserId: function () {
      this.userId = sessionStorage.getItem('userId')
    },
    addToWatchlist: function () {
      this.$http.post("/watchlist", this.watchlistRequest
      ).then(response => {
        console.log(response.data)
        this.$router.push({name: 'watchListRoute'})
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
