<template>
  <div class="container">
    <Navbar/>
    <div class="row">
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

        <select v-model="selectedOption" class="form-select mt-3 "
                aria-label="Default select example">
          <option selected disabled :value="0"> Lisa jälgimisse või portfelli</option>
          <option :value=1> Lisa watchlisti</option>
          <option :value=2> Lisa portfelli</option>
        </select>
      </div>
      <div v-if="selectedOption === 1" class="col col-5">
        <div class="row mt-3">
          <div class="input-group">
          <textarea v-model="watchlistRequest.userComment" class="form-control" aria-label="With textarea"
                    placeholder="Sisesta kommentaar"></textarea>
          </div>
        </div>
        <div class="row mt-3 offset-3">
          <div class="d-inline-flex">
            <p1 class="priceLabel textBackground col-4">Ülemine piirhind</p1>
            <input v-model="watchlistRequest.priceLower" type="number" class="form-control inputBoxes">
          </div>
        </div>
        <div class="row mt-3 offset-3">
          <div class="d-inline-flex">
            <p1 class="priceLabel textBackground col-4">Alumine piirhind</p1>
            <input v-model="watchlistRequest.priceHigher" type="number" class="form-control inputBoxes">
          </div>
        </div>
        <div class="mt-3">
          <ErrorAlert :message="message"/>
        </div>
        <div class="row mt-3 offset-3">
          <div class="btn-success col-lg-6">
            <button v-on:click="addToWatchlist" class="btn btn-dark submitButton" type="button">Lisa watchlisti</button>
          </div>
        </div>
      </div>
      <div v-if="selectedOption === 2" class="col col-5">
        <div class="row mt-3 offset-3">
          <div class="d-inline-flex">
            <p1 class="priceLabel textBackground col-4">Instrumendi hind</p1>
            <input v-model="portfolioRequest.transactionPrice" type="number" class="form-control inputBoxes">
          </div>
        </div>
        <div class="row mt-3 offset-3">
          <div class="d-inline-flex">
            <p1 class="priceLabel textBackground col-4">Kogus</p1>
            <input v-model="portfolioRequest.amount" type="number" class="form-control inputBoxes">
          </div>
        </div>
        <div class="row mt-3 offset-3">
          <div class="d-inline-flex">
            <p1 class="priceLabel textBackground col-4">Tehingutasu</p1>
            <input v-model="portfolioRequest.transactionFee" type="number" class="form-control inputBoxes">
          </div>
        </div>
        <div class="row mt-3 offset-3">
          <div class="d-inline-flex">
            <p1 class="priceLabel textBackground col-4">Kuupäev</p1>
            <input v-model="portfolioRequest.transactionDate" type="date" class="form-control inputBoxes">
          </div>
        </div>
        <div class="mt-3">
          <ErrorAlert :message="message"/>
        </div>
        <div class="row mt-3 offset-3">
          <div class="btn-success col-lg-6">
            <button v-on:click="addToPortfolio" class="btn btn-dark submitButton" type="button">Lisa portfelli</button>
          </div>
        </div>
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
      selectedOption: '',
      symbol: '',
      buySellOption: '',
      watchlistRequest: {
        id: sessionStorage.getItem('id'),
        ticker: '',
        userId: sessionStorage.getItem('userId'),
        priceHigher: '',
        priceLower: '',
        userComment: '',
        priceAtAddition: '',
        shortName: ''
      },
      portfolioRequest: {
        userId: sessionStorage.getItem('userId'),
        ticker: sessionStorage.getItem('symbol'),
        transactionPrice: 0,
        amount: 0,
        transactionFee: 0,
        transactionDate: '',
        transactionTypeId: 1,
        shortName: ''
      },
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
        this.watchlistRequest.shortName = this.searchResult.shortName
        this.portfolioRequest.shortName = this.searchResult.shortName
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
      sessionStorage.removeItem('id')
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
