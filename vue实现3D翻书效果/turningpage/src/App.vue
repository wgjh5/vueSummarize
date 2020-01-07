<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">turningPage_demo1</router-link> |
      <router-link to="/about">turningPage_demo2</router-link> |
	  <router-link to="/particles">particles_demo</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  min-height: 768px;
}
	* {
		margin: 0;
		padding: 0;
	}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
