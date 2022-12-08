<template>
  <div class="container">
    <div>
      <NavbarAdmin/>
    </div>
    <div>
      <div class="row">
        <div class="col-9">
          <table class="table table-hover searchTableAdd" style="margin-top: 100px">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Kasutajanimi</th>
              <th scope="col">Eesnimi</th>
              <th scope="col">Perekonnanimi</th>
              <th scope="col">Email</th>
              <th scope="col">Registreerimise kuupäev</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in userInfo" v-on:click="getDetailedUserInfo(user.username)">
              <th scope="row">{{ user.index }}</th>
              <td> {{ user.username }}</td>
              <td> {{ user.firstname }}</td>
              <td> {{ user.lastname }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.startDate }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

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
      toggle: false,
      selectedUserName: '',
      userId: '',
      index: '',
      email: '',
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
    getDetailedUserInfo: function (username) {
      sessionStorage.setItem('userQuery', username)
      this.$router.push({path: '/user'})
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

