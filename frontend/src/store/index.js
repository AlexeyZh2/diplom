import {createStore} from 'vuex'
const axios = require('axios').default;
export default createStore({
  
    state: { 
      userInfo: {
        _id: "",
       name: "",
       about: "",
       avatar: "",
       email: "", 
     },
     openPopupAvatar: false,
     openPopupEditProfile: false, 
    },
    
    getters: {  
      USER (state){ 
        return state.userInfo;
      },
      OPEN_AVATAR_POPUP: (state) => {return state.openPopupAvatar},
      OPEN_POPUP_PROFILE: (state) =>{return state.openPopupEditProfile}, 
    },
    
    mutations: {
      SET_AVATAR_POPUP: (state) =>{
      state.openPopupAvatar=true;
      },
      SET_CLOSE_AVATAR_POPUP: (state) =>{
        state.openPopupAvatar=false;
      },
      SET_PROFILE_POPUP: (state) => {
        state.openPopupEditProfile=true
      },
      SET_CLOSE_PROFILE_POPUP: (state) => {
        state.openPopupEditProfile=false
      },
      SET_USER : (state, payload) => {
        state.userInfo = payload;
      },
      SET_USER_AVATAR : (state, payload) => {
        state.userInfo.avatar = payload;
      },
      SET_USER_INFO : (state, payload) => {
        state.userInfo.name = payload.name;
        state.userInfo.about = payload.about
      },
      SET_USER_RESET: (state) => {
        state.userInfo.email = "";
      }
    },
    
    actions: {
      GET_USER: (context) => {
        axios.get('http://localhost:3000/api/users/me', {headers: {
          'Authorization': localStorage.getItem('jwt')
        }}).then(res=>{
          let user=res.data
          context.commit('SET_USER', user);
        })
        
      },

      CHANGE_AVATAR:  (context, payload) => {
        console.log(payload)
        axios.patch('http://localhost:3000/api/users/me/avatar', payload, {headers: {
          'Authorization': localStorage.getItem('jwt')
        }});
        context.commit('SET_USER_AVATAR', payload.avatar);
      },

      CHANGE_USERINFO:  (context, payload) => {
        console.log(payload)
        axios.patch('http://localhost:3000/api/users/me', payload, {headers: {
          'Authorization': localStorage.getItem('jwt')
        }});
        context.commit('SET_USER_INFO', payload);
      },
    }
  })

