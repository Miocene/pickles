import { defineStore } from 'pinia'
import data from '../../mock-db.json'

export const usePicklesStore = defineStore("PicklesStore", {
    state: () => {
        return {
            pickles: []
        }
    },
    actions: {
        async fill() {
            this.pickles = data.pickles
        }
    }
    // getters
})