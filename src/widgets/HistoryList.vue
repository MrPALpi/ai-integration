<script setup>
import { HistoryItem } from '@/entities/history'

const props = defineProps({
  historyList : {type: Array, default:[]}
})
</script>

<template>
  <transition-group name="list">
    <history-item v-for="item in historyList" :key="item" :history="item"/>
  </transition-group>
</template>

<style lang="scss" scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>