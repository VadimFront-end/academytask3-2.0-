<template>
  <div id="list">
    <modalWin
      v-show="isVisibleModalWindow"
      @modalWinIsVisibleF="modalWinIsVisibleF"
      @click="isVisibleModalWindow=!isVisibleModalWindow">
      Создан список {{LISTS.length!==0 ? LISTS[LISTS.length-1].list : ''}}
    </modalWin>
    <input
        class="search"
        v-model.trim="search"
        style="display: block"
        placeholder="Найти список"/>
    <listItem
      v-for="(item,index) in searchCollection"
      :key="index"
      :style="{borderRadius: index===0 ? '14px 14px 0 0' : ''}"
      :name="item.list"
      :indexList="index"/>
    <div
      v-if="!creating" 
      class="list-item addList"
      :style="{borderRadius: LISTS.length ? '0 0 14px 14px': '14px'}"
      @click="creating=!creating"
    >Добавить список +
    </div>
    <div 
      v-else 
      class="list-item-add-list"
      :style="{borderRadius: LISTS.length ? '0 0 14px 14px': '14px'}"
      style="height: 100px"
    ><div>Введите название листа:</div>
      <div>
        <textarea v-model.trim="creatList" style="resize: none" rows="3" cols="30"/>
        <button @click="createNewList">Создать</button>
      </div>
      <div class="error" :style="{visibility: warn ? 'visible': ''}">
        <div v-if="!$v.creatList.required">Введите название</div>
        <div v-else-if="!$v.creatList.maxLength">Давай покороче)</div>
        <div v-else-if="!$v.creatList.isExists">Такой список уже есть :(</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import listItem from './list-item.vue'
import modalWin from './modalWindow'
import {maxLength, required} from "vuelidate/lib/validators";

export default {
  name: 'list',
  components: {
    listItem,
    modalWin
  },
  data() {
    return {
      creating: false,
      warn: false,
      search: '',
      searchCollection: [],
      isVisibleModalWindow: false,
      creatList: ''
    }
  },
  validations: {
    creatList: {
      required,
      maxLength: maxLength(40),
      isExists(creatList) {
        for(let i=0;i<this.LISTS.length;i++) {
          if(this.LISTS[i].list.toLowerCase()===creatList.toLowerCase()) return false;
        }
        return true;
      }
    }
  },
  methods: {
    async createNewList() {
      if(!this.$v.creatList.$invalid) {
        await this.$store.dispatch('addList',this.creatList);
        this.creating=!this.creating;
        this.warn='';
        this.isVisibleModalWindow=true;
        setTimeout(() => {
          this.isVisibleModalWindow=false;
        }, 1500)
        this.creatList='';
      }
      else this.warn=true;
    },
    modalWinIsVisibleF() {
      this.isVisibleModalWindow=false;
    }
  },
  computed: {
    ...mapGetters([
        'LISTS'
    ])
  },
  mounted() {
    this.searchCollection=this.LISTS;
  },
  watch: {
    LISTS() {
      if(!this.search)
        this.searchCollection=this.LISTS;
      else {
        this.searchCollection=this.LISTS.filter((val) => {
          return (!this.search)||(val.list.toLowerCase().indexOf(this.search.toLowerCase())!==-1);
        });
      }
    },
    search() {
      this.searchCollection=this.LISTS.filter((val) => {
        return (!this.search)||(val.list.toLowerCase().indexOf(this.search.toLowerCase())!==-1);
      });
    }
  }
}
</script>

<style>
.addList {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
.list-item-add-list {
  padding: 5px;
  height: 60px;
  background-color: white;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(2, 57, 164, 0.05);
  word-break: break-all;
  margin-bottom: 2px;
  width: 310px;
}
.search {
  padding: 4px 7px;
  border-radius: 15px;
  margin: 0 auto 15px;
  box-shadow: 0 0 15px rgba(2, 57, 164, 0.05);
}
</style>