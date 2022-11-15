<template>
<input type="text" v-model="uid"/>
<input type="submit" @click="submit">
</template>
<script lang="ts" setup>
import { ref, reactive} from 'vue';
import { useRouter } from 'vue-router';
import {  useStore } from 'vuex';
import { SET_AUTH, SET_ROUTER_LIST, SET_UID } from '../store/types/action_types';
const uid=ref()
const store=useStore()
const router=useRouter()
const submit=async()=>{
  store.commit(SET_UID,uid.value)
  store.commit(SET_AUTH,false)
  router.push('/my')
}
</script>
<style lang="less" scoped>

</style>