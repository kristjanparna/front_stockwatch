<template>
  <div class="container">
    <Navbar/>
    <div class="row">
      <div class="col-9">
        <table class="table table-hover watchlistTable mt-3">
          <thead>
          <tr>
            <th class="tableBorders">Nimi
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
            <th>Kasum/Kahjum
              <font-awesome-icon class="iconStyleEditWhite" icon="fa-solid fa-sort"/>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="tableBorders"> TSLA</td>
            <td class="tableBorders"> 40</td>
            <td class="tableBorders"> 4 USD</td>
            <td class="tableBorders"> 34.90 USD</td>
            <td class="tableBorders"> 20.89 USD</td>
            <td class="tableBorders"> -46 %</td>
            <td> - 38.9 USD</td>
          </tr>
          <tr>
            <td class="tableBorders"> AMZN</td>
            <td class="tableBorders"> 50</td>
            <td class="tableBorders"> 5 USD</td>
            <td class="tableBorders"> 34.90 USD</td>
            <td class="tableBorders"> 20.89 USD</td>
            <td class="tableBorders"> -46 %</td>
            <td> - 38.9 USD</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="col-3">
        <table class="table table-hover watchlistTable mt-3">
          <thead>
          <tr>
            <th></th>
            <th> Tee midagi</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <button class="btn-outline-light btn justify-content-end" type="button">Lisa</button>
            </td>
            <td>
              <button class="btn-outline-light btn justify-content-end" type="button">Müü</button>
            </td>
            <td>
              <button class="btn-outline-light btn justify-content-end" type="button">Info</button>
            </td>
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
      userId: '',
      ticker: '',
      responses: [
        {
          ticker: '',
          amount: 0,
          transactionFee: 0,
          price: 0,
          currentPrice: 0,
          priceChangePercentage: 0,
          earning: 0,
        }
      ]
    }
  },
  methods: {
    getUserId: function () {
      this.userId = sessionStorage.getItem('userId')
    },
    setTicker: function () {
      sessionStorage.setItem('ticker', this.ticker);
    },
  },
  mounted() {
    this.getUserId()
  }
}
</script>

