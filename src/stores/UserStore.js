import { defineStore } from 'pinia'
import data from '../../mock-db.json'

export const useUserStore = defineStore("UserStore", {
    state: () => {
        return {
            registration_date: "01.01.2022",
            pickles_solved: [7951, 4, 4144],
            pickles_liked: [],
            email: "pickles.puzzles@gmail.com",
            id: "mrpickles",
            name: "mr. pickles",
            photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
            easy_pickles: 0,
            hard_pickles: 0,
            medium_pickles: 0,
            score: 0,
            bw_pickles: 0,
            color_pickles: 0,
            admin: true
        }
    },
    actions: {
        async fill() {
            this.user = data.users[0]
        }
    }
    // getters
})