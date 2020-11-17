<template>
    <div v-if="isRegistration" class="content-form">
      <h2 style="text-align: center;margin-bottom: 30px">Регистрация</h2>
      <emailInput @pushEmail="getEmail" :error="error&&($v.email.$invalid||!!serverError)"/>
      <div class="error" :style="{visibility: error&&(!$v.email.required||!$v.email.email||!$v.email.maxLength||serverError) ? 'visible': ''}">
        <div v-if="serverError">{{serverError}}</div>
        <div v-else-if="!$v.email.required">Поле не заполено</div>
        <div v-else-if="!$v.email.email">Не является почтой</div>
        <div v-else-if="!$v.email.maxLength">Максимум 129 символов</div>
        <div v-else style="color: white">kostil</div>
      </div>
      <inputPassword @pushPassword="getPassword" :error="error&&$v.password.$invalid"/>
      <div class="error" :style="{visibility: error&&(!$v.password.minLength||!$v.password.maxLength||!$v.password.passwordSigns) ? 'visible': ''}">
        <div v-if="!$v.password.passwordSigns">Требования: должны быть 0-9 и a-z</div>
        <div v-else-if="!$v.password.minLength">Минимум 8 символов</div>
        <div v-else-if="!$v.password.maxLength">Максимум 24 символов</div>
        <div v-else style="color: white">kostil</div>
      </div>
      <inputPassword
          @pushPassword="getConfirmPassword"
          :confirm="true"
          :placeHolder="'Подтвердите пароль'"
          :error="error&&$v.confirmPassword.$invalid"/>
      <div class="error" :style="{visibility: error&&$v.confirmPassword.$invalid ? 'visible': ''}">
        <div v-if="$v.confirmPassword.$invalid">Пароли не совпадают</div>
        <div v-else style="color: white">kostil</div>
      </div>
      <button class="access-button" @click="signUp">Зарегистрироваться</button>
      <div class="links" @click="isRegistration=false">Уже зарегистрированы? Войти</div>
    </div>
    <div v-else class="content-form">
      <h2 style="text-align: center;margin-bottom: 30px">Авторизация</h2>
      <emailInput @pushEmail="getEmail" :error="error&&($v.email.$invalid||!!serverError)"/>
      <div class="error" :style="{visibility: error&&(!$v.email.required||!$v.email.email||!$v.email.maxLength||serverError) ? 'visible': ''}">
        <div v-if="serverError">{{serverError}}</div>
        <div v-else-if="!$v.email.required">Поле не заполено</div>
        <div v-else-if="!$v.email.email">Не является почтой</div>
        <div v-else-if="!$v.email.maxLength">Максимум 129 символов</div>
        <div v-else style="color: white">kostil</div>
      </div>
      <inputPassword @pushPassword="getPassword" :error="error&&$v.password.$invalid"/>
      <div class="error" :style="{visibility: error&&(!$v.password.minLength||!$v.password.maxLength||!$v.password.passwordSigns) ? 'visible': ''}">
        <div v-if="!$v.password.passwordSigns">Требования: должны быть 0-9 и a-z</div>
        <div v-else-if="!$v.password.minLength">Минимум 8 символов</div>
        <div v-else-if="!$v.password.maxLength">Максимум 24 символов</div>
        <div v-else style="color: white">kostil</div>
      </div>
      <button class="access-button" @click="signIn">Войти</button>
      <div class="links" @click="isRegistration=true">Нет аккаунта? Зарегистрироваться</div>
    </div>
</template>

<script>
import emailInput from './email-input'
import InputPassword from './input-password'
import {email, maxLength, minLength, required, sameAs} from 'vuelidate/lib/validators'

export default {
  name: 'registration',
  components: {
    InputPassword,
    emailInput
  },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      error: false,
      serverError: '',
      isRegistration: true
    }
  },
  validations: {
    email: {
      email,
      required,
      maxLength: maxLength(129)
    },
    password: {
      required,
      maxLength: maxLength(24),
      minLength: minLength(8),
      passwordSigns(password) {
        return (/[?0-9]/.test(password) && /[?a-z]/.test(password))
      }
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    getEmail(data) {
      this.email=data;
    },
    getPassword(data){
      this.password=data;
    },
    getConfirmPassword(data) {
      this.confirmPassword=data;
    },
    async signUp() {
      if(this.$v.email.$invalid||this.$v.password.$invalid||this.$v.confirmPassword.$invalid) {
        this.error=true;
      }
      else {
        this.serverError='';
        let userData = {
          email: this.email,
          password: this.password
        }
        try {
          await this.$store.dispatch('registerUser', userData);
        }
        catch {
          this.error=true;
          this.serverError='Такой E-mail уже занят';
        }
      }
    },
    async signIn() {
      if(this.$v.email.$invalid||this.$v.password.$invalid) {
        this.error=true;
      }
      else {
        this.serverError='';
        const user = {
          email: this.email,
          password: this.password
        }
        try {
          await this.$store.dispatch('login', user);
        }
        catch {
          this.error=true;
          this.serverError='Нет акка с таким E-mail';
        }
      }
    }
  },
  watch: {
    isRegistration() {
      this.error=false;
      this.serverError='';
    }
  }
}
</script>

<style>
.content-form {
  margin: 70px 0 20px;
  background: #FFFFFF;
  box-shadow: 0 4px 25px rgba(2, 57, 164, 0.1);
  border-radius: 14px;
  padding: 40px 30px;
  width: 310px;
}
.links {
  text-align: center;
  font-size:0.8rem;
  color: #0239A4;
  cursor: pointer;
  margin-top: 50px;
}
.links:hover {
  color: #0356F6;
}
.access-button {
  cursor: pointer;
  color: #FCFCFD;
  background: #4F8AFD;
  border-radius: 22px;
  margin: 15px auto;
  font-weight: 600;
  display: block;
  padding: 8px 0;
  text-align: center;
  border: none;
  width: 70%;
}
.access-button:hover {
  box-shadow: 0 0 10px rgba(2, 57, 164, 0.3);
}
.access-button:active {
  background: #0356F6;
  box-shadow: 0 0 15px rgba(2, 57, 164, 0.25);
}
</style>