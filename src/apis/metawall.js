import req from './https';

export const apiGetPosts = () => req('get', 'posts');
export const apiPostPosts = (params) => req('post', 'posts', params);
export const apiSignin = (params) => req('post', 'user/signin', params);
export const apiCheckSignin = (params) => req('get', 'user/check', params);
