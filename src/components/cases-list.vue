<template>
  <div id="cases-list">
    <modalWin
        v-show="modalWinIsVisable"
        @modalWinIsVisableF="modalWinIsVisableF"
        @click="modalWinIsVisable=!modalWinIsVisable">
      Создано дело {{ CASES.length !== 0 ? CASES[LISTS[$store.state.openedList].tasks.length - 1].name : '' }} в списке
      {{ LISTS[$store.state.openedList].list }}
    </modalWin>
    <router-link :to="'/list'">
      <h3 style="text-align:right;margin-bottom: 20px">Вернуться к спискам дел &#8617;</h3>
    </router-link>
    <h2 style="text-align:center">{{ LISTS[this.$store.state.openedList].list }}</h2>
    <input
        class="search"
        v-model.trim="search"
        style="display: block"
        placeholder="Найти задачу"/>
    <caseItem
        @edittingStatus="edittingStatus"
        :indexFocus="indexFocus"
        :style="{borderRadius: index===0 ? '14px 14px 0 0' : ''}"
        v-for="(caseItem,index) in CASES"
        v-show="(!search)||(caseItem.name.toLowerCase().indexOf(search.toLowerCase())!==-1)"
        :key="index"
        :caseItem="caseItem"
        :index="index"/>
    <div
        v-if="!creating"
        class="list-item"
        :style="{borderRadius: !CASES.length ? '14px': '0 0 14px 14px'}"
        @click="creating=!creating"
    >Добавить дело
    </div>
    <div
        v-else
        class="list-item-add-list"
        style="height: 150px"
        :style="{borderRadius: !CASES.length ? '14px': '0 0 14px 14px'}">
      <div>Введите название дела:</div>
      <textarea v-model.trim="creatDo" style="resize: none" rows="3" cols="30"/>
      <div class="imprtnt">
        <div class="question">Пометить как важное?</div>
        <input type="checkbox" id="checkImportant" @click="important=!important"/>
      </div>
      <button @click="createNewDo" style="padding:1%">Создать</button>
      <div class="error" :style="{visibility: warn ? 'visible': ''}">
        <div v-if="!$v.creatDo.required">Введите название</div>
        <div v-else-if="!$v.creatDo.maxLength">Давай покороче)</div>
        <div v-else-if="!$v.creatDo.isExists">Такая задача уже есть :(</div>
      </div>
    </div>
  </div>
</template>

<script>
import caseItem from './case.vue'
import {mapGetters} from 'vuex'
import modalWin from './modalWindow'
import {maxLength, required} from "vuelidate/lib/validators";

export default {
  name: 'cases-list',
  components: {
    caseItem,
    modalWin
  },
  data() {
    return {
      creating: false,
      important: false,
      warn: false,
      modalWinIsVisable: false,
      search: '',
      creatDo: '',
      indexFocus: NaN
    }
  },
  validations: {
    creatDo: {
      required,
      maxLength: maxLength(50),
      isExists(creatDo) {
        for (let i = 0; i < this.CASES.length; i++) {
          if (this.CASES[i].name.toLowerCase() === creatDo.toLowerCase()) return false;
        }
        return true;
      }
    },
  },
  methods: {
    createNewDo() {
      if(!this.$v.creatDo.$invalid) {
        let now = new Date();
        let tmp = {
          name: this.creatDo,
          date: now.getHours() + ':' + now.getMinutes() + ' ' + now.getDate() + '.' + (now.getMonth() + 1),
          important: this.important,
          complete: false
        };
        this.$store.dispatch('addDo', tmp);
        this.creating = !this.creating;
        this.important = false;
        this.warn = false;
        this.modalWinIsVisable = true;
        setTimeout(() => {
          this.modalWinIsVisable = false;
        }, 1500)
        this.creatDo = '';
      }
      else this.warn=true;
    },
    modalWinIsVisableF(data) {
      this.modalWinIsVisable = data;
    },
    edittingStatus(data) {
      this.indexFocus !== data ? this.indexFocus = data : this.indexFocus = NaN;
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

#checkImportant {
  margin-left: 10px;
}

.imprtnt {
  display: flex;
  align-items: baseline;
}
</style>