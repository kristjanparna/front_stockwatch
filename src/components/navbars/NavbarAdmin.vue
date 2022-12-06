<template>
  <div>
    <div class="row">
  <div class="container">
    <div class="row col-2 " >
      <p class="navbarGreeting"> Tere {{ username }}!</p>
    </div>
    <div class="row ">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark bg-opacity-75 mt-5 col-8" style="border-radius: 10px">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link to="/admin">
                  <a class="nav-link active" aria-current="page" href="#">Kasutajad</a>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/admin">
                  <a class="nav-link active" aria-current="page" href="#">Statistika</a>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/admin">
                  <a class="nav-link active" aria-current="page" href="#">Müü andmeid</a>
                </router-link>
              <li class="nav-item">
                <router-link to="/">
                  <a v-on:click="clearSessionStorage" class="nav-link active" aria-current="page" href="#">Log out</a>
                </router-link>
              </li>
            </ul>
            <form class="d-flex">
              <input v-model="usernameQuery" class="form-control me-2" type="search" placeholder="Otsi kasutajat" aria-label="Search">
              <button v-on:click="getDetailedUserInfo" class="btn btn-outline-light" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      <div class="col-lg-4 mt-4">
          <img class="img-fluid col-6" alt="Logo" src="../../assets/logo-no-background.png">
      </div>
    </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  data: function () {
    return {
      username: '',
      usernameQuery: ''
    }
  },
  methods: {
    getUserName: function () {
      this.username = sessionStorage.getItem('username')
    },
    clearSessionStorage: function () {
      sessionStorage.clear();
    },
    getDetailedUserInfo: function () {
      sessionStorage.setItem('userQuery', this.usernameQuery);
      this.$emit('getDetailedUserInfo')
      this.$router.push({path: '/user'})

    },
  },
  mounted() {
    this.getUserName()
  }
}
</script>