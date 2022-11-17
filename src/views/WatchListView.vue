<template>

  <div>

    <div>
      <div>
        <nav>
          <router-link to="/">Home</router-link> |
          <router-link to="/login">Watchlist</router-link> |
          <router-link to="/register">Portfolio</router-link> |
          <router-link to="/register">Buy & Sell</router-link> |
          <router-link to="/register">History</router-link>
        </nav>
        <router-view/>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "WatchListView"
}
</script>

