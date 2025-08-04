import { createRouter, createWebHashHistory } from 'vue-router';
import GameScene from '../components/GameScene.vue';
import MenuScene from '../components/MenuScene.vue';

const routes = [
  {
    path: '/game',
    name: 'GameScene',
    component: GameScene,
  },
  {
    path: '/',
    name: 'MenuScene',
    component: MenuScene,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
