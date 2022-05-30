import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: '',
        name: 'posts',
        component: () => import('@/components/Posts.vue'),
      },
      {
        path: 'user',
        name: 'userPost',
        component: () => import('@/components/UserPost.vue'),
      },
      {
        path: 'person/:id',
        name: 'PersonPost',
        component: () => import('@/components/PersonPost.vue'),
      },
      {
        path: 'post',
        name: 'post',
        component: () => import('@/components/Post.vue'),
      },
      {
        path: 'following',
        name: 'following',
        component: () => import('@/components/Following.vue'),
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/components/Settings.vue'),
      },
      {
        path: 'likes',
        name: 'likes',
        component: () => import('@/components/Likes.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: {
          name: 'home',
        },
      },
    ]
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/views/SignIn.vue'),
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
