<template>
  <div>

  <div class="container">
    <div class="row">
    <div class="row col-2 mt-3">
      <p class="navbarGreeting"> Tere {{ username }}!</p>
    </div>
    <div class="row">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark bg-opacity-75 mt-1 col-8" style="border-radius: 10px">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link to="/watchlist">
                  <a class="nav-link active" aria-current="page" href="#">Watchlist</a>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/portfolio">
                  <a class="nav-link active" aria-current="page" href="#">Portfell</a>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/portfolio">
                  <a class="nav-link active" aria-current="page" href="#">Ost & Müük</a>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/history">
                  <a class="nav-link active" aria-current="page" href="#">Ajalugu</a>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/">
                  <a v-on:click="clearSessionStorage" class="nav-link active" aria-current="page" href="#">Logi
                    välja</a>
                </router-link>
              </li>
            </ul>
            <form class="d-flex">
              <input v-model="search" v-on:keyup.enter="searchTicker" class="form-control me-2" type="search" placeholder="Otsi" aria-label="Search">
              <button v-on:click="searchTicker" class="btn btn-outline-light" type="submit">OTSI</button>
            </form>
          </div>
        </div>
      </nav>
      <div class="col-lg-4 mt-4">
        <router-link to="/watchlist">
          <img class="img-fluid col-6" alt="Logo" src="../../assets/logo-no-background.png">
        </router-link>
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
      search: '',
      quotes: [
        {
          shortname: '',
          symbol: '',
          exchDisp: '',
        }
      ],
    }
  },
  methods: {
    getUserName: function () {
      this.username = sessionStorage.getItem('username')
    },
    clearSessionStorage: function () {
      sessionStorage.clear();
    },
    searchTicker: function () {
      sessionStorage.setItem('search', this.search)
      this.$emit('searchTicker')
      this.$router.push({path: '/search'})
    }
  },
  mounted() {
    this.getUserName()
  }
}
</script>