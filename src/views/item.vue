<template>
<ul>
  <li>
    {{item.title}}
    <template v-for="i in item.children">
      <item :item="i"/>
    </template>
  </li>
</ul>
</template>
<script lang="ts" setup>
import { ref, reactive,defineProps} from 'vue';
const props=defineProps(['item'])

</script>
<style lang="less" scoped>

</style>