<template>
  <div class="container">
    <Navbar/>
      <div class="col-6">
        <table class="table searchTableAdd">
          <tbody>
          <tr>
            <th class="tableBorders" scope="row">Sümbol</th>
            <td>{{ searchResult.ticker }}</td>
          </tr>
          <tr>
            <th class="tableBorders" scope="row">Nimi</th>
            <td>{{ searchResult.shortName }}</td>
          </tr>
          <tr>
            <th class="tableBorders" scope="row">Hind</th>
            <td>{{ searchResult.currentPrice }} {{ searchResult.currency }}</td>
          </tr>
          <tr>
            <th class="tableBorders" scope="row">Muutus</th>
            <td>{{ searchResult.priceChangePercentage }}%</td>
          </tr>
          <tr>
            <th class="tableBorders" scope="row">Turg</th>
            <td>{{ searchResult.exchange }}</td>
          </tr>
          </tbody>
        </table>

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
      <div class="col-lg-5 offset-3">
        <div class="d-inline-flex">
          <p1 class="priceLabel">Ülemine piirhind </p1>
          <input v-model="watchlistRequest.priceLower" type="text" class="form-control inputBoxes">
        </div>
      </div>
    </div>
    <div>
      <div class="col-lg-5 offset-3">
        <div class="d-inline-flex">
          <p1 class="priceLabel">Alumine piirhind</p1>
          <input v-model="watchlistRequest.priceHigher" type="text" class="form-control inputBoxes">
        </div>
      </div>
    </div>

    <div>
      <ErrorAlert :message="message"/>
    </div>

    <div class="col-2 offset-4">
        <div class="submitButton">
          <button v-on:click="addToWatchlist" class="btn btn-dark" type="button">Lisa watchlisti</button>
        </div>
    </div>
  </div>

</template>

<script>
import Navbar from "@/components/navbars/Navbar";
import ErrorAlert from "@/components/ErrorAlert";

export default {

  name: "WatchlistAddView",
  components: {Navbar, ErrorAlert},

  data: function () {
    return {
      message: '',
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
        this.message = 'Instrument lisati sinu Watchlisti\'i'
        this.$router.push({name: 'watchListRoute'})
      }).catch(error => {
        this.message = error.response.data.message
      })
    },
  },
  beforeMount() {
    this.searchInstrument()
    this.getUserId()
  }
}
</script>
