<script setup>
import { ref, reactive, computed } from 'vue'

const filterText = ref('');
const names = reactive([
  { first: 'Emil', last: 'Hans' },
  { first: 'Mustermann', last: 'Max' },
  { first: 'Tisch', last: 'Roman' },
]);
const filteredNames = computed(() => {
  return names.filter(item => (item.first + item.last).toLocaleLowerCase().includes(filterText.value.toLocaleLowerCase()));
});

const singleTableRef = ref(null);
const selectIndex = ref(-1);

const firstName = ref('');
const lastName = ref('');

function handleCurrentChange(val) {
  if (val) {
    selectIndex.value = names.findIndex(item => item === val);
    firstName.value = val.first;
    lastName.value = val.last;
  }
}

function createName() {
  if (firstName.value && lastName.value) {
    names.push({ first: firstName.value, last: lastName.value });
  }
}

function updateName() {
  if (selectIndex.value !== -1 && firstName.value && lastName.value) {
    names[selectIndex.value].first = firstName.value;
    names[selectIndex.value].last = lastName.value;
    // if (selectIndex.value !== -1 && firstName.value && lastName.value) {
    //   names.splice(selectIndex.value, 1, { first: firstName.value, last: lastName.value });
    // }
  }
}

function deleteName() {
  if (selectIndex.value !== -1) {
    names.splice(selectIndex, 1);
  }
}

function doSth() {
  names.splice(2, 1, { first: firstName.value, last: lastName.value });
}

</script>


<template>
  <div class="curd_content">
    <div class="title">Hello, CURD!</div>

    <el-input v-model="filterText" />

    <el-table ref="singleTableRef" :data="filteredNames" highlight-current-row @current-change="handleCurrentChange">
      <el-table-column type="index" label="NO." width="50" />
      <el-table-column property="first" label="First Name" />
      <el-table-column property="last" label="Last Name" />
    </el-table>

    <el-input v-model="firstName" placeholder="First Name" />

    <el-input v-model="lastName" placeholder="Last Name" />

    <div class="button_group">
      <el-button type="primary" round @click="createName">Create</el-button>
      <el-button type="success" round @click="updateName">Update</el-button>
      <el-button type="danger" round @click="deleteName">Delete</el-button>
      <el-button type="warning" round @click="doSth">doSth</el-button>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.curd_content {
  text-align: center;

  .button_group {
    margin: 1rem;
  }
}
</style>