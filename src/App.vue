<template>
  <div class="container">
    <router-view v-if="!$route.meta.keepAlive" class="router" />
    <router-view
      v-if="$route.meta.keepAlive"
      v-slot="{ Component }"
      class="router"
    >
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script setup></script>
<style lang="scss">
 .container{
  width:100%;
  height:100%;
 }
</style>
