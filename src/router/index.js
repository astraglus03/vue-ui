import { createRouter, createWebHashHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import MainLayout from '../components/layout/MainLayout.vue'
import MeetingView from '../views/MeetingView.vue'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingPage
  },
  {
    path: '/workspace',
    component: MainLayout
  },
  {
    path: '/meeting/:id',
    name: 'meeting',
    component: MeetingView,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
