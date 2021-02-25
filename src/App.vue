<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/BabelSort">Babel sort</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss"></style>

<style scoped>
#nav {
  display: flex;
  padding: 20px 0;
  justify-content: space-evenly;
  font-size: 18px;
}
</style>
