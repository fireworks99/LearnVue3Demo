<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { ref, reactive, computed } from 'vue'
import TodoItem from './TodoItem.vue'

const todoName = ref('')
const todos = reactive([
  { id: 1, name: 'Angular', done: false },
  { id: 2, name: 'React', done: true },
  { id: 3, name: 'Vue', done: false },
])

// 剩余待办数目
const remain = computed(() => {
  return todos.filter(item => !item.done).length;
})

// 修改某一待办状态（已完成/未完成）
function modifyTodos(todo) {
  const index = todos.findIndex(item => item.id === todo.id);
  if(index !== -1) {
    const obj = todos[index];
    todo.name && (obj.name = todo.name);
    todo.done && (obj.done = todo.done);
  }
}

// 添加待办
let num = 4;
function addTodo() {
  todos.push({ id: num++, name: todoName.value, done: false });
  todoName.value = '';
}

// 移除待办
function removeTodo(id) {
  const index = todos.findIndex(item => item.id === id);
  (index !== -1) && (todos.splice(index, 1));
}

// 过滤待办
const filterText = ref(1);
const filteredTodos = computed(() => {
  return filterText.value === 1 ? todos : todos.filter(item => item.done === filterText.value);
})
function ModifyFilteredTodos(e) {
  const text = e.target.innerText;
  if(text === "All") {
    e.target.classList.add("active");
    e.target.nextElementSibling.classList.remove("active");
    e.target.nextElementSibling.nextElementSibling.classList.remove("active");
    filterText.value = 1;
  } else if(text === "Active") {
    e.target.classList.add("active");
    e.target.previousElementSibling.classList.remove("active");
    e.target.nextElementSibling.classList.remove("active");
    filterText.value = false;
  } else if(text === "Completed") {
    e.target.classList.add("active");
    e.target.previousElementSibling.classList.remove("active");
    e.target.previousElementSibling.previousElementSibling.classList.remove("active");
    filterText.value = true;
  }
}

// 移除已完成的待办
function clearCompleted() {
  todos.splice(0, todos.length, ...todos.filter(item => !item.done))
}

const todoRefs = ref([]);
function setTodoRefs(el, index) {
  if(el) {
    todoRefs.value[index] = el;
  }
}

// 全选与取消全选
function selectOrCancel() {
  const remain = todos.filter(item => !item.done).length;
  todos.forEach(item => item.done = !!remain);
  todoRefs.value.forEach(item => item.externalModifyFinish(!!remain));
}


</script>

<template>
  <div class="todo_content">
    <div class="title">Hello, Todo!</div>
    <div class="other">

      <el-input v-model="todoName" @keyup.enter="addTodo">
        <template #prefix>
          <el-icon @click="selectOrCancel"><ArrowDown/></el-icon>
        </template>
      </el-input>

      <!-- <div v-for="item in todos" :key="item.id"> -->
      <div v-for="(item, index) in filteredTodos" :key="item.id">
        <TodoItem :ref="el => setTodoRefs(el, index)" :data="item" @modifyTodos="modifyTodos" @removeTodo="removeTodo"/>
      </div>
      
      <div class="total">
        <div class="remain">{{ remain }} items left</div>
        <div class="choice" @click="ModifyFilteredTodos">
          <span class="active">All</span>
          <span>Active</span>
          <span>Completed</span>
        </div>
        <div class="clearAll" @click="clearCompleted">Clear completed</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.todo_content {
  text-align: center;
  min-width: 40rem;

  .other {
    .total {
      display: flex;
      border: 0.1rem solid #dcdfe6;
      padding: 0.5rem;

      .choice {
        flex: 1;
        
        span {
          margin: 0.5rem;
          cursor: pointer;
        }
        span.active {
          border: 0.2rem solid #dcdfe6;
        }
      }
      .clearAll {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}

@media (max-width: 639px) {
  // .todo_content {
  //   width: 100vw;
  //   min-width: 10rem;
  // }
}
</style>