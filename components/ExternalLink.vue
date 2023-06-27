<script setup lang="ts">
defineProps<{ class?: string; href: string }>();
</script>

<template>
  <a rel="nofollow noreferrer" target="_blank" :href="href" :class="class"
    ><slot
  /></a>
</template>
