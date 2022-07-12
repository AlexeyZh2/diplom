<template>
  <div :class="{popup : openPopupAvatar===false, 'popup popup_opened'  : openPopupAvatar===true}">
            <div class="popup__container">
                <button class="popup__close popup__close_avatar"
                    type="button" v-on:click="SET_CLOSE_AVATAR_POPUP"></button>
                <form class="form" name="avatar" novalidate>
                    <h2 class="form__title">Обновить аватар</h2>
                    <input type="url" class="form__input" id="avatar" name="avatar" 
                    required autocomplete="off" placeholder="Ссылка на картинку" v-model="userAvatar">
                    <span class="form__input-error" id="avatar-error"></span>
                    <button class="form__save-button
                        form__save-button_avatar" type="submit" v-on:click.prevent="changeUserAvatar">Coхранить</button>
                </form>
            </div>
        </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
   
  data: function () {
    return {
      userAvatar: ''  
    }
  },
  methods: {
     ...mapMutations(['SET_CLOSE_AVATAR_POPUP']),

      changeUserAvatar () {
        let userAvatar = {
            avatar: this.userAvatar
        }
         this.$store.dispatch('CHANGE_AVATAR', userAvatar);
          this.$store.commit('SET_CLOSE_AVATAR_POPUP');   
  },
  },

   computed: {
  openPopupAvatar() {
    return this.$store.getters.OPEN_AVATAR_POPUP;
  }
   },   
}
</script>

<style>
@import '../../public/pages/index.css';
</style>