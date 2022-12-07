<template>
  <div class="container">
    <div>
      <Navbar/>
    </div>
    <div>
      <div class="row">
        <div class="col-3 mt-3 justify-content-sm-start">
          <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input checked v-on:change="filterHistory(id1)" type="radio" class="btn-check" name="btnradio"
                   id="all" autocomplete="off">
            <label class="btn btn-outline-dark submitButton" for="all">Kõik</label>

            <input v-on:change="filterHistory(id2)" type="radio" class="btn-check" name="btnradio"
                   id="buy" autocomplete="off">
            <label class="btn btn-outline-dark submitButton" for="buy">Ost</label>

            <input v-on:change="filterHistory(id3)" type="radio" class="btn-check" name="btnradio"
                   id="sell" autocomplete="off">
            <label class="btn btn-outline-dark submitButton" for="sell">Müük</label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <table class="table watchlistTable mt-3">
            <thead>
            <tr>
              <th class="tableBorders">Instrument</th>
              <th class="tableBorders">Tehingu tüüp</th>
              <th class="tableBorders">Kogus</th>
              <th class="tableBorders">Ühiku hind</th>
              <th class="tableBorders">Tehingutasu</th>
              <th class="tableBorders">Tehingu hind kokku</th>
              <th class="tableBorders">Kuupäev</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="response in responseBody">
              <td class="tableBorders"> {{ response.portfolioInstrumentTicker }}</td>
              <td class="tableBorders" v-if="response.transactionTypeId == 1">Ost</td>
              <td class="tableBorders" v-else>Müük</td>
              <td class="tableBorders"> {{ response.amount }}</td>
              <td class="tableBorders"> {{ response.price }}</td>
              <td class="tableBorders"> {{ response.transactionFee }}</td>
              <td class="tableBorders"> {{ (response.price * response.amount) + response.transactionFee }}</td>
              <td class="tableBorders"> {{ response.date }}</td>
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

export default {
  name: "HistoryView",
  components: {Navbar},
  data: function () {
    return {
      id1: "all",
      id2: "buy",
      id3: "sell",
      userId: '',
      responseBody: [
        {
          portfolioInstrumentTicker: '',
          transactionTypeId: 0,
          amount: 0,
          price: 0,
          date: '',
          transactionFee: 0
        }
      ],
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
        this.responseBody = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    filterHistory: function (id) {
      if (id === this.id1) {
        alert("kõik");
      }
      if (id === this.id2) {
        alert("ost");
      }
      if (id === this.id3) {
        alert("müük")
      }
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
