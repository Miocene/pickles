<template>
    <main>
        <!-- color pickle -->
        <div v-if="pickleStore.$state.color" class="picklePage" :style="{ '--cellSize': pickleStore.$state.cellSize + 'px',
                                        '--color-1': pickleStore.$state.colors[0],
                                        '--color-2': pickleStore.$state.colors[1],
                                        '--color-3': pickleStore.$state.colors[2],
                                        '--color-4': pickleStore.$state.colors[3],
                                        '--color-5': pickleStore.$state.colors[4],
                                        '--color-6': pickleStore.$state.colors[5],
                                        '--color-7': pickleStore.$state.colors[6],
                                        '--color-8': pickleStore.$state.colors[7],
                                        '--color-9': pickleStore.$state.colors[8] }">
            <pickle-header />
            <pickle-matrix  />
            
            <div class="cursorNumber" :attr-color="pickleStore.$state.colorChecked" :style="{ 'transform': `translate(${x + 15}px, ${y + 15}px)` }">
                {{ pickleStore.$state.checkedCells != 0 ? pickleStore.$state.checkedCells : '' }}
            </div>
        </div>
        
        <!-- b&w pickle -->
        <div v-else-if="!pickleStore.$state.color" class="picklePage" :style="{ '--cellSize': pickleStore.$state.cellSize + 'px' }">
            <pickle-header />
            <pickle-matrix />
            
            <!-- not solved -->
            <template v-if="!pickleStore.$state.solved">
                <div v-if="pickleStore.$state.checkedCells != 0" class="cursorNumber" :style="{ 'transform': `translate(${x + 15}px, ${y + 15}px)` }">
                    {{ pickleStore.$state.checkedCells }}
                </div>
            </template>
        </div>
    </main>
</template>

<script setup>
    import data from '../../mock-db.json'

    import { useAttrs, watch, ref } from 'vue'
    import { useMouse, useMagicKeys } from '@vueuse/core'

    import { usePickleStore } from '@/stores/PickleStore'
    import { useUserStore } from '@/stores/UserStore'
    import PickleHeader from '@/components/PickleHeader'
    import PickleMatrix from '@/components/PickleMatrix'
    
    const pickleStore = usePickleStore()
    const userStore = useUserStore()
    
    const attrs = useAttrs()
    const backupColor = ref(1)
    const { Digit1, Digit2, Digit3, Digit4, Digit5, Digit6, Digit7, Digit8, Digit9 } = useMagicKeys({
        onEventFired(e) {
            if(pickleStore.$state.colorChecked > 0) backupColor.value = pickleStore.$state.colorChecked
            if (e.key === 'Shift' && e.type === 'keydown') 
                pickleStore.$state.colorChecked = 0
            else if(backupColor.value > 0) pickleStore.$state.colorChecked = backupColor.value
        }
    })
    const { x, y } = useMouse({ touch: false })

    let thisPickle = data.pickles.find(pickle => pickle.id === parseInt(attrs.id))
    thisPickle.solved = userStore.pickles_solved.includes(thisPickle.id) ? true : false
    pickleStore.fill(thisPickle)
    pickleStore.$state.progress = 0
    pickleStore.$state.checkedCells = 0

    watch([Digit1, Digit2, Digit3, Digit4, Digit5, Digit6, Digit7, Digit8, Digit9],
        ([key1, key2, key3, key4, key5, key6, key7, key8, key9]) => {
        
        if(key1 && pickleStore.$state.colors[0]) pickleStore.$state.colorChecked = 1
        else if(key2 && pickleStore.$state.colors[1]) pickleStore.$state.colorChecked = 2
        else if(key3 && pickleStore.$state.colors[2]) pickleStore.$state.colorChecked = 3
        else if(key4 && pickleStore.$state.colors[3]) pickleStore.$state.colorChecked = 4
        else if(key5 && pickleStore.$state.colors[4]) pickleStore.$state.colorChecked = 5
        else if(key6 && pickleStore.$state.colors[5]) pickleStore.$state.colorChecked = 6
        else if(key7 && pickleStore.$state.colors[6]) pickleStore.$state.colorChecked = 7
        else if(key8 && pickleStore.$state.colors[7]) pickleStore.$state.colorChecked = 8
        else if(key9 && pickleStore.$state.colors[8]) pickleStore.$state.colorChecked = 9
    })
</script>

<style scoped>
    .picklePage {
        height: 100vh;
        display: grid;
        grid-template-rows: 64px calc(100vh - 60px);
    }

    .cursorNumber {
        position: absolute;
        min-width: 20px; height: 20px;
        padding: 0 var(--space-2xs);
        border-radius: 2px;
        background-color: var(--color-bg-secondary);
        border: 1px solid var(--color-bg-cell-primary);
        box-sizing: border-box;
        font-size: var(--size-text-m);
        line-height: 20px;
        color: var(--color-text-primary);
        text-align: center;
        z-index: 1;
    }
    .cursorNumber[attr-color='0'] { 
        background: linear-gradient(-45deg, transparent calc(50% - 0.5px), var(--color-border-primary) calc(50% - 0.5px), var(--color-border-primary) calc(50% + 0.5px), transparent calc(50% + 0.5px)) 4px / calc(100% - 8px) no-repeat,
                    linear-gradient(45deg, transparent calc(50% - 0.5px), var(--color-border-primary) calc(50% - 0.5px), var(--color-border-primary) calc(50% + 0.5px), transparent calc(50% + 0.5px)) 4px / calc(100% - 8px) no-repeat,
                    var(--color-bg-primary);
    }
    .cursorNumber[attr-color='1'] { background-color: var(--color-1); }
    .cursorNumber[attr-color='2'] { background-color: var(--color-2); }
    .cursorNumber[attr-color='3'] { background-color: var(--color-3); }
    .cursorNumber[attr-color='4'] { background-color: var(--color-4); }
    .cursorNumber[attr-color='5'] { background-color: var(--color-5); }
    .cursorNumber[attr-color='6'] { background-color: var(--color-6); }
    .cursorNumber[attr-color='7'] { background-color: var(--color-7); }
    .cursorNumber[attr-color='8'] { background-color: var(--color-8); }
    .cursorNumber[attr-color='9'] { background-color: var(--color-9); }
</style>