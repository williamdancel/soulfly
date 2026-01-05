<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

defineOptions({
    inheritAttrs: false,
});

interface Props {
    className?: HTMLAttributes['class'];
}

defineProps<Props>();
</script>

<template>
   <img src="/logo/soulfly-logo.png" alt="Soulfly Logo" style="width: 16rem; height: auto;"/>
</template>
