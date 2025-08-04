<template>
  <div>
    <button @click="goToGame">Ir a Game Scene</button>
    <router-view />
  </div>
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

<style scoped></style>
