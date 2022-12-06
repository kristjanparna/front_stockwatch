<template>
  <div class="container">
    <div>
      <NavbarAdmin @getDetailedUserInfo="getDetailedUserInfo"/>
    </div>
    <div>
      <table class="table mt-5">
        <thead>
        <tr>
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
        <tr>
          <td> {{ userInfo.username }}</td>
          <td> {{ userInfo.firstname }}</td>
          <td> {{ userInfo.lastname }}</td>
          <td>{{ userInfo.email }}</td>
          <td>{{ userInfo.startDate }}</td>
          <td>
            <font-awesome-icon v-if="userInfo.username != 'admin'" v-on:click="toggle = !toggle" icon="fa-solid fa-user-pen"
                               class="iconStyleEdit"/>
            <div v-show="toggle" class="d-inline-flex">
              <input v-show="toggle" v-model="email" type="text" class="form-control hiding" placeholder="uus email"
                     aria-label="Username"
                     aria-describedby="basic-addon1">
              <font-awesome-icon  v-show="toggle" v-on:click="editUserEmail(userInfo.username)" class="checkButton"

                                 icon="fa-solid fa-circle-check"/>
              <div>
                <ErrorAlert :message="error.message"/>
              </div>
            </div>
          </td>
          <td>
            <font-awesome-icon v-if="userInfo.username != 'admin'" v-on:click="deleteUser(userInfo.username)" icon="fa-solid fa-user-minus"
                               class="iconStyleDelete"/>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import NavbarAdmin from "@/components/navbars/NavbarAdmin";
import ErrorAlert from "@/components/ErrorAlert";

export default {
  name: "AdminDetailedView",
  components: {NavbarAdmin, ErrorAlert},
  data: function () {
    return {
      error: {
        message: '',
        errorCode: ''
      },
      toggle: false,
      username: '',
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
    getDetailedUserInfo: function () {
      this.$http.get("/userinfo/detail", {
            params: {
              username: sessionStorage.getItem('userQuery'),
            }
          }
      ).then(response => {
        console.log(response.data)
        this.userInfo = response.data
      }).catch(error => {
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
        this.error.message = error.response.data.message
      })
    },
  },
  beforeMount() {
    this.getDetailedUserInfo()
  }
}
</script>

