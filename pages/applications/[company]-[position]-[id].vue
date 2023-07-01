<script setup lang="ts">
import { ApplicationPage } from "../../utils/customTypes";
const props = defineProps<{ application: ApplicationPage }>();
const {
  company,
  location,
  position,
  status,
  updatedAt,
  summary,
  posting,
  salary,
  benefits,
  notes,
  createdAt,
  appliedAt,
  interviewedAt,
  deniedAt,
} = props.application;
</script>

<template>
  <main class="px-2 py-6 md:px-4 md:py-8">
    <header>
      <h1>{{ position }}</h1>
      <div class="flex justify-between">
        <div>
          <span>{{ company.name }}</span>
          <span>{{ location }}</span>
        </div>
        <span>Updated: {{ updatedAt }}</span>
      </div>
    </header>
    <section></section>
  </main>
</template>
