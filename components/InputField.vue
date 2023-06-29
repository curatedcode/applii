<script setup lang="ts">
import { useField } from "vee-validate";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  isRequired: {
    type: Boolean,
  },
});

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(props.name);

const newLabel = props.isRequired ? `${props.label} *` : props.label;
</script>

<template>
  <div class="grid gap-1">
    <label :for="name" class="font-medium ml-3 w-fit">{{ newLabel }}</label>
    <input
      type="text"
      :name="name"
      :id="name"
      :value="inputValue"
      @input="handleChange"
      @blur="handleBlur"
      :aria-describedby="`${name}-error`"
      class="border-2 border-neutral-300 bg-neutral-100 px-3 py-0.5 rounded-md max-w-lg"
    />
    <p
      :id="`${name}-error`"
      v-if="errorMessage && meta.touched"
      class="text-red-600 font-medium text-sm ml-3"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
