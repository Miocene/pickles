<template>
    <svg v-if="props.size == 'm'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.8415 2.24742C17.2571 1.88374 17.8889 1.92586 18.2526 2.3415L21.7526 6.3415C22.0825 6.71852 22.0825 7.28148 21.7526 7.6585L18.2526 11.6585C17.8889 12.0741 17.2571 12.1163 16.8415 11.7526C16.4259 11.3889 16.3837 10.7571 16.7474 10.3415L18.7962 8L15.5 8C9.14872 8 4 13.1487 4 19.5L4 21C4 21.5523 3.55228 22 3 22C2.44772 22 2 21.5523 2 21L2 19.5C2 12.0441 8.04416 6 15.5 6L18.7962 6L16.7474 3.65851C16.3837 3.24287 16.4259 2.61111 16.8415 2.24742Z" fill="currentColor"/>
    </svg>
</template>

<script setup>
    import { defineProps } from 'vue';
    
    const props = defineProps({ size: String })
</script>