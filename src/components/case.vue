<template>
  <div class="case">
    <div class="main-case">
      <div
        v-if="!caseItem.complate" 
        @click="isComplate"
        >&#10065;
      </div>
      <div
        v-else 
        @click="isComplate"
        >&#10004;
      </div>  
      <div class="case-title">{{caseItem.name}}</div>
    </div>
    <div class="date-case">
      <div class="date">{{caseItem.date}}</div>
      <div class="important" v-show="caseItem.important">!</div>
    </div>
    <div 
      class="cancle"
      @click="deleteDo(index)"
      >&#10008;
    </div>
  </div>
</template>

<script>

export default {
  name: 'case',
  props: {
    caseItem: {
      type: Object,
      default() {
          return {}
      }
    },
    index: {
      type: Number,
      default() {
          return 0
      }
    }
  },
  methods: {
    isComplate() {
      this.caseItem.complate=!this.caseItem.complate;
      const a={
        index: this.index,
        complate: this.caseItem.complate
      }
      this.$store.dispatch('isComplate',a)
    },
    async deleteDo(index) {
      if(confirm(`Точно удалить дело ${this.caseItem.name}?`))
        await this.$store.dispatch('deleteDo',index);
    }
  }
}
</script>

<style>
.date-case {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 30%;
}

.case-title {
  word-break: break-all;
  margin-left: 2%;
}

.case {
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 2%;
  padding: 2%;
  border: 2px solid DarkGrey;
  border-radius: 20px 0 0 20px;
}

.date {
  margin-right: 3%;
}

.main-case {
  width: 70%;
  display: flex;
}

.important {
  margin-right: 3%;
  font-size: 2rem;
  font-weight: bold;
}
</style>