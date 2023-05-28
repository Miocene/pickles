<template>
    <!-- color pickle -->
    <main v-if="showPickle.color" class="picklePage" :style="{ '--cellSize': cellSize + 'px',
                                       '--color-1': showPickle.colors[0],
                                       '--color-2': showPickle.colors[1],
                                       '--color-3': showPickle.colors[2],
                                       '--color-4': showPickle.colors[3],
                                       '--color-5': showPickle.colors[4],
                                       '--color-6': showPickle.colors[5],
                                       '--color-7': showPickle.colors[6],
                                       '--color-8': showPickle.colors[7],
                                       '--color-9': showPickle.colors[8] }">
        <pickle-header :showPickle="showPickle" />
        <pickle-matrix :showPickle="showPickle" />
    </main>

    <!-- b&w pickle -->
    <main v-if="!showPickle.color" class="picklePage" :style="{ '--cellSize': cellSize + 'px' }">
        <pickle-header :showPickle="showPickle" />
        <pickle-matrix :showPickle="showPickle" />
    </main>
</template>

<script setup>
    import data from '../../mock-db.json'
    
    import { computed, ref } from 'vue'
    import { useRoute } from 'vue-router';
    import PickleHeader from '@/components/PickleHeader'
    import PickleMatrix from '@/components/PickleMatrix'

    const route = useRoute()
    const cellSize = ref(20)

    const showPickle = computed(() => {
        return data.pickles.find(pickle => pickle.id === parseInt(route.params.id))
    })
</script>

<style scoped>
    .picklePage {
        height: 100vh;
        display: grid;
        grid-template-rows: 60px calc(100vh - 60px);
    }

    .buttonGroup {
        display: flex;
        border-radius: 99em;
        transition: box-shadow 0.2s ease;
    }
    .buttonGroup:hover {
        box-shadow: 0 0 0 1px var(--color-border-secondary);
    }
    .cursorNumber {
        position: absolute;
        min-width: 20px; height: 20px;
        border-radius: 2px;
        border: 1px solid var(--color-bg-cell-primary);
        z-index: 1;
    }
</style>