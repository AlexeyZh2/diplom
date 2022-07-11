import {createStore} from 'vuex'
//import Axios from 'axios';
const axios = require('axios').default;
export default createStore({
  
    // состояние (хранимые данные)
    state: { // доступ в компоненте: this.$store.state
      // доступ в компоненте: this.$store.state.countries
      userInfo: {
        _id: "",
       name: "",
       about: "",
       avatar: "",
       email: "",
      
     },
  //  initialCards: [],
      
    },
    // геттеры для фильтрации данных из state
    getters: {  // доступ в компоненте: this.$store.getters
      USER (state){ // доступ в компоненте: this.$store.getters.visited
        return state.userInfo;
      },
      CARDS: (state) => {return state.initialCards},
      
    },
    // мутации - методы для изменения данных из state
    // мутации не могут быть асинхронными
    mutations: {
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
      // единственный способ изменить состояние хранилища
      //методы в мутациях не могут быть асинхронными
      // доступ в компоненте:
      // this.$store.commit('имяМутации', данные);
      // либо:
      // import { mapMutations } from 'vuex';
      /*
      methods: {
        ...mapMutations(['имяМутации']), вариант 2
        ...mapMutations({
            имяДляИспользованияВКомпоненте: 'имяМутации', вариант 3
        })
      }
      */
      
    },
    // действия - методы для вызова мутация
    // действия могут быть асинхронными
    actions: {
      GET_USER: (context) => {
        axios.get('http://localhost:3000/api/users/me', {headers: {
          'Authorization': localStorage.getItem('jwt')
        }}).then(res=>{
          let user=res.data
          context.commit('SET_USER', user);
        })
        
      },

      // GET_USER: async (context) => {
      //   let {data} = await Axios.get('http://localhost:3000/api/users/me', {headers: {
      //     'Authorization': localStorage.getItem('jwt')
      //   }});
      //   context.commit('SET_USER', data);
      // },
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
      // доступ в компоненте:
      // this.$store.dispatch('имяДействия', данные);
      // либо:
      // import { mapActions } from 'vuex';
      /*
      methods: {
        ...mapActions(['имяДействия']), вариант 2
        ...mapActions({
            имяДляИспользованияВКомпоненте: 'имяДействия', вариант 3
        })
      }
      */
    }
  })

