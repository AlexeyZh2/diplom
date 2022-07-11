<template>
    <div class="login">
        <form class="login-form">
            <h2>Регистрация</h2>
            <input type="email"
                placeholder="Email"
                v-model="email">
            <input type="password"
                placeholder="Пароль"
                v-model="password">
            <button type="button"
                v-on:click="register">Зарегистрироваться</button>
            <p>Уже зарегистрированы? <router-link class="form-link"
                    to="/signin">Войти
                </router-link>
            </p>
        </form>
    </div>
    <div
        :class="{ popup: !isInfoToolTipOpen, 'popup popup_opened': isInfoToolTipOpen == true }">
        <div class="popup__container">
            <router-link v-if="isRegistered" class="popup__close"
                type="button" v-on:click="isInfoToolTipOpen=false" to="signin"></router-link>
                <router-link v-else class="popup__close"
                type="button" v-on:click="isInfoToolTipOpen=false" to="signup"></router-link>
            <div class="popup__auth-container">
                <img v-if="isRegistered" :src="authOK" class="popup__auth-image"
                    alt="OK or not OK">
                <img v-if="!isRegistered" :src="authNoOK" class="popup__auth-image"
                    alt="OK or not OK">
                    
                <p class="popup__auth-text">
                    {{ isRegistered
        ? "Вы успешно зарегистрировались!"
        : "Что-то пошло не так! Попробуйте ещё раз."}}</p>

            </div>
        </div>
    </div>
</template>
<script>
import authOK from "../images/authOK.png"
import authNoOK from "../images/authNoOK.png";
export default {
    data: function () {
        return {
            email: "",
            password: "",
            authOK,
            authNoOK,
            isInfoToolTipOpen: false,
            isRegistered: false,
        }
    },
    methods: {
        register: function () {
            let user = {
                email: this.email,
                password: this.password,
            }
            console.log(user)
            fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })
            })
                .then((res) => {
                    if (!res.ok) {
                         this.isRegistered=false
                    this.isInfoToolTipOpen=true
                        return Promise.reject(`Ошибка: ${res.status}`);
                    }
                    return res.json();
                }).then((data) => {
                    console.log(data)
                    this.isRegistered=true
                    this.isInfoToolTipOpen=true})
        }
    }
}
</script>
<style scoped>
@import '../../public/pages/index.css';

.login {
    color: white;
    margin: 80px auto;
    text-align: center;
}
.login-form {
    width: 40%;
    margin: 50px auto
}

input {
    display: block;
    background-color: black;
    color: white;
    border: none;
    border-bottom: 1px solid white;
    margin-bottom: 20px;
    width: 100%;

}
.form-link {
    color: white;
}
button {
     margin-top: 50px;
    width: 100%;
    margin-bottom: 20px;
}
</style>