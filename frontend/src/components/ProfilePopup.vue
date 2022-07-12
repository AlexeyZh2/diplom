<template>
  <div :class="{popup : openPopupEditProfile===false,'popup popup_opened' : openPopupEditProfile===true}">
            <div class="popup__container">
                <button class="popup__close popup__close_edit"
                    type="button" v-on:click="SET_CLOSE_PROFILE_POPUP"></button>
                <form class="form" name="profile" novalidate>
                    <h2 class="form__title">Редактировать профиль</h2>
                    <input type="text" class="form__input" id="name"
                        minlength="2" maxlength="40" name="name" required v-model="name">
                    <span class="form__input-error" id="name-error"></span>
                    <input type="text" class="form__input" id="job"
                        minlength="2" maxlength="200" name="about" required v-model="about">
                    <span class="form__input-error" id="job-error"></span>
                    <button class="form__save-button form__save-button_edit"
                        type="submit" v-on:click.prevent="changeUserInfo">Coхранить</button>
                </form>
            </div>
        </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    data: function () {
        return {
            name: '',
            about: '',
        }
    },

    methods: {
     ...mapMutations(['SET_CLOSE_PROFILE_POPUP']),

       changeUserInfo() {
        let user= {
            name: this.name,
            about: this.about
        }
         this.$store.dispatch('CHANGE_USERINFO', user); 
          this.$store.commit('SET_CLOSE_PROFILE_POPUP');
    },   
  },

  computed: {
  openPopupEditProfile() {
    return this.$store.getters.OPEN_POPUP_PROFILE;
  }
   },
}
</script>

<style>
@import '../../public/pages/index.css';
</style>