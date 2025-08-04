<template>
  <div class="menu-scene">
    <div class="background-pattern"></div>
    <img src="/public/boulderswipelogo.png" alt="Logo Boulder Swipe" class="logo" />
    <h1>Boulder Swipe</h1>
    <p>Desliza desafíos de escalada, acepta los que quieras completar.</p>
    <button @click="goToGame">Comenzar</button>
  </div>
</template>

<script>
export default {
  name: 'MenuScene',
  methods: {
    goToGame() {
      this.$router.push('/game');
    }
  }
}
</script>

<style scoped lang="scss">
.menu-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: white;
  font-family: 'Segoe UI', sans-serif;
  color: #1f2937;
  text-align: center;
  padding: 20px;
  position: relative;
  overflow: hidden;

.background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    conic-gradient(
      from 45deg at 70% 30%,
      rgba(200, 233, 255, 0.03) 0deg,
      transparent 90deg,
      rgba(251, 113, 133, 0.03) 180deg,
      transparent 270deg
    ),
    linear-gradient(
      45deg, 
      transparent 48%, 
      rgba(0, 0, 0, 0.015) 49%, 
      transparent 51%
    ),
    linear-gradient(
      -45deg, 
      transparent 48%, 
      rgba(0, 0, 0, 0.015) 49%, 
      transparent 51%
    );
  background-size: 120px 120px;
  z-index: 0;
}

  h1 {
    font-size: 3.2rem;
    margin-bottom: 10px;
    color: #000;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.1);
    position: relative;
    z-index: 1;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 30px;
    max-width: 500px;
    color: #374151;
    position: relative;
    z-index: 1;
  }

  button {
    padding: 14px 36px;
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 12px;
    background-color: #fb7185;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1;

    &:hover {
      background-color: #f43f5e;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.97);
    }
  }
}

.logo {
  width: 120px;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}
</style>