import { createRouter, createWebHistory } from 'vue-router'
import WelcomeScreen from '../components/WelcomeScreen.vue'
import HelloWorldGame from '../games/hello-world/HelloWorldGame.vue'
import SomeoneDoesNotKnow from '../games/someone-does-not-know/SomeoneDoesNotKnow.vue'
import WordDisplay from '../games/word-display/WordDisplay.vue'

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
    },
    {
      path: '/someone-does-not-know',
      name: 'someone-does-not-know',
      component: SomeoneDoesNotKnow
    },
    {
      path: '/word-display',
      name: 'word-display',
      component: WordDisplay
    }
  ]
})

export default router
