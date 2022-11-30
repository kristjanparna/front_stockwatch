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
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in userInfo">
            <th scope="row">{{ user.index }}</th>
            <td> {{ user.username }}</td>
            <td> {{ user.firstname }}</td>
            <td> {{ user.lastname }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.startDate }}</td>
            <td>
              <font-awesome-icon icon="fa-solid fa-user-pen"
                                 class="iconStyleEdit"/>
            </td>
            <td>
              <font-awesome-icon v-on:click="deleteUser(info.username)" icon="fa-solid fa-user-minus"
                                 class="iconStyleDelete"/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <p>Siia võimalus kasutaja registreerumise lõpetamiseks, kasutaja andmete muutmiseks (email ntks).
      </p>
    </div>
    <button v-on:click="deleteUser" type="button" class="btn btn-outline-success">KUSTUTA!!!</button>
  </div>

</template>

<script>
import NavbarAdmin from "@/components/navbars/NavbarAdmin";


export default {
  name: "AdminView",
  components: {NavbarAdmin},
  data: function () {
    return {
      selectedUserName: '',
      userId: '',
      index: '',
      userInfo: {
        username: '',
        firstname: '',
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
    addSequenceNumbers: function () {
      let counter = 1
      this.userInfo.forEach(user => {
        user.index = counter
        counter++
      });
    },
    getUserInfo: function () {
      this.$http.get("/userinfo")
          .then(response => {
            this.userInfo = response.data
            this.addSequenceNumbers()
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    },
    deleteUser: function (username) {
      this.$http.post("/remove", null, {
            params: {
              username: username
            }
          }
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
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

