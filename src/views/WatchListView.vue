<template>

  <div class="container watchlistBackground">
    <Navbar/>
    <div class="row">
      <div class="col">
        <table class="table table-hover watchlistTable">
          <thead class="">
          <tr>
            <th v-on:mouseover="" v-on:click="sortBy('shortName')">Instrument  <font-awesome-icon class="iconStyleEditBlack" icon="fa-solid fa-sort" /> </th>
            <th v-on:click="sortBy('currentPrice')">Hetkehind  <font-awesome-icon class="iconStyleEditBlack" icon="fa-solid fa-sort" /> </th>
            <th v-on:click="sortBy('priceChangePercentage')">Muutus täna  <font-awesome-icon class="iconStyleEditBlack" icon="fa-solid fa-sort" /> </th>
            <th v-on:click="sortBy('priceAtAddition')">Hind lisamisel  <font-awesome-icon class="iconStyleEditBlack" icon="fa-solid fa-sort" /> </th>
            <th>Muutus lisamisest</th>
            <th v-on:click="sortBy('priceHigher')">Ülemine piirhind  <font-awesome-icon class="iconStyleEditBlack" icon="fa-solid fa-sort" /> </th>
            <th v-on:click="sortBy('priceLower')">Alumine piirhind  <font-awesome-icon class="iconStyleEditBlack" icon="fa-solid fa-sort" /> </th>
            <th v-on:click="sortBy('userComment')">Kommentaar  <font-awesome-icon class="iconStyleEditBlack" icon="fa-solid fa-sort" /> </th>
            <th v-on:click="sortBy('additionDate')">Lisamise kuupäev  <font-awesome-icon class="iconStyleEditBlack" icon="fa-solid fa-sort" /> </th>
            <th>Lisainfo</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="response in sortedResponses">
            <td> {{ response.shortName }}</td>
            <td> {{ response.currentPrice }} {{ response.currency }}</td>
            <td> {{ response.priceChangePercentage }} %</td>
            <td> {{ response.priceAtAddition }}</td>
            <td> {{ -(response.priceAtAddition - response.currentPrice) }} {{ response.currency }}</td>
            <td> {{ response.priceHigher }} {{ response.currency }}</td>
            <td> {{ response.priceLower }} {{ response.currency }}</td>
            <td> {{ response.userComment }}</td>
            <td> {{ response.additionDate }}</td>
            <td><button class="btn-outline-dark btn justify-content-end" type="button">Lisainfo</button></td>


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
      userId: '',
      currentSort: '',
      currentSortDirection: 'asc',
      responses: [
        {
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

