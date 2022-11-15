<template>
<ul>
  <li v-for="i in routeTree">
    {{i.title}}
    <template v-for="k in i.children">
    <item :item="k"/>
    </template>
  </li>
</ul>
</template>
<script lang="ts" setup>
import { ref, reactive} from 'vue';
import item from './item.vue'
import { useStore } from 'vuex';
const store=useStore()
const routeTree=store.state.routeList

</script>
<style lang="less" scoped>

</style>