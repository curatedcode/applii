<script setup lang="ts">
import type { ApplicationCard } from "../utils/customTypes";

const feed = ref<ApplicationCard[]>([]);

useAsyncData(
  async () => {
    const data: null | ApplicationCard[] = await fetch("/feed").then((res) =>
      res.json()
    );

    if (!data) return;

    feed.value = data;
  },
  { server: false }
);
</script>

<template>
  <main class="px-2 py-6 md:px-4 md:py-8">
    <div
      class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center"
    >
      <ApplicationCard
        v-for="data of feed"
        :application="data"
        :key="data.id"
      />
    </div>
  </main>
</template>
