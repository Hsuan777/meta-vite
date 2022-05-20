import req from './https';

export const apiGetPosts = () => req('get', 'posts');
export const apiGetUserProfile = () => req('get', 'user/profile');
export const apiPostPosts = (params, settings) => req('post', 'posts', params, settings);
export const apiPostUserPassword = (params) => req('post', 'user/updatePassword', params);
export const apiPatchUserProfile = (params, settings) => req('patch', 'user/profile', params, settings);
export const apiSignin = (params) => req('post', 'user/signin', params);
export const apiCheckSignin = (params) => req('get', 'user/check', params);
