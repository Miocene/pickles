<template>
    <div class="picklePage__matrix" :style="{ '--leftNumbers': leftNumbers[0].length,
                                              '--topNumbers': topNumbers.length,
                                              '--cellsX': pickleStore.$state.solution[0].length,
                                              '--cellsY': pickleStore.$state.solution.length }">
        <div class="matrix">
            <div class="matrix__corner matrix__corner-1"></div>
            <div class="matrix__corner matrix__corner-2"></div>
            <div class="matrix__corner matrix__corner-3"></div>
            <div class="matrix__corner matrix__corner-4"></div>
            <div class="matrix__topNumbers">
                <div class="matrix__row" v-for="(row, itemY) in topNumbers" :key="row[0].y">
                    <div class="matrix__cell" v-for="(item, itemX) in row" :key="item.x" :attr-x="itemX" :attr-y="itemY" :attr-color="item.color">
                        <template v-if="item.number > 0">
                            {{ item.number }}
                        </template>
                        <template v-else></template>
                    </div>
                </div>
            </div>
            <div class="matrix__leftNumbers">
                <div class="matrix__row" v-for="(row, itemY) in leftNumbers" :key="row[0].y">
                    <div class="matrix__cell" v-for="(item, itemX) in row" :key="item.x" :attr-x="itemX" :attr-y="itemY" :attr-color="item.color">
                        <template v-if="item.number > 0">
                            {{ item.number }}
                        </template>
                        <template v-else></template>
                    </div>
                </div>
            </div>
            <div class="matrix__solution">
                <div class="matrix__row" v-for="(row, itemY) in pickleStore.$state.solution" :key="row[0].y">
                    <div class="matrix__cell" v-for="(item, itemX) in row" :key="item.x" :attr-x="itemX" :attr-y="itemY"></div>
                </div>
            </div>
            <div class="matrix__rightNumbers">
                <div class="matrix__row" v-for="row in leftNumbers" :key="row[0].y">
                    <div class="matrix__cell">{{ row[0].y + 1 }}</div>
                </div>
            </div>
            <div class="matrix__bottomNumbers">
                <div class="matrix__row">
                    <div class="matrix__cell" v-for="row in topNumbers[0]" :key="row.x">{{ row.x + 1 }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue'

    import { usePickleStore } from '@/stores/PickleStore'
    
    const pickleStore = usePickleStore()

    const leftNumbers = computed(() => {
        let leftNumbers = []
        let leftNumbersLength = 0

        pickleStore.$state.solution.forEach(row => {
            let rowNumbers = []
            let color = 0
            let number = 0

            for(let x = 0; x < row.length; x++) {
                if(row[x] > 0 && row[x] == row[x-1]) {
                    number++
                    color = row[x]
                } else if(row[x] > 0) {
                    if(color > 0) rowNumbers.push({ 'color': color, 'number': number })
                    number = 1
                    color = row[x]
                }
            }
            if(color > 0) rowNumbers.push({color, number})
            leftNumbers.push(rowNumbers)
            if(rowNumbers.length > leftNumbersLength) leftNumbersLength = rowNumbers.length
        })
        leftNumbers.forEach((row, y) => {
            if(row.length < leftNumbersLength)
                for(let i = row.length; i < leftNumbersLength; i++)
                    row.unshift({ 'color': 0, 'number': 0 })
            
            row.forEach((item, x) => {
                item.x = x
                item.y = y
            })
        })

        return leftNumbers
    })

    const topNumbers = computed(() => {
        let topNumbersDraft = []
        let topNumbers = []
        let topNumbersHeight = 0

        for(let x = 0; x < pickleStore.$state.solution[0].length; x++) {
            let colNumbers = []
            let color = 0
            let number = 0
            
            if(pickleStore.$state.solution[0][x] > 0) {
                color = pickleStore.$state.solution[0][x]
                number++
            }

            for(let y = 1; y < pickleStore.$state.solution.length; y++) {
                if(pickleStore.$state.solution[y][x] > 0 && pickleStore.$state.solution[y][x] == pickleStore.$state.solution[y-1][x]) {
                    number++
                    color = pickleStore.$state.solution[y][x]
                } else if(pickleStore.$state.solution[y][x] > 0) {
                    if(color > 0) colNumbers.push({ 'color': color, 'number': number })
                    number = 1
                    color = pickleStore.$state.solution[y][x]
                }
            }
            if(color > 0) colNumbers.push({color, number})
            topNumbersDraft.push(colNumbers)
            if(colNumbers.length > topNumbersHeight) topNumbersHeight = colNumbers.length
        }
        topNumbersDraft.forEach(row => {
            if(row.length < topNumbersHeight)
                for(let i = row.length; i < topNumbersHeight; i++)
                    row.unshift({ 'color': 0, 'number': 0 })
        })
        
        topNumbers = [...Array(topNumbersHeight)].map((row, x) => [...Array(topNumbersDraft.length)].map((col, y) => {
            let cell = topNumbersDraft[y][x]
            cell.x = y
            cell.y = x
            return cell
        }))

        return topNumbers
    })
</script>

<style scoped>
    .picklePage__matrix {
        display: flex;
        box-sizing: border-box;
        overflow: scroll;
    }
    .matrix {
        display: grid;
        grid-template-columns: calc(var(--leftNumbers) * var(--cellSize) + 4px) 
                               calc(var(--cellsX) * var(--cellSize)) 
                               calc(var(--cellSize) + 4px);
        grid-template-rows: calc(var(--topNumbers) * var(--cellSize) + 4px) 
                            calc(var(--cellsY) * var(--cellSize)) 
                            calc(var(--cellSize) + 4px);
        margin: auto;
    }
    .matrix__topNumbers {
        position: sticky; top: 0;
        grid-row: 1; grid-column: 2;
        box-sizing: border-box;
        border-bottom: 2px solid var(--color-border-primary);
        border-top: 2px solid var(--color-border-primary);
        color: var(--color-text-primary);
        background-color: var(--color-bg-primary);
    }
    .matrix__leftNumbers {
        position: sticky; left: 0;
        grid-row: 2; grid-column: 1;
        box-sizing: border-box;
        border-right: 2px solid var(--color-border-primary);
        border-left: 2px solid var(--color-border-primary);
        color: var(--color-text-primary);
        background-color: var(--color-bg-primary);
    }
    .matrix__solution {
        grid-row: 2; grid-column: 2;
        box-sizing: border-box;
    }
    .matrix__rightNumbers {
        position: sticky; right: 0;
        grid-row: 2; grid-column: 3;
        box-sizing: border-box;
        border-right: 2px solid var(--color-border-primary);
        border-left: 2px solid var(--color-border-primary);
        color: var(--color-text-secondary);
        background-color: var(--color-bg-primary);
    }
    .matrix__bottomNumbers {
        position: sticky; bottom: 0;
        grid-row: 3; grid-column: 2;
        box-sizing: border-box;
        border-top: 2px solid var(--color-border-primary);
        border-bottom: 2px solid var(--color-border-primary);
        color: var(--color-text-secondary);
        background-color: var(--color-bg-primary);
    }
    .matrix__corner {
        position: sticky;
        border: 2px solid var(--color-border-primary);
        background-color: var(--color-bg-primary);
        z-index: 1;
    }
    .matrix__corner-1 {
        top: 0; left: 0;
    }
    .matrix__corner-2 {
        top: 0; right: 0;
    }
    .matrix__corner-3 {
        bottom: 0; left: 0;
    }
    .matrix__corner-4 {
        bottom: 0; right: 0;
    }
    .matrix__row {
        display: grid;
        grid-template-columns: repeat(auto-fit, var(--cellSize));
        height: var(--cellSize);
        box-sizing: border-box;
    }
    .matrix__cell {
        height: 100%;
        box-sizing: border-box;
        font-size: var(--size-text-s);
        line-height: var(--cellSize);
        text-align: center;
    }
    .matrix__solution .matrix__cell:hover {
        box-shadow: inset 0 0 0 var(--cellSize) var(--color-bg-cell-primary);
    }
    .matrix__topNumbers .matrix__cell:not(:empty):hover,
    .matrix__leftNumbers .matrix__cell:not(:empty):hover,
    .matrix__cell:hover {
        cursor: default;
    }
    .matrix__solution .matrix__cell:hover {
        cursor: pointer;
    }
    .matrix__solution .matrix__cell[attr-color='0'] { 
        background: linear-gradient(-45deg, transparent calc(50% - 0.5px), var(--color-border-primary) calc(50% - 0.5px), var(--color-border-primary) calc(50% + 0.5px), transparent calc(50% + 0.5px)) 4px / calc(100% - 8px) no-repeat,
                    linear-gradient(45deg, transparent calc(50% - 0.5px), var(--color-border-primary) calc(50% - 0.5px), var(--color-border-primary) calc(50% + 0.5px), transparent calc(50% + 0.5px)) 4px / calc(100% - 8px) no-repeat,
                    var(--color-bg-primary);
    }
    .matrix__solution .matrix__cell[attr-color='1'] { background-color: var(--color-1); }
    .matrix__solution .matrix__cell[attr-color='2'] { background-color: var(--color-2); }
    .matrix__solution .matrix__cell[attr-color='3'] { background-color: var(--color-3); }
    .matrix__solution .matrix__cell[attr-color='4'] { background-color: var(--color-4); }
    .matrix__solution .matrix__cell[attr-color='5'] { background-color: var(--color-5); }
    .matrix__solution .matrix__cell[attr-color='6'] { background-color: var(--color-6); }
    .matrix__solution .matrix__cell[attr-color='7'] { background-color: var(--color-7); }
    .matrix__solution .matrix__cell[attr-color='8'] { background-color: var(--color-8); }
    .matrix__solution .matrix__cell[attr-color='9'] { background-color: var(--color-9); }

    /* vertical lines */
    .matrix__topNumbers .matrix__cell:not(:last-child):not(:nth-child(5n)),
    .matrix__solution .matrix__cell:not(:last-child):not(:nth-child(5n)),
    .matrix__bottomNumbers .matrix__cell:not(:last-child):not(:nth-child(5n)) {
        border-right: 1px solid var(--color-border-secondary);
    }
    .matrix__topNumbers .matrix__cell:nth-child(5n):not(:last-child),
    .matrix__solution .matrix__cell:nth-child(5n):not(:last-child),
    .matrix__bottomNumbers .matrix__cell:nth-child(5n):not(:last-child) {
        border-right: 2px solid var(--color-border-secondary);
    }
    .matrix__leftNumbers .matrix__cell:not(:last-child) {
        border-right: 1px solid var(--color-border-secondary);
    }

    /* horisontal likes */
    .matrix__leftNumbers .matrix__row:not(:last-child):not(:nth-child(5n)),
    .matrix__solution .matrix__row:not(:last-child):not(:nth-child(5n)),
    .matrix__rightNumbers .matrix__row:not(:last-child):not(:nth-child(5n)) {
        border-bottom: 1px solid var(--color-border-secondary);
    }
    .matrix__leftNumbers .matrix__row:nth-child(5n):not(:last-child),
    .matrix__solution .matrix__row:nth-child(5n):not(:last-child),
    .matrix__rightNumbers .matrix__row:nth-child(5n):not(:last-child) {
        border-bottom: 2px solid var(--color-border-secondary);
    }
    .matrix__topNumbers .matrix__row:not(:last-child) {
        border-bottom: 1px solid var(--color-border-secondary);
    }

    /* cross light */
    .matrix__solution .matrix__cell:hover {}
</style>