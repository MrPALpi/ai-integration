import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

class User {
  constructor(id = null, name = null, token = null) {
    this.id = id;
    this.name = name;
    this.token = token;
  }
}

export const useUserStore = defineStore('user', () => {
  const user = ref(new User);

  const email = computed(() => user.value.email);
  const id = computed(() => user.value.id);
  const token = computed(() => user.value.token);
  const isAuth = computed(() => {
    const isAuth = !!user.value.token

    if (isAuth) return isAuth

    setUserFromCookie();

    return !!user.value.token
  })

  const setUser = (newUser) => {
    document.cookie = `user=${JSON.stringify(newUser)}; path=/; domain=.${location.hostname}; SameSite=None; Secure`
    Object.assign(user.value, newUser);
  }

  const setUserFromCookie = () => {
    const userString = ('; ' + document.cookie).split(`; user=`).pop().split(';')[0];

    if (!userString) {
      return
    }

    Object.assign(user.value, JSON.parse(userString));
  }

  const exit = () => {
    setUser(new User)
  }

  return { user, email, id, isAuth, setUser, setUserFromCookie, exit }
})
