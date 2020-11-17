<template>
  <div id="app">
    <header>
      <div class="container-for-icon">
        <img
            v-if="$store.state.userId"
            src="./imgs/window-exit.png"
            width="50"
            height="50"
            @click="logout"
            style="cursor: pointer">
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/');
    }
  }
}
</script>

<style>
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
header {
  position: absolute;
  z-index: 2;
  height: 70px;
  background: white;
  width: 100%;
  top:0;
}
.container-for-icon {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: 310px;
  margin: auto;
  height: 100%;
}
</style>
