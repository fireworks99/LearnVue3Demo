<script setup>
import Grid from './Grid.vue'
import { ref, reactive } from 'vue'

const data = reactive({
  title: [ 'Name', 'Power' ],
  detail: [
    { Name: 'Sunny', Power: '3' },
    { Name: 'Jessica', Power: '7'},
    { Name: 'Tiffany', Power: '5' },
    { Name: 'Tina', Power: '6' },
  ]
})

const filterText = ref("");

// const sortObj = reactive({
//   which: 'Name',
//   ord: 'asc',
//   options: {
//     Name: 'asc',
//     Power: 'asc'
//   }
// })

// function mSortObj(obj) {
//   sortObj.which = obj.which;
//   sortObj.ord = obj.ord;
//   sortObj.options[obj.which] = obj.ord;
// }

</script>

<template>
  <div class="content">
    <div class="title">Hello, Grid!</div>
    <div class="main">
      <input type="text" v-model="filterText">
      <!-- <Grid :data="data" :filterText="filterText" :sortObj="sortObj" @modifySortObj="mSortObj"/> -->
      <Grid :data="data" :filterText="filterText"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  text-align: center;

  input {
    margin: 1rem;
  }
}
</style>