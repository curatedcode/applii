<script setup lang="ts">
import InputField from "../../components/InputField.vue";
import TextAreaField from "../../components/TextAreaField.vue";
import { Form } from "vee-validate";
import { applicationFormData } from "../../utils/customTypes";
import { toTypedSchema } from "@vee-validate/zod";
import StatusSelectInputField from "../../components/StatusSelectInputField.vue";

const isSubmitting = ref(false);

async function onSubmit() {
  isSubmitting.value = true;
  const {} = await useFetch("/application", {
    method: "POST",
    body: {
      data: JSON.stringify("data submitted"),
    },
  });

  isSubmitting.value = false;
}
</script>

<template>
  <main class="px-2 py-6 md:px-4 md:py-8 grid">
    <h1 class="text-2xl font-medium text-center mb-8">New Application</h1>
    <Form
      @submit="onSubmit"
      :validation-schema="toTypedSchema(applicationFormData)"
      class="grid gap-3 place-self-center w-full max-w-lg"
    >
      <InputField name="companyName" label="Company Name" :isRequired="true" />
      <InputField
        name="companyLogoUrl"
        label="Company Logo Url"
        :isRequired="true"
      />
      <InputField name="location" label="Location" :isRequired="true" />
      <InputField name="position" label="Position" :isRequired="true" />
      <StatusSelectInputField />
      <TextAreaField
        name="summary"
        label="Summary"
        rows="10"
        :isRequired="true"
      />
      <TextAreaField
        name="posting"
        label="Posting"
        rows="10"
        :isRequired="true"
      />
      <InputField name="salary" label="Salary" :isRequired="true" />
      <InputField name="benefits" label="Benefits" />
      <TextAreaField name="notes" label="Notes" type="textarea" rows="10" />
      <button
        type="submit"
        :disabled="isSubmitting"
        :title="isSubmitting ? `Application is being created` : ``"
        class="bg-site-blue text-lg px-6 py-1 w-fit font-medium rounded-md hover:bg-site-blue/90 transition-colors text-white justify-self-end mt-4"
      >
        Submit
      </button>
    </Form>
  </main>
</template>
