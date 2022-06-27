<template>
 <header className="header">
        <div className="header__logo"></div>
        <Switch>
        <Route exact path="/">
          <div className="header__container">
            <p className="header__userEmail">{{userEmail}}</p>
            <router-link
              className="header__link"
              to="/login"
            >
              Выйти
            </router-link>
          </div>
        </Route>
        <Route path="/signup">
          <Link className="header__link" to="/sign-in">
            Войти
          </Link>
        </Route>
        <Route path="/signin">
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        </Route>
      </Switch>
    </header>

<router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: function() {
    return {
userEmail: 'test',
    }
  }
}
</script>

<style>
@import '../public/pages/index.css';
</style>
