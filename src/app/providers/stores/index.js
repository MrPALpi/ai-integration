import { shallowRef } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const token = shallowRef('');

  return { token }
})
