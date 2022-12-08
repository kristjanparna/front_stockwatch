<template>
  <div class="container">
    <Navbar/>
    <div class="row">
      <div class="col-9">
        <table class="table watchlistTable mt-3">
          <thead>
          <tr>
            <th class="tableBorders">Nimi
              <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort"/>
            </th>
            <th class="tableBorders">Ticker
              <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort"/>
            </th>
            <th class="tableBorders">Kogus
              <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort"/>
            </th>
            <th class="tableBorders">Tehingutasu
              <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort"/>
            </th>
            <th class="tableBorders">Ostuhind
              <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort"/>
            </th>
            <th class="tableBorders">Hetkehind</th>
            <th class="tableBorders">Muutus
              <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort"/>
            </th>
            <th class="tableBorders">Kasum
              <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort"/>
            </th>
            <th></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="response in responses" :key="response.ticker">
            <td class="tableBorders"> {{ response.shortName }}</td>
            <td class="tableBorders"> {{ response.ticker }}</td>
            <td class="tableBorders"> {{ response.totalAmount }}</td>
            <td class="tableBorders"> {{ response.totalTransactionFee }} €</td>
            <td class="tableBorders"> {{ response.avgBuyingPrice }} €</td>
            <td class="tableBorders"> {{ response.currentPrice }} €</td>
            <td class="tableBorders"> {{ response.priceChangePercentage }} %</td>
            <td class="tableBorders"> {{ response.earning }} €</td>
            <td>
              <button v-on:click="setTicker(response.ticker)" type="button" class="btn btn-outline-light">Osta</button>
            </td>
            <td>
              <button v-on:click="setTicker(response.ticker)" type="button" class="btn btn-outline-light disabled">Müü</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="col-3">
        <table class="table table-hover watchlistTable mt-3">
          <thead>
          <tr>
            <th>Sinu portfelli väärtus: </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td> {{ totalEarnings }}</td>
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
  name: "PortfolioView",
  components: {Navbar},
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      ticker: '',
      totalEarnings: 0,
      responses: [
        {
          ticker: '',
          shortName: '',
          totalAmount: 0,
          totalTransactionFee: 0,
          avgBuyingPrice: 0,
          currentPrice: 0,
          priceChangePercentage: 0,
          earning: 0,
        }
      ],
    }
  },
  methods: {
    getTotalEarnings: function () {
      let i = 0;
      while (i < this.responses.length) {
        this.totalEarnings = this.totalEarnings + this.responses[i].earning;
        i++;
      }
    },
    getUserId: function () {
      this.userId = sessionStorage.getItem('userId')
    },
    setTicker: function (ticker) {
      this.ticker = ticker;
      sessionStorage.setItem('ticker', this.ticker);
      this.$router.push("/watchlist/add")
    },
    getPortfolioData: function () {
      this.$http.get("/portfolio", {
        params: {
          userId: this.userId
        }
      }).then(response => {
        this.responses = response.data;
        this.getTotalEarnings()
      }).catch(error => {
        console.log(error)
      })
    },
  },
  mounted() {
    this.getUserId();
    this.getPortfolioData();
    this.getTotalEarnings();
  }
}
</script>

