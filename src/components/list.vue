<template>
  <div id="list">
    <button @click="logout">Выйти из учетной записи &#10008;</button>
    <input id="search" v-model="search"/>
    <listItem
      v-for="(item,index) in LISTS"
      v-show="(!search)||(!item.list.toLowerCase().indexOf(search.toLowerCase()))"
      :key="index"
      :name="item.list"
      :index="index" />
    <div
      v-if="!creating" 
      class="list-item"
      @click="creating=!creating"
    >Добавить список +
    </div>
    <div 
      v-else 
      class="list-item last"
    >Введите название дела:
    <textarea id="create-list" />
    <button @click="createNewList">Создать</button>
    <div v-show="warn" style="color:red">{{warn}}</div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import listItem from './list-item.vue'

export default {
  name: 'list',
  components: {
    listItem
  },
  data() {
    return {
      creating: false,
      warn: '',
      search: ''
    }
  },
  methods: {
    async createNewList() {
      let newList=document.getElementById('create-list').value;
      if(newList) {
        if(newList.length>40) {
          this.warn='Давай покороче)';
          return;
        }
        for(let i=0;i<this.LISTS.length;i++) {
          console.log(this.LISTS[i].list.toLowerCase(),newList.toLowerCase())
          if(this.LISTS[i].list.toLowerCase()===newList.toLowerCase()) {
            this.warn='Такой список уже есть :(';
            return;
          }
        }
        await this.$store.dispatch('addList',newList);
        this.creating=!this.creating;
        this.warn='';
        alert(`Добавили новый лист ${newList}`)
      }
    },
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/');
    }
  },
  computed: {
    ...mapGetters([
        'LISTS'
    ])
  }
}
</script>

<style>
#search,#create-list {
  width: 100%;
}

.last {
  display: block;
}

#list {
  max-width: 430px;
  width: 30%;
  padding: 1% 2%;
  min-height: 100%;
  margin:  5% auto;
}
@media (max-width: 500px) {
  #list {
    width: 90%;
  }
}
</style>