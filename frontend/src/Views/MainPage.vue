<template>
 <main class="page">
            <section class="profile">
                <div class="profile__container">
                    <div class="profile__photo-container">
                        <img :src= "userInfo1.avatar" alt="Кусто" class="profile__photo">
                        <div class="profile__photo-overlay"  v-on:click="openAvatarPop"></div>
                    </div>
                    <div class="profile__all">
                        <div class="profile__box">
                             <h1 class="profile__name">{{userInfo1.name}}</h1>
                            <button class="profile__corrector"
                                type="button" v-on:click="openPopupEditProfile = true"></button>
                        </div>
                        <p class="profile__occupation">{{userInfo1.about}}</p>
                    </div>
                </div>
                <button class="profile__add-button" type="button" v-on:click="openPopupAddNewCard = true"></button>
            </section>
            <section>
                <ul class="elements" id="cards">
                     <li v-for= "(item, index) in initialCards" :key="item._id" class="elements__item">
        <button :class="{elements__delete : item.owner === userInfo1._id, 
        elements__delete_noactive :item.owner !== userInfo1._id,}"
            type="button" v-on:click="deleteCard($event, index, item._id)"></button>
        <img :src="item.link" alt="Фото"
            class="elements__photo" v-on:click="openImagePopup($event, item.link, item.name)">
        <div class="elements__name-container">
            <h3 class="elements__name">{{item.name}}</h3>
            <div class="elements__like-container">
                <button :class=" {'elements__button_active': item.likes.some(i => i === userInfo1._id) , 
                'elements__button' : !item.likes.some(i => i === userInfo1._id)}"
                    type="button" v-on:click = "handleCardLike(item)"></button>
                <p class="elements__like-counter">
                    {{item.likes.length}}</p>
            </div>
        </div>
    </li>

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
                        minlength="2" maxlength="40" name="name" required v-model="userInfo.name">
                    <span class="form__input-error" id="name-error"></span>
                    <input type="text" class="form__input" id="job"
                        minlength="2" maxlength="200" name="about" required v-model="userInfo.about">
                    <span class="form__input-error" id="job-error"></span>
                    <button class="form__save-button form__save-button_edit"
                        type="submit" v-on:click.prevent="changeUserInfo($event),  openPopupEditProfile=false">Coхранить</button>
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
                        autocomplete="off" placeholder="Новое место" v-model="name">
                    <span class="form__input-error" id="place-error"></span>
                    <input type="url" class="form__input" id="link"
                        name="link" required autocomplete="off"
                        placeholder="Ссылка на картинку" v-model="link">
                    <span class="form__input-error" id="link-error"></span>
                    <button class="form__save-button
                        form__save-button_new-card" type="button" v-on:click ="newCardAdd($event), openPopupAddNewCard = false">Создать</button>
                </form>
            </div>
        </div>
        <div :class="{popup :!openPopupImage, 'popup popup_opened' : openPopupImage==true}">
            <figure class="popup__image-container">
                <button class="popup__close popup__close_image"
                    type="button" v-on:click="openPopupImage=false"></button>
                <img :src="imagePopupSrc" alt="Изображение красивого места"
                    class="popup__image">
                <figcaption class="popup__image-name">{{imagePopupName}}</figcaption>
            </figure>
        </div>
        
        <div :class="{popup : !openPopupAvatar, 'popup popup_opened'  : openPopupAvatar==true}">
            <div class="popup__container">
                <button class="popup__close popup__close_avatar"
                    type="button" v-on:click="openPopupAvatar = false"></button>
                <form class="form" name="avatar" novalidate>
                    <h2 class="form__title">Обновить аватар</h2>
                    <input type="url" class="form__input" id="avatar" name="avatar" 
                    required autocomplete="off" placeholder="Ссылка на картинку" v-model="userInfo.avatar">
                    <span class="form__input-error" id="avatar-error"></span>
                    <button class="form__save-button
                        form__save-button_avatar" type="submit" v-on:click.prevent="changeUserAvatar($event), openPopupAvatar==false">Coхранить</button>
                </form>
            </div>
        </div>
        <router-view></router-view>
       
        <footer class="footer">
            
            <p class="footer__text">&#169; 2022.Mesto Russia</p>
        </footer>
