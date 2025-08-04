import { createRouter, createWebHistory } from 'vue-router';
import GameScene from '../components/GameScene.vue';

const routes = [
  {
    path: '/game',
    name: 'GameScene',
    component: GameScene,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
