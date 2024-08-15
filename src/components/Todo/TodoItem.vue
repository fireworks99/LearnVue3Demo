<script setup>
import { Delete } from '@element-plus/icons-vue';

const props = defineProps({
  data: Object
})

import { ref, watch } from 'vue'
const finish = ref(props.data.done)
const emit = defineEmits(['modifyTodos', 'removeTodo'])
watch(finish, newValue => {
  (!external.value) && 
  emit('modifyTodos', { id: props.data.id, done: finish })
})

function removeTodo() {
  emit('removeTodo', props.data.id)
}

const external = ref(false);
function externalModifyFinish(flag) {
  external.value = true;
  finish.value = flag;
  setTimeout(() => {
    external.value = false;
  })
}

defineExpose({
  externalModifyFinish
})


</script>

<template>
  <div class="todoitem_wrapper">
    <div class="todoitem_content">
      <input type="checkbox" v-model="finish">
      <div class="text flex-vertical">
        <span>{{ data.name }}</span>
      </div>
      <!-- <el-button type="danger" :icon="Delete" circle class="delete" @click="removeTodo"/> -->
      <el-button type="danger" :icon="Delete" circle class="delete" 
        @click="$emit('removeTodo', data.id)"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.todoitem_wrapper {
  width: 100%;
  border: 0.1rem solid #dcdfe6;
  padding: 0.5rem 0.2rem;

  .todoitem_content {
    display: flex;

    input {
      flex: 1;
      margin-right: 0.4rem;
    }

    .text {
      flex: 11;
    }

    .delete {
      visibility: hidden;
    }
  }

  .todoitem_content:hover .delete {
    visibility: visible;
  }
}
</style>