</template>

<script>


const axios = require('axios').default;

export default {
    components: {
        
    },
  data: function () {
    return {
      openPopupAvatar: false,
      openPopupEditProfile: false,
      openPopupAddNewCard: false,
      openPopupImage: false,
      initialCards: [],
      name: "",
      link: "",
      userInfo: {
         _id: "",
        name: "",
        about: "",
        avatar: "",
        email: "",
       
      },
      id: this.$store.state.userInfo._id,
      imagePopupSrc: "",
      imagePopupName: "",
     headers : {
        "Authorization": localStorage.getItem('jwt') 
     }
      
    }
  },
  computed: {
  userInfo1() {
    return this.$store.getters.USER;
  },
},
  methods: {
     newCardAdd() {   
        let obj = {
            name: this.name,
            link: this.link
        }
        console.log(obj)
     axios.post('http://localhost:3000/api/cards', obj, {headers: this.headers}) 
          .then((response) => {
            let arr = [response.data, ...this.initialCards];
            this.initialCards=arr
     }) 
     },

      changeUserInfo() {
        let user= {
            name: this.userInfo.name,
            about: this.userInfo.about
        }
         this.$store.dispatch('CHANGE_USERINFO', user); 
    // axios.patch('http://localhost:3000/api/users/me', user, {headers:this.headers} )
    // .then(response=>console.log(response))
    },

    changeUserAvatar () {
        let userAvatar = {
            avatar: this.userInfo.avatar
        }
         this.$store.dispatch('CHANGE_AVATAR', userAvatar);    


    // let userAvatar = {
    //         avatar: this.userInfo.avatar
    //     }
    //          axios.patch('http://localhost:3000/api/users/me/avatar', userAvatar, {headers: this.headers} )
    // .then(response=>console.log(response))

    },
    openImagePopup (event, src, name) {
        this.openPopupImage=true;
        this.imagePopupSrc=src;
        this.imagePopupName=name;
    },

    openAvatarPop () {
        this.openPopupAvatar=true;
    },

    deleteCard (event, index, id) {
            this.initialCards.splice(index, 1);
            axios.delete('http://localhost:3000/api/cards/' + id, {headers: this.headers})
           .then(response=>console.log(response))
        },

    handleCardLike(item) {
    const isLiked = item.likes.some(i => i === this.userInfo1._id);
     if (isLiked) {
           axios.delete('http://localhost:3000/api/cards/likes/' + item._id, {headers: this.headers})
           .then((response)=>{
            const newCard=response.data
             const newCards = this.initialCards.map((currentCard) => currentCard._id === item._id ? newCard : currentCard)
         this.initialCards = newCards
           })
          
        } else {
           fetch('http://localhost:3000/api/cards/likes/' + item._id, {
            method: 'PUT',
            headers: this.headers
        })
        .then((res)=> {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }) 
           .then(data=>{
             const newCard=data
              const newCards = this.initialCards.map((currentCard) => currentCard._id === item._id ? newCard : currentCard)
         this.initialCards = newCards
           })
        }
  }
    },
  
  beforeMount() {
     axios.get('http://localhost:3000/api/cards', {headers: this.headers})
    .then(response=>this.initialCards=response.data)
 },

 mounted () {
    this.$store.dispatch('GET_USER');
//     axios.get('http://localhost:3000/api/users/me', {headers:this.headers})
//     .then((response) => {
// this.userInfo = response.data
//        this.id=response.data._id
//     })
},
}
  

</script>

<style>
@import '../../public/pages/index.css';

</style>