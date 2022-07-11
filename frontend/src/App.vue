<template>
 <header class="header">
        <div class="header__logo"></div>
        
          <div v-if="this.$route.name==='MainPage'" className="header__container">
            <p class="header__userEmail">{{ this.$store.state.userInfo.email}}</p>
            <router-link v-if="this.$store.state.userInfo.email !== ''"
              class="header__link"
              to="/signin"
              v-on:click="exit"
            >
              Выйти
            </router-link>
          </div>
        <router-link v-if="this.$route.name=='register'"  class="header__link" to="/signin">
            Войти
          </router-link>
        
        <router-link v-if ="this.$route.name==='login'" class="header__link" to="/signup">
          Зарегистрироваться
        </router-link>
      
    </header>

<router-view></router-view>
</template>

<script>


export default {
  name: 'App',
  data: function() {
    return {
loggedIn: true,
    }
  },
  methods : {
    exit () {
      localStorage.removeItem('jwt')
      this.$store.commit('SET_USER_RESET');
    },
    checkToken () {
      return localStorage.getItem('jwt')
    }
  }
}
</script>

<style>
@import '../public/pages/index.css';
</style>
