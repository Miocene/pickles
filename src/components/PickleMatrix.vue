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
            <div class="matrix__solution" @mousedown="(event) => event.preventDefault()">
                <div class="matrix__row" v-for="(row, itemY) in pickleStore.$state.solution" :key="row[0].y">
                    <div class="matrix__cell" v-for="(item, itemX) in row" :key="item.x" :attr-x="itemX" :attr-y="itemY" :attr-color="pickleStore.$state.adminMode ? item : ''" @mousedown="mouseDown(itemX, itemY)" @mouseup="mouseUp(itemX, itemY)" @mouseenter="manageLine(itemX, itemY)"></div>
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
    import { computed, ref, watch } from 'vue'
    import { useMousePressed } from '@vueuse/core'

    import { usePickleStore } from '@/stores/PickleStore'
    
    const { pressed } = useMousePressed()
    const pickleStore = usePickleStore()

    const isPressed = ref(false)
    const line = ref({
        color: null,
        startPointX: null,
        startPointY: null,
        endPointX: null,
        endPointY: null
    })

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
    
    const leftNumbersDry = computed(() => {
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

        // add 0 to create a matrix
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
    
    const topNumbersDry = computed(() => {
        let topNumbersDraft = []
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

        return topNumbersDraft
    })
    
    const checkSolution = () => {
        const startPointX = line.value.startPointX > line.value.endPointX ? line.value.endPointX : line.value.startPointX
        const startPointY = line.value.startPointY > line.value.endPointY ? line.value.endPointY : line.value.startPointY
        const endPointX = line.value.startPointX < line.value.endPointX ? line.value.endPointX : line.value.startPointX
        const endPointY = line.value.startPointY < line.value.endPointY ? line.value.endPointY : line.value.startPointY

        // vertical lines
        for(let x = startPointX; x <= endPointX; x++) {
            let matrixNumbers = [...Array()]
            let help = 0
            let matrix = pickleStore.$state.matrix
            let rowsNumber = pickleStore.$state.solution.length
            
            for(let y = 0; y < rowsNumber; y++) {
                if(matrix[y][x] != 0) {
                    if(help != 0 && matrix[y][x] == matrix[y-1][x]) {
                        help++
                    } else if(help != 0 && matrix[y][x] != matrix[y-1][x]) {
                        matrixNumbers.push({'color': matrix[y-1][x], 'number': help})
                        help = 1
                    } else {
                        help++
                    }
                } else if(help != 0) {
                    matrixNumbers.push({'color': matrix[y-1][x], 'number': help})
                    help = 0
                } else help = 0
            }
            if(help != 0) matrixNumbers.push({'color': matrix[rowsNumber - 1][x], 'number': help})

            // the line is done!
            if(JSON.stringify(matrixNumbers) == JSON.stringify(topNumbersDry.value[x])) {
                const col = document.querySelectorAll(`.matrix__solution .matrix__cell[attr-x='${x}'][attr-color='']`)
                const numberCol = document.querySelectorAll(`.matrix__topNumbers .matrix__cell[attr-x='${x}']`)
                
                col.forEach(cell => { 
                    cell.setAttribute('attr-color', 0)
                    pickleStore.$state.matrix[cell.getAttribute('attr-y')][cell.getAttribute('attr-x')] = 0
                })
                numberCol.forEach(cell => { 
                    cell.classList.add('matrix__cell-checked')
                })
            } 
            // the line is not done
            else {
                const numberCol = document.querySelectorAll(`.matrix__topNumbers .matrix__cell[attr-x='${x}']`)
                let y = 0
                let topNumbers = topNumbersDry.value[x]

                numberCol.forEach(cell => { 
                    cell.classList.remove('matrix__cell-checked')
                })

                // top -> bottom
                for(let i = 0; i < topNumbers.length; i++) {
                    let isSmallGap = true
                    let numberOfChecked = 0
                    let firstCellToSkip = y
                    let gap
                    
                    while (y < rowsNumber && isSmallGap) {
                        gap = 0
                        while(y < rowsNumber && matrix[y][x] === 0) y++
                        while(y < rowsNumber && matrix[y][x] === '') {
                            y++
                            gap++
                        }
                        if(gap < topNumbers[i]['number'] && (matrix[y][x] == 0 || matrix[y][x] == '')) isSmallGap = true
                        else isSmallGap = false
                    }
                    let lastCellToSkip = y - 1
                    
                    while(y < rowsNumber && matrix[y][x] > 0 && matrix[y][x] == topNumbers[i]['color']) {
                        y++
                        numberOfChecked++
                    }
                    
                    if(topNumbers[i]['number'] == numberOfChecked && topNumbers[i]['number'] > gap) {
                        const cell = document.querySelector(`.matrix__solution .matrix__cell[attr-x='${x}'][attr-y='${y}']`)
                        // const cellNumber = document.querySelector(`.matrix__topNumbers .matrix__cell[attr-x='${pickle['top_numbers_clear'][x][i][2]}'][attr-y='${pickle['top_numbers_clear'][x][i][3]}']`)

                        // cellNumber.classList.add('matrix__number-checked')
                        for(let helpY = firstCellToSkip; helpY <= lastCellToSkip; helpY++) {
                            const cell = document.querySelector(`.matrix__solution .matrix__cell[attr-x='${x}'][attr-y='${helpY}']`)
                            cell.setAttribute('attr-color', 0)
                            pickleStore.$state.matrix[helpY][x] = 0
                        }
                        if(cell && topNumbers[i+1] && topNumbers[i]['color'] == topNumbers[i+1]['color'] && cell.getAttribute('attr-color') == '') {
                            cell.setAttribute('attr-color', 0)
                            pickleStore.$state.matrix[y][x] = 0
                        }
                    } else i = topNumbers.length
                }

                y = rowsNumber - 1

                // bottom -> top
                for(let i = (topNumbers.length - 1); i >= 0; i--) {
                    let isSmallGap = true
                    let numberOfChecked = 0
                    let firstCellToSkip = y
                    let gap
                    
                    while (y > 0 && isSmallGap) {
                        gap = 0
                        while(y > 0 && matrix[y][x] === 0) y--
                        while(y > 0 && matrix[y][x] === '') {
                            y--
                            gap++
                        }
                        if(gap < topNumbers[i]['number'] && (matrix[y][x] == 0 || matrix[y][x] == '')) isSmallGap = true
                        else isSmallGap = false
                    }
                    let lastCellToSkip = y + 1
                    
                    while(y > 0 && matrix[y][x] > 0 && matrix[y][x] == topNumbers[i]['color']) {
                        y--
                        numberOfChecked++
                    }
                    
                    if(topNumbers[i]['number'] == numberOfChecked && topNumbers[i]['number'] > gap) {
                        const cell = document.querySelector(`.matrix__solution .matrix__cell[attr-x='${x}'][attr-y='${y}']`)
                        // const cellNumber = document.querySelector(`.matrix__topNumbers .matrix__cell[attr-x='${pickle['top_numbers_clear'][x][i][2]}'][attr-y='${pickle['top_numbers_clear'][x][i][3]}']`)

                        // cellNumber.classList.add('matrix__number-checked')
                        for(let helpY = lastCellToSkip; helpY <= firstCellToSkip; helpY++) {
                            const cell = document.querySelector(`.matrix__solution .matrix__cell[attr-x='${x}'][attr-y='${helpY}']`)
                            cell.setAttribute('attr-color', 0)
                            pickleStore.$state.matrix[helpY][x] = 0
                        }
                        if(cell && topNumbers[i-1] && topNumbers[i]['color'] == topNumbers[i-1]['color'] && cell.getAttribute('attr-color') == '') {
                            cell.setAttribute('attr-color', 0)
                            pickleStore.$state.matrix[y][x] = 0
                        }
                    } else i = -1
                }
            }
        }
        
        // horizontal lines
        for(let y = startPointY; y <= endPointY; y++) {
            let matrixNumbers = [...Array()]
            let help = 0
            let matrix = pickleStore.$state.matrix
            let colsNumber = pickleStore.$state.solution[0].length
            
            for(let x = 0; x < colsNumber; x++) {
                if(matrix[y][x] != 0) {
                    if(help != 0 && matrix[y][x] == matrix[y][x-1]) {
                        help++
                    } else if(help != 0 && matrix[y][x] != matrix[y][x-1]) {
                        matrixNumbers.push({'color': matrix[y][x-1], 'number': help})
                        help = 1
                    } else {
                        help++
                    }
                } else if(help != 0) {
                    matrixNumbers.push({'color': matrix[y][x-1], 'number': help})
                    help = 0
                } else help = 0
            }
            if(help != 0) matrixNumbers.push({'color': matrix[y][colsNumber - 1], 'number': help})

            if(JSON.stringify(matrixNumbers) == JSON.stringify(leftNumbersDry.value[y])) {
                const col = document.querySelectorAll(`.matrix__solution .matrix__cell[attr-y='${y}'][attr-color='']`)
                const numberCol = document.querySelectorAll(`.matrix__leftNumbers .matrix__cell[attr-y='${y}']`)

                col.forEach(cell => { 
                    cell.setAttribute('attr-color', 0)
                    matrix[cell.getAttribute('attr-y')][cell.getAttribute('attr-x')] = 0
                })
                numberCol.forEach(cell => { 
                    cell.classList.add('matrix__cell-checked')
                })
            } else {
                const numberCol = document.querySelectorAll(`.matrix__leftNumbers .matrix__cell[attr-y='${y}']`)
                let x = 0
                let leftNumbers = leftNumbersDry.value[y]

                numberCol.forEach(cell => { 
                    cell.classList.remove('matrix__cell-checked')
                })

                // left -> right
                for(let i = 0; i < leftNumbersDry.value[y].length; i++) {
                    let isSmallGap = true
                    let numberOfChecked = 0
                    let firstCellToSkip = x
                    let gap
                    
                    while (x < colsNumber && isSmallGap) {
                        gap = 0
                        while(x < colsNumber && matrix[y][x] === 0) x++
                        while(x < colsNumber && matrix[y][x] === '') {
                            x++
                            gap++
                        }
                        if(gap < leftNumbers[i][0] && (matrix[y][x] == 0 || matrix[y][x] == '')) isSmallGap = true
                        else isSmallGap = false
                    }
                    let lastCellToSkip = x - 1
                    
                    while(x < colsNumber && matrix[y][x] > 0 && matrix[y][x] == leftNumbers[i]['color']) {
                        x++
                        numberOfChecked++
                    }
                    
                    if(leftNumbers[i]['number'] == numberOfChecked && leftNumbers[i]['number'] > gap) {
                        const cell = document.querySelector(`.matrix__solution .matrix__cell[attr-x='${x}'][attr-y='${y}']`)
                        // const cellNumber = document.querySelector(`.matrix__leftNumbers .matrix__cell[attr-x='${pickle['left_numbers_clear'][y][i][2]}'][attr-y='${pickle['left_numbers_clear'][y][i][3]}']`)

                        // cellNumber.classList.add('matrix__number-checked')
                        for(let helpX = firstCellToSkip; helpX <= lastCellToSkip; helpX++) {
                            const cell = document.querySelector(`.matrix__solution .matrix__cell[attr-y='${y}'][attr-x='${helpX}']`)
                            cell.setAttribute('attr-color', 0)
                            matrix[y][helpX] = 0
                        }
                        if(cell && leftNumbers[i+1] && leftNumbers[i]['color'] == leftNumbers[i+1]['color'] && cell.getAttribute('attr-color') == '') {
                            cell.setAttribute('attr-color', 0)
                            matrix[y][x] = 0
                        }
                    } else i = leftNumbers.length
                }

                x = colsNumber - 1

                // right -> left
                for(let i = (leftNumbers.length - 1); i >= 0; i--) {
                    let isSmallGap = true
                    let numberOfChecked = 0
                    let firstCellToSkip = x
                    let gap
                    
                    while (x > 0 && isSmallGap) {
                        gap = 0
                        while(x > 0 && matrix[y][x] === 0) x--
                        while(x > 0 && matrix[y][x] === '') {
                            x--
                            gap++
                        }
                        if(gap < leftNumbers[i]['number'] && (matrix[y][x] == 0 || matrix[y][x] == '')) isSmallGap = true
                        else isSmallGap = false
                    }
                    let lastCellToSkip = x + 1
                    
                    while(x > 0 && matrix[y][x] > 0 && matrix[y][x] == leftNumbers[i]['color']) {
                        x--
                        numberOfChecked++
                    }
                    
                    if(leftNumbers[i]['number'] == numberOfChecked && leftNumbers[i]['number'] > gap) {
                        const cell = document.querySelector(`.matrix__solution .matrix__cell[attr-x='${x}'][attr-y='${y}']`)
                        // const cellNumber = document.querySelector(`.matrix__leftNumbers .matrix__cell[attr-x='${pickle['left_numbers_clear'][y][i][2]}'][attr-y='${pickle['left_numbers_clear'][y][i][3]}']`)

                        // cellNumber.classList.add('matrix__number-checked')
                        for(let helpX = lastCellToSkip; helpX <= firstCellToSkip; helpX++) {
                            const cell = document.querySelector(`.matrix__solution .matrix__cell[attr-y='${y}'][attr-x='${helpX}']`)
                            cell.setAttribute('attr-color', 0)
                            matrix[y][helpX] = 0
                        }
                        if(cell && leftNumbers[i-1] && leftNumbers[i]['color'] == leftNumbers[i-1]['color'] && cell.getAttribute('attr-color') == '') {
                            cell.setAttribute('attr-color', 0)
                            matrix[y][x] = 0
                        }
                    } else i = -1
                }
            }
        }
    }

    const checkWin = () => {
        if(JSON.stringify(pickleStore.$state.solution) == JSON.stringify(pickleStore.$state.matrix)) {
            console.log('you win')
        }
    }

    const updateTheMatrix = () => {
        const startPointX = line.value.startPointX > line.value.endPointX ? line.value.endPointX : line.value.startPointX
        const startPointY = line.value.startPointY > line.value.endPointY ? line.value.endPointY : line.value.startPointY
        const endPointX = line.value.startPointX < line.value.endPointX ? line.value.endPointX : line.value.startPointX
        const endPointY = line.value.startPointY < line.value.endPointY ? line.value.endPointY : line.value.startPointY
        
        for(let y = startPointY; y <= endPointY; y++)
            for(let x = startPointX; x <= endPointX; x++)
                pickleStore.$state.matrix[y][x] = line.value.color
    }

    const updateProgress = () => {
        let sum = 0
        let draftProgress = 0
        
        pickleStore.$state.solution.forEach((row, y) => {
            row.forEach((cell, x) => {
                if(cell === pickleStore.$state.matrix[y][x])
                draftProgress++
                sum++
            })
        })
        
        pickleStore.$state.progress = draftProgress / sum
    }

    const drawTheLine = () => {
        const startPointX = line.value.startPointX > line.value.endPointX ? line.value.endPointX : line.value.startPointX
        const startPointY = line.value.startPointY > line.value.endPointY ? line.value.endPointY : line.value.startPointY
        const endPointX = line.value.startPointX < line.value.endPointX ? line.value.endPointX : line.value.startPointX
        const endPointY = line.value.startPointY < line.value.endPointY ? line.value.endPointY : line.value.startPointY
        
        for(let y = startPointY; y <= endPointY; y++)
            for(let x = startPointX; x <= endPointX; x++)
                document.querySelector(`.matrix__solution .matrix__cell[attr-x="${x}"][attr-y="${y}"]`).setAttribute('attr-color', line.value.color)

        // show the number of colored cells
        let xCells = Math.abs(line.value.startPointX - line.value.endPointX)
        let yCells = Math.abs(line.value.startPointY - line.value.endPointY)
        
        console.log('xCells: ' + xCells)
        console.log('yCells: ' + yCells)
        if(xCells != 0 && yCells == 0)
            pickleStore.$state.checkedCells = xCells + 1
        else if(xCells == 0 && yCells != 0)
            pickleStore.$state.checkedCells = yCells + 1
        else if(xCells != 0 && yCells != 0)
            pickleStore.$state.checkedCells = (xCells + 1) + '×' + (yCells + 1)

        console.log(pickleStore.$state.checkedCells)
    }
    
    const undrawTheLine = () => {
        const startPointX = line.value.startPointX > line.value.endPointX ? line.value.endPointX : line.value.startPointX
        const startPointY = line.value.startPointY > line.value.endPointY ? line.value.endPointY : line.value.startPointY
        const endPointX = line.value.startPointX < line.value.endPointX ? line.value.endPointX : line.value.startPointX
        const endPointY = line.value.startPointY < line.value.endPointY ? line.value.endPointY : line.value.startPointY
        
        for(let y = startPointY; y <= endPointY; y++)
            for(let x = startPointX; x <= endPointX; x++)
                document.querySelector(`.matrix__solution .matrix__cell[attr-x="${x}"][attr-y="${y}"]`).setAttribute('attr-color', pickleStore.$state.matrix[y][x])
    }
    
    const manageLine = (x, y) => {
        if (isPressed.value && line.value.startPointX !== null) {
            // undraw the line
            undrawTheLine()

            if(pickleStore.$state.colorChecked === pickleStore.$state.matrix[line.value.startPointY][line.value.startPointX] || pickleStore.$state.matrix[line.value.startPointY][line.value.startPointX] === 0)
                line.value.color = ''
            else line.value.color = pickleStore.$state.colorChecked

            line.value.endPointX = x
            line.value.endPointY = y

            // draw the line
            drawTheLine()
        }
    }
    
    const mouseUp = (x, y) => {
        if(line.value.startPointX !== null) {
            line.value.endPointX = x
            line.value.endPointY = y
            
            updateTheMatrix()
            updateProgress()
            checkSolution()
            checkWin()

            line.value.startPointX = null
            line.value.startPointY = null
            line.value.endPointX = null
            line.value.endPointY = null
            line.value.color = null

            pickleStore.$state.checkedCells = 0
        }
    }
    
    const mouseDown = (x, y) => {
        if(line.value.startPointX === null) {
            line.value.startPointX = x
            line.value.startPointY = y
            line.value.endPointX = x
            line.value.endPointY = y
            
            if(pickleStore.$state.colorChecked === pickleStore.$state.matrix[y][x] || pickleStore.$state.matrix[y][x] === 0)
                line.value.color = ''
            else line.value.color = pickleStore.$state.colorChecked
            
            // draw the line
            drawTheLine()
        }
    }

    watch(pressed, (v) => {
        isPressed.value = v
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
    .matrix__cell-checked {
        color: var(--color-text-secondary);
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
    .matrix__cell[attr-color='1'] { background-color: var(--color-1); }
    .matrix__solution .matrix__cell[attr-color='1'] { background-color: var(--color-1, var(--color-bg-cell-checked)); }
    .matrix__cell[attr-color='2'] { background-color: var(--color-2); }
    .matrix__cell[attr-color='3'] { background-color: var(--color-3); }
    .matrix__cell[attr-color='4'] { background-color: var(--color-4); }
    .matrix__cell[attr-color='5'] { background-color: var(--color-5); }
    .matrix__cell[attr-color='6'] { background-color: var(--color-6); }
    .matrix__cell[attr-color='7'] { background-color: var(--color-7); }
    .matrix__cell[attr-color='8'] { background-color: var(--color-8); }
    .matrix__cell[attr-color='9'] { background-color: var(--color-9); }

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