import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LogIn.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUp.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: import('../views/Layout.vue'),
    children: [
      {
        path: '',
        name: 'posts',
        component: () => import('../views/PostsView.vue'),
      },
      {
        path: ':id',
        name: 'userNewsFeed',
        component: import('../views/UserNewsFeed.vue'),
      },
      {
        path: 'postnewsfeed',
        name: 'postnewsfeed',
        component: () => import('../views/PostNewsFeed.vue'),
      },
      {
        path: 'following',
        name: 'following',
        component: () => import('../views/Following.vue'),
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('../views/Settings.vue'),
      },
      {
        path: 'likes',
        name: 'likes',
        component: () => import('../views/Likes.vue'),
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'home',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
