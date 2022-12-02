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
          <tr v-for="user in userInfo" :key="user.name">
            <th scope="row">{{ user.index }}</th>
            <td> {{ user.username }}</td>
            <td> {{ user.firstname }}</td>
            <td> {{ user.lastname }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.startDate }}</td>
            <td>
              <font-awesome-icon v-on:click="toggle = !toggle" icon="fa-solid fa-user-pen"
                                 class="iconStyleEdit"/>
              <div v-show="toggle" class="d-inline-flex">
                <input v-show="toggle" v-model="email" type="text" class="form-control hiding" placeholder="email"
                       aria-label="Username"
                       aria-describedby="basic-addon1">
                <font-awesome-icon v-show="toggle" v-on:click="editUserEmail(user.username)" class="checkButton"

                               icon="fa-solid fa-circle-check"/>
              </div>
            </td>
            <td>
              <font-awesome-icon v-on:click="deleteUser(user.username)" icon="fa-solid fa-user-minus"
                                 class="iconStyleDelete"/>
            </td>
          </tr>
          </tbody>
        </table>
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
    deleteUser: function (username) {
      this.$http.put("/remove", null, {
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
    editUserEmail: function (username) {
      this.$http.put("/userinfo", null, {
            params: {
              email: this.email,
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

