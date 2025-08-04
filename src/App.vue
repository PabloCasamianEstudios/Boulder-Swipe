<template>
  <main>
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'App',
  methods: {
    goToGame() {
      this.$router.push('/game');
    }
  }
}
</script>

<style scoped lang="scss">
body {
    min-height: 100vh;
}

main{
    min-height: 100vh;

}
</style>
