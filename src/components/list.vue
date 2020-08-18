<template>
  <div id="list">
    <modalWin
      v-show="modalWinIsVisable"
      @modalWinIsVisableF="modalWinIsVisableF"
      @click="modalWinIsVisable=!modalWinIsVisable">
      <center>Создан список {{LISTS.length!==0 ? LISTS[LISTS.length-1].list : ''}}</center>
    </modalWin>
    <div style="display:flex;" v-show="LISTS.length"><div class="sign" style="background-color:GreenYellow;"></div><span> Завершены все задачи</span></div>
    <div style="display:flex;" v-show="LISTS.length"><div class="sign" style="background-color:Gold;"></div><span> Некоторые задачи не завершены</span></div>
    <div style="display:flex;" v-show="LISTS.length"><div class="sign" style="background-color:white;"></div><span> Нет задач в данном списке</span></div>
    <button @click="logout">Выйти из учетной записи &#10008;</button>
    <input id="search" v-model="search"/>
    <listItem
      v-for="(item,index) in LISTS"
      v-show="(!search)||(!item.list.toLowerCase().indexOf(search.toLowerCase()))"
      :key="index"
      :name="item.list"
      :i="index" />
    <div
      v-if="!creating" 
      class="list-item-title"
      @click="creating=!creating"
    >Добавить список +
    </div>
    <div 
      v-else 
      class="list-item-title last"
    >Введите название листа:
    <textarea id="create-list" />
    <button @click="createNewList">Создать</button>
    <div v-show="warn" style="color:red">{{warn}}</div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import listItem from './list-item.vue'
import modalWin from './modalWindow'

export default {
  name: 'list',
  components: {
    listItem,
    modalWin
  },
  data() {
    return {
      creating: false,
      warn: '',
      search: '',
      modalWinIsVisable: false
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
          if(this.LISTS[i].list.toLowerCase()===newList.toLowerCase()) {
            this.warn='Такой список уже есть :(';
            return;
          }
        }
        await this.$store.dispatch('addList',newList);
        this.creating=!this.creating;
        this.warn='';
        this.modalWinIsVisable=true;
        setTimeout(() => {
          this.modalWinIsVisable=false;
        }, 1500)
      }
    },
    modalWinIsVisableF(data) {
      this.modalWinIsVisable=data;
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
.sign {
  width: 10px;
  height: 10px;
  border-radius: 5px;
  border: 1px solid black;
  margin-bottom: 2px;
}

#search,#create-list {
  width: 100%;
}

.last {
  display: block;
}

#list {
  max-width: 430px;
  width: 30%;
  min-height: 100%;
  margin:  5% auto;
}
@media (max-width: 500px) {
  #list {
    width: 90%;
  }
}
</style>