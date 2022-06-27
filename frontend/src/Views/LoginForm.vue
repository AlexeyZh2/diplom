<template>
    <div class="login">
        <div class="login-form">
            <h2>Войти</h2>
            <input type="email"
                autocomplete="email"
                placeholder="Email"
                v-model="email">
                <p>{{email}}</p>
            <input type="password"
                autocomplete="current-password"
                placeholder="Пароль"
                v-model="password">
                 <p>{{password}}</p>
            <button type="button"
                v-on:click="login">Войти</button>
        </div>
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
        login: function () {
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
                body: JSON.stringify(user)
            })
                .then((res) => {
                     if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}).then((data)=>console.log(data))

        }

    }
}



</script>
<style>
.login {
    color: white;
    width: 50%;
    margin: 50px auto;

}

input {
    display: block;
}

.login-form {
    margin: 80px auto;
}
</style>