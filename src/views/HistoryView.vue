<template>
  <div class="container">
    <div>
      <Navbar/>
    </div>
    <div class="row">
      <div class="mt-3 col-5">
        <div class="input-group">
          <span class="input-group-text">Vali kuupäevad</span>
          <input v-model="startDate" type="date" aria-label="First name" class="form-control">
          <input v-model="endDate" type="date" aria-label="Last name" class="form-control">
        </div>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-4 mt-3 justify-content-sm-start">
          <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input checked v-on:click="getTransactionHistory(id1)" type="radio" class="btn-check" name="btnradio"
                   id="all" autocomplete="off">
            <label class="btn btn-outline-dark submitButton" for="all">Kõik</label>

            <input v-on:click="getTransactionHistory(id2)" type="radio" class="btn-check" name="btnradio"
                   id="buy" autocomplete="off">
            <label class="btn btn-outline-dark submitButton" for="buy">Ost</label>

            <input v-on:click="getTransactionHistory(id3)" type="radio" class="btn-check" name="btnradio"
                   id="sell" autocomplete="off">
            <label class="btn btn-outline-dark submitButton" for="sell">Müük</label>
            <button v-on:click="resetFilters" type="button" class="btn btn-dark submitButton">Tühjenda filtrid
            </button>
          </div>
        </div>
      </div>
      <div>
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
</template>
<script>
import Navbar from "@/components/navbars/Navbar";

export default {
  name: "HistoryView",
  components: {Navbar},
  data: function () {
    return {
      id1: 0,
      id2: 1,
      id3: 2,
      userId: '',
      startDate: '',
      endDate: '',
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
    getTransactionHistory: function (id) {
      let transactionTypeId = 0;
      if (id === this.id1) {
        transactionTypeId = 0;
      }
      if (id === this.id2) {
        transactionTypeId = 1
      }
      if (id === this.id3) {
        transactionTypeId = 2
      }
      let sDate = this.startDate.toString()
      let eDate = this.endDate.toString()
      this.$http.get("/history", {
            params: {
              userId: sessionStorage.getItem('userId'),
              transactionTypeId: transactionTypeId,
              dateStart: sDate,
              dateEnd: eDate
            }
          }
      ).then(response => {
        console.log(response.data)
        this.responseBody = response.data
      }).catch(error => {
        console.log(error)
      });
    },
    resetFilters: function () {
      this.$router.go()
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
