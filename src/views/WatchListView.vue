<template>

  <div class="container">
    <Navbar/>
    <div class="row">
      <div class="col-6">
        <table class="table table-hover">
          <thead>
          <tr>
            <th scope="col">Instrument</th>
            <th scope="col">Hetkehind</th>
            <th scope="col">Muutus täna</th>
            <th scope="col">Hind lisamisel</th>
            <th scope="col">Muutus lisamisest</th>
            <th scope="col">Ülemine piirhind</th>
            <th scope="col">Alumine piirhind</th>
            <th scope="col">Kommentaar</th>
            <th scope="col">Lisamise kuupäev</th>
            <th scope="col">Lisainfo</th>
          </tr>
          </thead>
          <tbody class="searchTable">
          <tr>
            <td> {{ response.shortname }}</td>
            <td> {{ response.currentPrice }} {{ response.currency }}</td>
            <td> {{ response.priceChangePercentage }}</td>
            <td> {{ response.addedPrice }}</td>
            <td> {{ -(response.addedPrice - response.currentPrice) }} {{ response.currency }}</td>
            <td> {{ response.highAlertPrice }} {{ response.currency }}</td>
            <td> {{ response.lowAlertPrice }} {{ response.currency }}</td>
            <td> {{ response.comment }}</td>
            <td> {{ response.addedDate }}</td>
            <td>{{ }}</td>
            <td class="submitButton">
                  <button v-on:click="navigateToInstrumentView" class="btn btn-dark" type="button">Lisainfo</button>
            </td>
          </tr>
          </tbody>
        </table>
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
      response: {
        symbol: 'EGR1',
        shortname: 'Enefit',
        currentPrice: 25.78,
        priceChangePercentage: 0.0,
        currency: 'EUR',
        addedPrice: 17.55,
        highAlertPrice: 0,
        lowAlertPrice: 0,
        comment: 'kommentaar',
        addedDate: 'eile'
      }
    }
  },
  methods: {
    getUserId: function () {
      this.userId = sessionStorage.getItem('userId')
    },
    getWatchlistData: function () {
      this.$http.get("/watchlist", {
            params: {
              watchlistRequest: this.response,
              userId: this.userId
            }
          }
      ).then(response => {
        response.data = this.response
      }).catch(error => {
        console.log(error)
      })
    },
    navigateToInstrumentView: function () {
      // this.$router.push(name: 'InstrumentInfoRoute')
    },
  },
  mounted() {
    this.getUserId()
  },
  beforeMount() {
    this.getWatchlistData(this.response.symbol, this.userId)
  }
}
</script>

