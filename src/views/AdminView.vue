<template>

  <div class="container">
    <div>
      <NavbarAdmin/>
    </div>
    <div class="row">
      <div class="col-9">
        <table class="table table-hover" style="margin-top: 100px">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Kasutaja</th>
            <th scope="col">Eesnimi</th>
            <th scope="col">Perekonnanimi</th>
            <th scope="col">email</th>
            <th scope="col">Registreerumise kuupäev</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">1</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <font-awesome-icon icon="fa-solid fa-user-minus"/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <h1>Siia võimalus kasutaja registreerumise lõpetamiseks, kasutaja andmete muutmiseks (email ntks).
      </h1>
    </div>
  </div>

</template>

<script>
import NavbarAdmin from "@/components/navbars/NavbarAdmin";


export default {
  name: "AdminView",
  components: {NavbarAdmin},
  data: function () {
    return {
      userId: '',
      userInfo: {
        username: '',
        firstname:'',
        lastname: '',
        email: '',
        startDate: ''
      }
    }
  },
  methods: {
    getUserName: function () {
      this.userId = sessionStorage.getItem('userId')
    },
    getUserInfo: function () {
      this.$http.get("/userinfo")
          .then(response => {
            this.userInfo = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
  mounted() {
    this.getUserName()
  },
  beforeMount() {
    this.getUserInfo()
  }
}
</script>

