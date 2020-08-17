<template>
  <div 
    id="cases-list">
    <router-link :to="'/list'">
      <h3 style="text-align:right">Вернуться к спискам дел &#8617;</h3>
    </router-link>
    <h2 style="text-align:center">{{LISTS[this.$store.state.openedList].list}}</h2>
    <caseItem 
      v-for="(caseItem,index) in CASES"
      :key="index"
      :caseItem="caseItem"
      :index="index" />
    <div
      v-if="!creating" 
      class="case"
      @click="creating=!creating"
    >Добавить дело
    </div>
    <div 
      v-else 
      class="list-item last">
    <div>Введите название дела:</div>
    <textarea id="create-do" />
    <div class="imprtnt">
      <div class="question">Пометить как важное?</div>
      <input type="checkbox" id="checkImportant" @click="important=!important" />
    </div>
    <button @click="createNewDo" style="padding:1%">Создать</button>
    <div v-show="warn" style="color:red">{{warn}}</div>
    </div>
  </div>
</template>

<script>
import caseItem from './case.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'cases-list',
  components: {
    caseItem
  },
  data() {
    return {
      creating: false,
      important: false,
      warn: ''
    }
  },
  methods: {
    async createNewDo() {
      let newDo=document.getElementById('create-do').value;
      if(newDo) {
        if(newDo.length>70) {
          this.warn='Давай покороче)';
          return;
        }
        if(this.CASES) {
          for(let i=0;i<this.CASES.length;i++) {
            if(this.CASES[i].name.toLowerCase()===newDo.toLowerCase()) {
              this.warn='Такое дело уже есть :(';
              return;
            }
          }
        } 
      let now=new Date();
      let tmp= {
        name: '',
        date: now.getHours() + ':' + now.getMinutes() + ' ' + now.getDate() + '.' + (now.getMonth() + 1) + '.' + now.getFullYear() + ' г.',
        important: false,
        complate: false
      };
      tmp.important=this.important;
      tmp.name=newDo;
      this.$store.dispatch('addDo',tmp);
      this.creating=!this.creating;
      this.important=false;
      this.warn='';
      alert(`Добавили дело ${newDo} в список ${this.LISTS[this.$store.state.openedList].list}`)
      }
    }
  },
  computed: {
    ...mapGetters([
        'CASES',
        'LISTS'
    ])
  }
}
</script>

<style>
#cases-list {
  max-width: 1500px;
  padding: 2%;
  width: 100%;
}

#checkImportant {
  margin-left: 10px;
}

.imprtnt {
  display: flex;
  align-items: baseline;
}
</style>