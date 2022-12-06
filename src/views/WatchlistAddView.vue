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
      <div>
        <div>
          <div class="addToListButton">
            <div>
              <button v-on:click="watchlistToggle = !watchlistToggle" type="button" class="btn btn-dark col-2">Lisa
                jälgimisnimekirja
              </button>
              <button type="button" class="btn btn-dark  ms-2 col-2">Lisa portfelli</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <AddToWatchlist v-show="watchlistToggle" :add-to-watchlist="addToWatchlist"
                      :watchlist-request="watchlistRequest"/>
    </div>
    <div>
      <div class="mt-1">
      </div>
      <div class="row">
        <div class="col-3">
          <div class="d-inline-flex">
            <p1>Kogus</p1>
            <input v-model="portfolioRequest.amount" type="text" class="form-control d-inline">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <div class="d-inline-flex">
            <div>
              <p1>Hind</p1>
            </div>
            <div class="d-inline">
              <input v-model="portfolioRequest.purchasePrice" type="text" class="form-control">
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <div class="d-inline-flex">
            <p1>Tehingutasu</p1>
            <input v-model="portfolioRequest.transactionFee" type="text" class="form-control">
          </div>
        </div>
      </div>
      <div class="row">
        <div>
          <div class="submitButton mb-5">
            <button v-on:click="addToPortfolio" class="btn btn-dark" type="button">Lisa portfelli</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/navbars/Navbar";
import AddToWatchlist from "@/components/inputs/AddToWatchlist";


export default {

  name: "WatchlistAddView",
  components: {AddToWatchlist, Navbar},

  data: function () {
    return {
      watchlistToggle: false,
      portfolioToggle: false,
      watchlistRequest: {
        ticker: '',
        userId: Number(sessionStorage.getItem('userId')),
        priceHigher: '',
        priceLower: '',
        userComment: '',
        priceAtAddition: '',
      },
      portfolioRequest: {
        ticker: '',
        userId: Number(sessionStorage.getItem('userId')),
        amount: '',
        transactionFee: '',
        purchasePrice: '',
        transactionTypeId: 1
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
        this.portfolioRequest.ticker = this.searchResult.ticker
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
    addToPortfolio: function () {
      this.$http.post("/portfolio", this.portfolioRequest
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
