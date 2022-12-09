<template>
  <div class="container">
    <Navbar/>
    <div class="row">
      <div class="col">
        <table class="table watchlistTable mt-3">
          <thead>
          <tr>
            <th class="tableBorders" v-on:mouseover="" v-on:click="sortBy('shortName')">Instrument  <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort" /> </th>
            <th class="tableBorders" v-on:click="sortBy('currentPrice')">Hetkehind  <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort" /> </th>
            <th class="tableBorders" v-on:click="sortBy('priceChangePercentage')">Muutus täna  <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort" /> </th>
            <th class="tableBorders" v-on:click="sortBy('priceAtAddition')">Hind lisamisel  <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort" /> </th>
            <th class="tableBorders">Muutus lisamisest</th>
            <th class="tableBorders" v-on:click="sortBy('priceHigher')">Ülemine piirhind  <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort" /> </th>
            <th class="tableBorders" v-on:click="sortBy('priceLower')">Alumine piirhind  <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort" /> </th>
            <th class="tableBorders" v-on:click="sortBy('userComment')">Kommentaar  <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort" /> </th>
            <th class="tableBorders" v-on:click="sortBy('additionDate')">Lisamise kuupäev  <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort" /> </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="response in sortedResponses">
            <td class="tableBorders"> {{ response.shortName }}</td>
            <td class="tableBorders"> {{ response.currentPrice }} {{ response.currency }}</td>
            <td class="tableBorders"> {{ response.priceChangePercentage }} %</td>
            <td class="tableBorders"> {{ response.priceAtAddition }}</td>
            <td class="tableBorders"> {{ -(response.priceAtAddition - response.currentPrice) }} {{ response.currency }}</td>
            <td class="tableBorders"> {{ response.priceHigher }} {{ response.currency }}</td>
            <td class="tableBorders"> {{ response.priceLower }} {{ response.currency }}</td>
            <td class="tableBorders"> {{ response.userComment }}</td>
            <td class="tableBorders"> {{ response.additionDate }}</td>
            <div class="btn-group">
            <td><button v-on:click="addToPortfolioFromWatchlist(response.ticker, response.id)" class="btn-outline-light btn justify-content-end text-nowrap" type="button">Lisa portfelli</button></td>
            <td><button v-on:click="toggle = !toggle" class="btn-outline-light btn justify-content-end text-nowrap disabled" type="button">Muuda</button></td>
            <td><button v-on:click="removeFromWatchlist(response.ticker, response.id)" class="btn-outline-light btn justify-content-end" type="button">Eemalda</button></td>
            </div>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbars/Navbar";

export default {
  name: "WatchListView",
  components: {Navbar},
  data: function () {
    return {
      toggle: false,
      userId: '',
      currentSort: '',
      currentSortDirection: 'asc',
      responses: [
        {
          id: 0,
          ticker: '',
          shortName: '',
          currency: '',
          currentPrice: 0,
          priceChangePercentage: 0,
          priceHigher: 0,
          priceLower: 0,
          userComment: '',
          priceAtAddition: 0,
          additionDate: ''
        }
      ]
    }
  },
  methods: {
    sortBy:function(s) {
      this.currentSort = s;
      if (s === this.currentSort) {
        this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
      }
    },
    getUserId: function () {
      this.userId = sessionStorage.getItem('userId')
    },
    getWatchlistData: function () {
      this.$http.get("/watchlist", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        this.responses = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    navigateToInstrumentView: function () {
      // this.$router.push(name: 'InstrumentInfoRoute')
    },
    removeFromWatchlist: function (ticker, id) {
      this.$http.delete("/watchlist", {
            params: {
              ticker: ticker,
              id: id
            }
          }
      ).then(response => {
        console.log(response.data)
        this.$router.go()
      }).catch(error => {
        console.log(error)
      })
    },
    addToPortfolioFromWatchlist: function (ticker, id) {
      sessionStorage.setItem('symbol', ticker)
      sessionStorage.setItem('id', id)
      this.$router.push({path: "/watchlist/add"})
    },
  },
  computed:{
    sortedResponses:function () {
      return this.responses.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDirection === 'desc') {
          modifier = -1;
        }
        if (a[this.currentSort] < b[this.currentSort]) {
          return -1 * modifier;
        }
        if (a[this.currentSort] > b[this.currentSort]) {
          return modifier;
        }
        return 0;
      })
    }
  },
  beforeMount() {
    this.getUserId()
    this.getWatchlistData()
  }
}
</script>

