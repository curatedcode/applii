<script setup lang="ts">
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/24/outline";
import { statusArray } from "../utils/customTypes";
import { Status } from "@prisma/client";
import formatStatus from "./functions/formatStatus";

const statusSelectInputField = useState(
  "statusSelectInputField",
  (): Status => "needToApply"
);
</script>

<template>
  <Listbox
    class="grid gap-1"
    as="div"
    v-model="statusSelectInputField"
    name="status"
  >
    <ListboxLabel class="font-medium ml-3 w-fit">Status</ListboxLabel>
    <ListboxButton
      class="border-2 border-neutral-300 items-center flex justify-between bg-neutral-100 px-3 py-0.5 rounded-md max-w-lg text-left"
    >
      <span>{{ formatStatus(statusSelectInputField) }}</span>
      <ChevronDownIcon class="w-5" aria-hidden="true" />
    </ListboxButton>
    <TransitionRoot
      appear
      as="template"
      enter="transition-opacity duration-100 ease-in-out"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="duration-100 transition-opacity ease-in-out"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <ListboxOptions
        class="border-2 border-neutral-300 bg-neutral-100 rounded-md max-w-lg hover:cursor-pointer focus-within:outline-none"
        as="ul"
      >
        <ListboxOption
          v-for="status of statusArray"
          :key="status"
          :value="status"
          v-slot="{ active, selected }"
          class="focus-within:border-blue-600"
        >
          <li
            :class="[
              active ? 'bg-neutral-200 cursor-pointer' : '',
              selected ? 'font-medium' : '',
              'px-3 py-0.5 transition-colors list-none flex gap-2',
            ]"
          >
            <CheckIcon
              :class="[!selected && 'text-transparent', 'w-4']"
              aria-hidden="true"
            />
            <span>
              {{ formatStatus(status) }}
            </span>
          </li>
        </ListboxOption>
      </ListboxOptions>
    </TransitionRoot>
  </Listbox>
</template>
