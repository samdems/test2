<template>
  <div>
    <table class="table table-striped">
      <thead class="thead-light">
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="organization in organizations.Organizations" :key="organization.id">
          <td>{{ organization.name }}</td>
          <td>
            <div class="btn-group" role="group" aria-label="actions">
              <button class="btn btn-danger" @click="deleteOrganization(organization)">
                Remove
              </button>
              <button class="btn btn-secondary" @click="updateOrganization(organization.id)">
                Update
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-primary" @click="router.push('/organizations/new')">
      Add Organization
    </button>
  </div>
</template>

<script setup>
import { useOrganizationStore } from "../../stores/organizations";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const organizations = useOrganizationStore();
const router = useRouter();

organizations.fetchOrganizations()

function deleteOrganization(organization) {
  organizations.deleteOrganization(organization);
}

function updateOrganization(organizationId) {
  router.push(`/organizations/${organizationId}`);
}
</script>
