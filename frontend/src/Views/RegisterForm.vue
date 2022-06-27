<template>
<div class="login">
    <div>
    <h2>Регистрация</h2>
    <input type="email" placeholder="Email">
    <input type="password" placeholder="Пароль">
    <button type="button">Зарегистрироваться</button>
    <p>Уже зарегистрированы? <router-link>Войти</router-link></p>
    </div>
</div>
</template>
<script>
</script>
<style>
.login {
    color:white;
    margin:80px auto;
}
input {
    display: block;
}

</style>