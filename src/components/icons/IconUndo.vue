<template>
    <svg v-if="props.size == 'm'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.15851 2.24742C6.74287 1.88374 6.11111 1.92586 5.74743 2.3415L2.24742 6.3415C1.91753 6.71852 1.91753 7.28148 2.24742 7.6585L5.74743 11.6585C6.11111 12.0741 6.74287 12.1163 7.15851 11.7526C7.57414 11.3889 7.61626 10.7571 7.25258 10.3415L5.20377 8L8.5 8C14.8513 8 20 13.1487 20 19.5L20 21C20 21.5523 20.4477 22 21 22C21.5523 22 22 21.5523 22 21L22 19.5C22 12.0441 15.9558 6 8.5 6L5.20377 6L7.25258 3.65851C7.61626 3.24287 7.57414 2.61111 7.15851 2.24742Z" fill="currentColor"/>
    </svg>
</template>

<script setup>
    import { defineProps } from 'vue';
    
    const props = defineProps({ size: String })
</script>
    