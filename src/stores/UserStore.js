import { defineStore } from 'pinia'
import data from '../../mock-db.json'

export const useUserStore = defineStore("UserStore", {
    state: () => {
        return {
            user: {}
        }
    },
    actions: {
        async fill() {
            this.user = data.users[0]
        }
    }
    // getters
})