<template>
    <div class="login">
        <form class="login-form">
            <h2>Войти</h2>
            <input  type="email"
                autocomplete="email"
                placeholder="Email"
                v-model="email">
            <input type="password"
                autocomplete="current-password"
                placeholder="Пароль"
                v-model="password">
            <button 
                v-on:click.prevent="authorization" type="submit">Войти</button><router-link class="form-link" to="/signup">Зарегистрироваться</router-link>
        </form>
        
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            email: "",
            password: "",
        }
    },
    methods: {
        authorization: function () {
            let user = {
                email: this.email,
                password: this.password,
            }
            return fetch('http://localhost:3000/api/signin', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: user.password,
                    email: user.email,
                }),
            })
                .then((res) => {
                    if (!res.ok) {
                        return Promise.reject(`Ошибка: ${res.status}`);
                    }
                     return res.json();
})
                .then((data) => {
                    if (data.token) {
                        localStorage.setItem('jwt', data.token);
                        this.$router.push('/')
                    }
                })
        }, 
}
    }
</script>

<style scoped>
.login {
    color: white;
    margin: 80px auto;
    text-align: center;
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

.login-form {
    width: 40%;
    margin: 50px auto
}
.form-link {
    color: white
}
button {
    margin-top: 50px;
    width: 100%;
    margin-bottom: 20px;
}
</style>