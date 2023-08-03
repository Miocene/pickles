<template>
    <div className='confetti' :style="{ '--color': confettiColor }">
        <div v-for="n in 200" :key="n" class='confetti__item'
             :style="{'left': (Math.random() * 100) + 'vw',
                      '--translatex': (Math.random() * 15) + 'vw',
                      '--rotateX': (Math.random() * 4) + 'turn',
                      '--rotateY': (Math.random() * 4) + 'turn',
                      '--rotateZ': (Math.random() * 4) + 'turn',
                       '--delay': (-1 * Math.random() * 10) + 's'}"></div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { usePickleStore } from '@/stores/PickleStore'
    
    const pickleStore = usePickleStore()
    const confettiColor = ref('')

    if(pickleStore.$state.difficulty == '1' || pickleStore.$state.difficulty == '2')
        confettiColor.value = 'var(--color-text-easy)'
    else if(pickleStore.$state.difficulty == '4' || pickleStore.$state.difficulty == '5')
        confettiColor.value = 'var(--color-text-hard)'
    else confettiColor.value = 'var(--color-text-medium)'
</script>

<style scoped>
.confetti {
    position: fixed;
    top: 0; left: 0;
}
.confetti__item {
    position: absolute;
    top: -10vh;
    aspect-ratio: 1/1;
    background-color: var(--color);
    transform: translate(var(--translatex), 0vh) 
               rotateX(0)
               rotateY(0)
               rotateZ(0);
    animation: confetti__item 10s var(--delay) cubic-bezier(0, 0, 0.6, 0.9) infinite;
}
@keyframes confetti__item {
    100% { transform: translate(var(--translatex), 150vh) 
                      rotateX(var(--rotateX))
                      rotateY(var(--rotateY))
                      rotateZ(var(--rotateZ)); }
}
.confetti__item:nth-child(4n) {
    width: 12px;
}
.confetti__item:nth-child(4n - 1) {
    width: 8px;
}
.confetti__item:nth-child(4n - 2) {
    width: 10px;
}
.confetti__item:nth-child(4n - 3) {
    width: 5px;
}
</style>