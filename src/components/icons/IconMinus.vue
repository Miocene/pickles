<template>
    <svg v-if="props.size == 'm'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.1151 10.8057C3.49925 10.8057 3 11.3049 3 11.9207C3 12.5366 3.49924 13.0358 4.11509 13.0358L19.8849 13.0358C20.5008 13.0358 21 12.5366 21 11.9208C21 11.3049 20.5008 10.8057 19.8849 10.8057C10.5352 10.8057 14.2502 10.8057 4.1151 10.8057Z" fill="currentColor"/>
    </svg>
</template>

<script setup>
    import { defineProps } from 'vue';
    
    const props = defineProps({ size: String })
</script>