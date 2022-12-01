<template>

  <div>

    <Navbar/>

    <div class="row">
      <div class="col-9">
        <table class="table table-hover" style="margin-top: 100px">
          <thead>
          <tr>
            <th scope="col">Nimi</th>
            <th scope="col">Hetkehind</th>
            <th scope="col">Muutus täna</th>
            <th scope="col">Muutus lisamisest</th>
            <th scope="col">Lisamise kuupäev</th>
            <th scope="col">Kommentaar</th>
            <th scope="col">Ülemine piirhind</th>
            <th scope="col">Alumine piirhind</th>
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

    }
  },
  methods: {
    getUserId: function () {
      this.userId = sessionStorage.getItem('userId')
    },
  },
  mounted() {
    this.getUserId()
  }
}
</script>

