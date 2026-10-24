<script setup lang="ts">
defineProps<{
  id: string
  title: string
}>()
</script>

<template>
  <div class="lesson-video">
    <iframe
      :src="`https://www.youtube.com/embed/${id}`"
      :title="title"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />
  </div>
</template>
