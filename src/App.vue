<template >
  <div  class="documentBackground">
    <div>
      <router-view/>
    </div>
  </div>

</template>

<style>
@import "assets/css/myStyle.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(#e2fdff, #9bb1ff, #bfd7ff);

}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #20c997;
}
</style>
