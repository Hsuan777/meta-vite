import req from './https';

// posts
export const apiGetPosts = (query) => req('get', `posts?${query}`);
export const apiGetPost = (id) => req('get', `posts/${id}`);
export const apiPostPosts = (params, settings) => req('post', 'posts', params, settings);

// posts likes
export const apiGetLikeList = () => req('get', `posts/user/likeList`);
export const apiPostLikes = (id) => req('post', `posts/${id}/likes`);

// post comments
export const apiPostComment = (postId, params) => req('post', `posts/${postId}/comment`, params);
export const apiDeleteComment = (commentId) => req('delete', `posts/${commentId}/comment`);

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
export const apiTPCallback = (onceToken) => req('get', `user/TPcallback?onceToken=${onceToken}`);
