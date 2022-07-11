<template>
 <div :class="{popup : !openPopupAvatar, 'popup popup_opened'  : openPopupAvatar==true}">
            <div class="popup__container">
                <button class="popup__close popup__close_avatar"
                    type="button" ></button>
                <form class="form" name="avatar" novalidate>
                    <h2 class="form__title">Обновить аватар</h2>
                    <input type="url" class="form__input" id="avatar" name="avatar" required autocomplete="off" placeholder="Ссылка на картинку">
                    <span class="form__input-error" id="avatar-error"></span>
                    <button class="form__save-button
                        form__save-button_avatar" type="submit">Coхранить</button>
                </form>
            </div>
        </div>
</template>
<script>
export default {
    props: {
        openAvatarPopup: Boolean,
    },
  data: function () {
    return {
      
    }
  },
  methods: {
    
    
  },
  beforeMount() {
        
},

}
</script>

<style>
@import '../../public/pages/index.css';

</style>