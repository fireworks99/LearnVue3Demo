<script setup>

</script>

<template>
  <div class="app_wrapper">
    <div class="app_header flex-center">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/grid">Grid</RouterLink>
      <RouterLink to="/todo">Todo</RouterLink>
      <RouterLink to="/curd">CURD</RouterLink>
      <RouterLink to="/drag">Drag</RouterLink>
    </div>
    <div class="app_main flex-center">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app_wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .app_header {
    height: 10rem;

    a {
      text-decoration: none;
      padding: 0.5rem;
      margin: 1rem;
      border: 0.1rem solid;
      border-radius: 1rem;
    }
  }

  .app_main {
    flex: 1;
  }
}
</style>
