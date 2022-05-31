import req from './https';

// posts
export const apiGetPosts = (query) => req('get', `posts?${query}`);
export const apiGetPost = (id) => req('get', `posts/${id}`);
export const apiGetUserPosts = (userId) => req('get', `posts/user/${userId}`);
export const apiPostPosts = (params, settings) => req('post', 'posts', params, settings);

// posts > likes
export const apiGetLikeList = () => req('get', `posts/user/likeList`);
export const apiPostLikes = (id) => req('post', `posts/${id}/likes`);

// user
export const apiGetUserProfile = () => req('get', 'user/profile');
export const apiPostUserPassword = (params) => req('post', 'user/updatePassword', params);
export const apiPatchUserProfile = (params, settings) => req('patch', 'user/profile', params, settings);

// user follow
export const apiFollowingList = () => req('get', `user/followingList`);
export const apiFollowersList = (userId) => req('get', `user/${userId}/followersList`);
export const apiCheckFollow = (userId) => req('get', `user/${userId}/checkFollow`);
export const apiPostFollow = (userId) => req('post', `user/${userId}/follow`);
export const apiPostUnFollow = (userId) => req('delete', `user/${userId}/unFollow`);

// user sign_in
export const apiSignup = (params) => req('post', 'user/signup', params);
export const apiSignin = (params) => req('post', 'user/signin', params);
export const apiCheckSignin = (params) => req('get', 'user/check', params);

// third party sign_in/sign_up
export const apiTPSignup = (params, settings) => req('post', 'user/TPSignup', params, settings);
export const apiTPSignin = (params, settings) => req('post', 'user/TPSignin', params, settings);
