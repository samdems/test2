<template>
  <form>
    <div class="input-group mb-3">
      <label class="input-group-text" for="name">Name:</label>
      <input
        v-model="organization.name"
        type="text"
        id="name"
        class="form-control"
        placeholder="Name"
        aria-label="Name"
      />
    </div>
    <button type="submit" class="btn btn-primary" @click.prevent="save()">
      {{ id ? "Update" : "Create" }}
    </button>
  </form>
</template>



<script setup>
import { useRoute, useRouter } from "vue-router";
import { useOrganizationStore } from "../../stores/organizations";
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();
const organizations = useOrganizationStore();

const id = ref(route.params?.id);
const organization = ref({
  name: '',
  users: []
});

async function fetchData() {
  if (!id.value) return;
  organization.value = await organizations.fetchOrganization(id.value);
}

async function save() {
  let organizationUpdated;
  if (id.value) {
    organizationUpdated = await update();
  } else {
    organizationUpdated = await create();
  }

  if (organizationUpdated) {
    router.push('/organizations');
  }
}

async function update() {
  return organizations.updateOrganization(organization.value);
}

async function create() {
  return organizations.createOrganization(organization.value);
}

fetchData();
</script>
