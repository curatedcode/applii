<script setup lang="ts">
import { Status } from "@prisma/client";
import formatStatus from "./functions/formatStatus";
import getStatusColor from "./functions/getStatusColor";
const props = defineProps<{ status: Status }>();
const { status } = props;

const bg = `bg-${getStatusColor(status)}`;
</script>

<template>
  <div
    :class="`px-3 py-1 text-sm font-medium rounded-md text-center w-32 ${bg}`"
  >
    {{ formatStatus(status) }}
  </div>
</template>
