import { createRouter, createWebHashHistory } from 'vue-router'; // ← cambia esto
import GameScene from '../components/GameScene.vue';

const routes = [
  {
    path: '/game',
    name: 'GameScene',
    component: GameScene,
  },
];

const router = createRouter({
  history: createWebHashHistory(), // ← y esto
  routes,
});

export default router;