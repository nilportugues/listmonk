import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: 'Home' },
    component: Home,
  },
  {
    path: '/lists',
    name: 'lists',
    meta: { title: 'Lists' },
    component: () => import(/* webpackChunkName: "lists" */ '../views/Lists.vue'),
  },
  {
    path: '/forms',
    name: 'forms',
    meta: { title: 'Forms' },
    component: () => import(/* webpackChunkName: "lists" */ '../views/Forms.vue'),
  },
  {
    path: '/subscribers',
    name: 'subscribers',
    meta: { title: 'Subscribers' },
    component: () => import(/* webpackChunkName: "lists" */ '../views/Subscribers.vue'),
  },
  {
    path: '/subscribers/:id',
    name: 'subscriber',
    meta: { title: 'Subscribers' },
    component: () => import(/* webpackChunkName: "lists" */ '../views/Subscribers.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title;
  });
});

export default router;
