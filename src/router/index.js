import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: import('@/views/Layout.vue'),
    children: [
      {
        path: '',
        name: 'posts',
        component: () => import('@/views/PostsView.vue'),
      },
      {
        path: ':id',
        name: 'userNewsFeed',
        component: import('@/views/NewsFeed.vue'),
      },
      {
        path: ':id/postnewsfeed',
        name: 'postnewsfeed',
        component: () => import('@/views/PostNewsFeed.vue'),
      },
      {
        path: ':id/following',
        name: 'following',
        component: () => import('@/views/Following.vue'),
      },
      {
        path: ':id/settings',
        name: 'settings',
        component: () => import('@/views/Settings.vue'),
      },
      {
        path: ':id/likes',
        name: 'likes',
        component: () => import('@/views/Likes.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/LogIn.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignUp.vue'),
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
