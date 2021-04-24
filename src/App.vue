<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Sortable table</router-link> |
      <router-link to="/sort-inputs">Sort inputs</router-link> |
      <router-link to="/sort-graphik">Sort graphik</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #448aff;
    }
  }
}
</style>
