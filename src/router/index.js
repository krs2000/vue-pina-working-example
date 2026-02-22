import { createRouter, createWebHistory } from 'vue-router'

import BasicState    from '../views/BasicState.vue'
import Getters       from '../views/Getters.vue'
import Actions       from '../views/Actions.vue'
import SetupStore    from '../views/SetupStore.vue'
import Plugins       from '../views/Plugins.vue'
import Subscriptions from '../views/Subscriptions.vue'
import Composition   from '../views/Composition.vue'
import StoreToRefs   from '../views/StoreToRefs.vue'
import Testing       from '../views/Testing.vue'

const routes = [
  { path: '/',               redirect: '/basic-state' },
  { path: '/basic-state',    component: BasicState },
  { path: '/getters',        component: Getters },
  { path: '/actions',        component: Actions },
  { path: '/setup-store',    component: SetupStore },
  { path: '/plugins',        component: Plugins },
  { path: '/subscriptions',  component: Subscriptions },
  { path: '/composition',    component: Composition },
  { path: '/store-to-refs',  component: StoreToRefs },
  { path: '/testing',        component: Testing },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
