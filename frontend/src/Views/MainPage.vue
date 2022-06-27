<template>
 <main>
            <section class="profile">
                <div class="profile__container">
                    <div class="profile__photo-container">
                        <img src= '../images/kusto.jpg' alt="Кусто" class="profile__photo">
                        <div class="profile__photo-overlay"  v-on:click="openPopupAvatar = true"></div>
                    </div>
                    <div class="profile__all">
                        <div class="profile__box">
                            <h1 class="profile__name">Жак-Ив Кусто</h1>
                            <button class="profile__corrector"
                                type="button" v-on:click="openPopupEditProfile = true"></button>
                        </div>
                        <p class="profile__occupation">Исследователь океана</p>
                    </div>
                </div>
                <button class="profile__add-button" type="button" v-on:click="openPopupAddNewCard = true"></button>
            </section>
            <section>
                <ul class="elements" id="cards">

                </ul>
            </section>
        </main>
        <div :class="{popup : !openPopupEditProfile,'popup popup_opened' : openPopupEditProfile==true}">
            <div class="popup__container">
                <button class="popup__close popup__close_edit"
                    type="button" v-on:click="openPopupEditProfile=false"></button>
                <form class="form" name="profile" novalidate>
                    <h2 class="form__title">Редактировать профиль</h2>
                    <input type="text" class="form__input" id="name"
                        minlength="2" maxlength="40" name="name" required>
                    <span class="form__input-error" id="name-error"></span>
                    <input type="text" class="form__input" id="job"
                        minlength="2" maxlength="200" name="about" required>
                    <span class="form__input-error" id="job-error"></span>
                    <button class="form__save-button form__save-button_edit"
                        type="submit">Coхранить</button>
                </form>
            </div>
        </div>
        <div :class="{popup : !openPopupAddNewCard, 'popup popup_opened': openPopupAddNewCard==true}">
            <div class="popup__container">
                <button class="popup__close popup__close_new-card"
                    type="button" v-on:click="openPopupAddNewCard=false"></button>
                <form class="form" name="place" novalidate>
                    <h2 class="form__title">Новое место</h2>
                    <input type="text" class="form__input" id="place"
                        name="name" minlength="2" maxlength="30" required
                        autocomplete="off" placeholder="Новое место">
                    <span class="form__input-error" id="place-error"></span>
                    <input type="url" class="form__input" id="link"
                        name="link" required autocomplete="off"
                        placeholder="Ссылка на картинку">
                    <span class="form__input-error" id="link-error"></span>
                    <button class="form__save-button
                        form__save-button_new-card" type="submit">Создать</button>
                </form>
            </div>
        </div>
        <div class="popup popup_type_image">
            <figure class="popup__image-container">
                <button class="popup__close popup__close_image"
                    type="button"></button>
                <img src="#" alt="Изображение красивого места"
                    class="popup__image">
                <figcaption class="popup__image-name"></figcaption>
            </figure>
        </div>
        <div class="popup popup_type_delete">
            <div class="popup__container">
                <button class="popup__close popup__close_delete"
                    type="button"></button>
                <div class="form" name="delete" novalidate>
                <h2 class="form__title">Вы уверены?</h2>
                
                <button class="delete form__save-button"
                    type="button">Да</button>
                </div>
            </div>
        </div>
        <div :class="{popup : !openPopupAvatar, 'popup popup_opened'  : openPopupAvatar==true}">
            <div class="popup__container">
                <button class="popup__close popup__close_avatar"
                    type="button" v-on:click="openPopupAvatar = false"></button>
                <form class="form" name="avatar" novalidate>
                    <h2 class="form__title">Обновить аватар</h2>
                    <input type="url" class="form__input" id="avatar" name="avatar" required autocomplete="off" placeholder="Ссылка на картинку">
                    <span class="form__input-error" id="avatar-error"></span>
                    <button class="form__save-button
                        form__save-button_avatar" type="submit">Coхранить</button>
                </form>
            </div>
        </div>
       
        <footer class="footer">
            
            <p class="footer__text">&#169; 2022.Mesto Russia</p>
        </footer>
</template>
<script>
export default {
  data: function () {
    return {
      openPopupAvatar: false,
      openPopupEditProfile: false,
      openPopupAddNewCard: false,
      openPopupImage: false,
    }
  },
  methods: {
    
  },
  
  
}
</script>

<style>
@import '../../public/pages/index.css';

</style>