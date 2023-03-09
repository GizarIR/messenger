export const domain = 'http://127.0.0.1:8000/';
export const reqPathChat = 'api/v1/chat/';
export const reqPathReg = 'api/v1/auth/users/';
export const reqPathLogin = 'auth/token/login/';
export const reqPathSetUsername = 'api/v1/auth/users/set_username/';

export const chatList = document.querySelector('.list_chat');
export const section = document.querySelector('.section')
export const btn_home = document.querySelector('.btn_home'); 
export const btn_login = document.querySelector('.btn_login');
export const btn_create = document.querySelector('.btn_create'); 
export const btn_del = document.querySelector('.btn_del');
export const btn_leave = document.querySelector('.btn_leave');
export const btn_profile = document.querySelector('.btn_profile');
export const sidebar = document.querySelector('.sidebar');

export const wsUri = 'ws://' + window.location.host + '/ws/chat/'