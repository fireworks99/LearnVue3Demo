<script setup>

const props = defineProps({
  data: Object,
  filterText: String,
  // sortObj: Object
})

import { computed } from 'vue'
const filteredData = computed(() => {
  const res = props.data.detail.filter(item => item.Name.includes(props.filterText) || item.Power.includes(props.filterText))
  // const { which, ord } = props.sortObj
  const { which, ord } = sortSet
  return res.sort((a, b) => ord === 'asc' ? a[which].localeCompare(b[which]) : b[which].localeCompare(a[which]))
})

// const emit = defineEmits(['modifySortObj'])
// function sortBy(title) {
//   emit('modifySortObj', {which: title, ord: props.sortObj.options[title] === 'asc' ? 'dsc' : 'asc'})
// }

import { reactive } from 'vue'
const sortSet = reactive({
  which: '',
  ord: 'asc',
  options: {}
})
props.data.title.forEach((item, index) => {
  if(index === 0) {
    sortSet.which = item
  }
  sortSet.options[item] = 'asc'
})
function sortBy(title) {
  sortSet.which = title
  sortSet.ord = sortSet.options[title] === 'asc' ? 'dsc' : 'asc'
  sortSet.options[title] = sortSet.ord;
}

</script>

<template>
  <table v-if="filteredData.length">
    <thead>
      <tr>
        <!-- <th v-for="title in data.title" @click="sortBy(title)" :class="{ active: title === sortObj.which }"> -->
        <th v-for="title in data.title" @click="sortBy(title)" :class="{ active: title === sortSet.which }">
          {{ title }}
          <!-- <span class="arrow" :class="sortObj.options[title]"> -->
          <span class="arrow" :class="sortSet.options[title]">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in filteredData">
        <td>{{ item.Name }}</td>
        <td>{{ item.Power }}</td>
      </tr>
    </tbody>
  </table>
  <div v-else> No Data </div>
</template>


<style lang="scss" scoped>
table {
  margin: auto;
  border: 2px solid #42b983;
  border-radius: 0.24rem;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 7.5rem;
  padding: 0.625rem 1.25rem;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 0.25rem;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>