<script setup lang="ts">
import Status from "./Status.vue";
import { ApplicationCard } from "../utils/customTypes";
import Image from "./Image.vue";
const props = defineProps<{ application: ApplicationCard }>();
const { id, company, location, position, status, updatedAt } =
  props.application;
</script>

<template>
  <NuxtLink
    :href="`/applications/${company.name}-${position}-${id}`"
    class="grid max-w-sm w-full border bg-neutral-100 border-neutral-300 p-2 pb-3 gap-2 rounded-md"
  >
    <div class="flex justify-between">
      <div class="flex gap-2 w-full items-center">
        <Image
          :src="company.logoUrl"
          class="w-12 rounded-full h-fit"
          :alt="`${company.name} logo`"
        />
        <div class="grid leading-tight text-sm [&>*]:line-clamp-1">
          <span class="text-base font-medium">{{ company.name }}</span>
          <span>{{ location }}</span>
          <span>{{ position }}</span>
        </div>
      </div>
      <span class="whitespace-nowrap text-sm">{{ updatedAt }}</span>
    </div>
    <Status :status="status" />
  </NuxtLink>
</template>
