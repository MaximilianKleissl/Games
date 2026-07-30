import { createRouter, createWebHistory } from 'vue-router'
import WelcomeScreen from '../components/WelcomeScreen.vue'
import HelloWorldGame from '../games/hello-world/HelloWorldGame.vue'

const router = createRouter({
  history: createWebHistory('/Games/'),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeScreen
    },
    {
      path: '/hello-world',
      name: 'hello-world',
      component: HelloWorldGame
    }
  ]
})

export default router
