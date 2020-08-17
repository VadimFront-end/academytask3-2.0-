import Vue from 'vue'
import App from './App.vue'
import './assets/styles/styles.scss'
import store from './vuex/store'
import firebase from 'firebase'
import router from './router/router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
  created() {
    var firebaseConfig = {
      apiKey: 'AIzaSyCJ85YP3ZmgZLLbcXw5Hgg9tgWnKQTGnSM',
      authDomain: 'academytask3-a6e9d.firebaseapp.com',
      databaseURL: 'https://academytask3-a6e9d.firebaseio.com',
      projectId: 'academytask3-a6e9d',
      storageBucket: 'academytask3-a6e9d.appspot.com',
      messagingSenderId: '120425888300',
      appId: '1:120425888300:web:e5cdc853d6d392a5572f89'
    };
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(async (user) => {
      console.log(user) 
      if(user) {
        await this.$store.dispatch('loggedUser');
        this.$router.push('/list');
      }
    })
  }
}).$mount('#app')
