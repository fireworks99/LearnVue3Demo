<script setup>
import { ref, reactive } from 'vue'

const courses = ['语文', '数学', '英语', '物理', '化学', '生物']
const colors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', 'purple', 'pink']
const days = ['周一', '周二', '周三', '周四', '周五']

const source = ref(null);

//拖拽元素：开始拖拽
function handleDragStart(e) {
  source.value = e.target
  e.target.draggable && (e.target.style.opacity = '0.2')
}
//拖拽元素：结束拖拽
function handleDragEnd(e) {
  source.value = null
  e.target.draggable && (e.target.style.opacity = '1')
}

//放置元素：有东西进入
function handleDragEnter(e) {
  e.target.classList.add('hover-bg')
}
//放置元素：有东西离开
function handleDragLeave(e) {
  e.target.classList.remove('hover-bg')
}
//放置元素：有东西放下
function handleDrop(e) {
  e.target.classList.remove('hover-bg')

  if (e.target.dataset.drop === "copy") {
    arrange(e);
  }
  //这个if写在后面
  if (source.value.dataset.drag === "move" && (e.target.dataset.drop || e.target.parentElement.dataset.drop)) {
    source.value.remove();
  }
}

function arrange(e) {
  e.target.innerHTML = ""
  const cloned = source.value.cloneNode(true)
  cloned.dataset.drag = "move"
  cloned.style.opacity = "1"
  e.target.appendChild(cloned)
}
</script>

<template>
  <div class="drag_content">
    <div class="title">Hello, Drag!</div>
    <!-- 待完善的点：链接、图片、文字默认可拖动 -->

    <div class="main" @dragenter="handleDragEnter" @dragleave="handleDragLeave" @drop="handleDrop"
      @dragstart="handleDragStart" @dragend="handleDragEnd">

      <div class="left" data-drop="delete" @dragover="e => e.preventDefault()">
        <div class="course_wrapper" v-for="(c, index) in courses" key="c">
          <div class="course_detail" draggable="true" data-drag="copy" :data-bg="colors[index]"
            :style="{ backgroundColor: colors[index] }">{{ c }}</div>
        </div>
      </div>

      <div class="right">
        <div class="parent" @dragover="e => e.preventDefault()">
          <div class="title flex-center" v-for="day in days">
            <div class="title_detail">{{ day }}</div>
          </div>
          <div class="content" v-for="num in 20" data-drop="copy"></div>
        </div>
      </div>

    </div>


  </div>
</template>

<style lang="scss" scoped>
.drag_content {
  height: 100%;

  .title {
    text-align: center;
    height: 10rem;
    line-height: 10rem;
  }

  .main {
    width: 100vw;
    height: calc(100% - 10rem);
    display: flex;

    .left {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 5rem;

      .course_wrapper {
        flex: 1;

        .course_detail {
          height: 8rem;
          line-height: 8rem;
          text-align: center;
          border-radius: 1rem;
          color: #fff;
          font-weight: bold;
        }
      }
    }

    .left.hover-bg {
      background-color: #999999;
    }

    .left:has(.hover-bg) {
      background-color: #999999;
    }

    .right {
      flex: 6;
      padding: 5rem;

      .parent {
        height: 80%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(5, 1fr);
        grid-column-gap: 0.5rem;
        grid-row-gap: 0.5rem;

        .title,
        .content {
          height: 100%;
          border: 0.1rem solid #f1f1f1;

          .course_detail {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 1rem;
            color: #fff;
            font-weight: bold;
          }
        }


        .content.hover-bg {
          background-color: #999999;
        }
      }
    }
  }
}
</style>