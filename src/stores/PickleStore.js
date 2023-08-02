import { defineStore } from 'pinia'

export const usePickleStore = defineStore("PickleStore", {
    state: () => {
        return {
            id: Number,
            name: '',
            author_id: '',
            color: Boolean,
            colors: [],
            creation_date: '',
            difficulty: Number,
            likes: Number,
            published: Boolean,
            solution: [],
            matrix: [],
            colorChecked: 1,
            cellSize: 20,
            adminMode: false
        }
    },
    actions: {
        async fill(v) {
            this.id = v.id
            this.name = v.name
            this.author_id = v.author_id
            this.color = v.color
            this.colors = v.colors
            this.creation_date = v.creation_date
            this.difficulty = v.difficulty
            this.likes = v.likes
            this.published = v.published
            this.solution = v.solution
            this.matrix = [...Array(v.solution.length)].map(() => [...Array(v.solution[0].length)].map(() => ''))
        },
        async clearMatrix() {
            this.matrix = [...Array(this.solution.length)].map(() => [...Array(this.solution[0].length)].map(() => ''))
        }
    }
    // getters
})