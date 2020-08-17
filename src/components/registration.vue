<template>
    <div v-if="changeForm" class="form">
        <h2 style="text-align:center;">Регистрация</h2>
      <input class="input" type="email" placeholder="введите вашу почту">
      <input class="input" type="password" placeholder="введите пароль">
      <input class="input" type="password" placeholder="повторите пароль">
      <button  @click="registation" class="butt-registr">Зарегистрироваться</button>
      <div v-show="warn" style="color:red;font-size:0.7rem">{{warn}}</div>
      <div style="font-size:1rem">Уже зарегистрированы?</div>
      <button @click="changeForm=!changeForm" class="butt-registr">Войти</button>
    </div>
    <div v-else class="form">
        <h2 style="text-align:center;">Войти</h2>
      <input class="input" type="email" placeholder="введите вашу почту">
      <input class="input" type="password" placeholder="введите пароль">
      <button @click="singin" class="butt-registr">Войти</button>
      <div v-show="warn" style="color:red;font-size:0.7rem">{{warn}}</div>
      <div style="font-size:1rem">Нет учетной записи?</div>
      <button  @click="changeForm=!changeForm" class="butt-registr">Зарегистрироваться</button>
    </div>
</template>

<script>

export default {
  name: 'registration',
  data() {
    return {
        changeForm: true,
        warn: ''
    }
  },
  methods: {
    async registation() {
      const user= {
        email: '',
        password: ''
      }
      user.email=document.getElementsByClassName('input')[0].value;
      user.password=document.getElementsByClassName('input')[1].value;
      if(user.password.length<6) {
        this.warn='Нужно минимум 6 символов в пароле!';
        setTimeout(() => {
            this.warn=''
          },3000)
        return;
      }
      if(user.password===document.getElementsByClassName('input')[2].value) {
        try {
          await this.$store.dispatch('registerUser', user);
        }
        catch {
          this.warn='Нелья использовать такой email!'
          setTimeout(() => {
            this.warn=''
          },3000)
        }
      }
      else {
        this.warn='Пароли не совпадают!';
        setTimeout(() => {
            this.warn=''
          },3000)
      }
    },
    async singin() {
      const user= {
        email: '',
        password: ''
      }
      user.email=document.getElementsByClassName('input')[0].value;
      user.password=document.getElementsByClassName('input')[1].value;
      try {
        await this.$store.dispatch('login', user);
      }
      catch {
        this.warn='Неверный логин или пароль!'
        setTimeout(() => {
            this.warn=''
          },3000)
      }
    }
  }
}
</script>

<style>
.form {
  border: 1px solid black;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  margin: auto;
  padding: 2%;
  border-radius: 20px;
  margin: auto;
}
@media (max-width: 500px) {
    .form {
        border: none;
        box-shadow: none;
    }
}
.input {
  display: block;
  margin-top: 5%;
}
.bttns {
    display: flex;
    justify-content: space-between;
}
.butt-registr {
  padding: 2%;
  margin-top: 5%;
}
</style>