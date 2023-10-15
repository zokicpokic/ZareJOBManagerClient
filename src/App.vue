<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { onBeforeMount } from 'vue';
import { useCodeTablesStore } from '@/store/store';

export default {
  name: 'App',
  setup() {
    const codeTablesStore = useCodeTablesStore();

    onBeforeMount(async () => {
      // Fetch data for code tables when the application is about to mount
      await codeTablesStore.fetchUsers();
      await codeTablesStore.fetchJobTypes();
      await codeTablesStore.fetchMaterialsEquipment();
      await codeTablesStore.fetchStatuses();
      await codeTablesStore.fetchClients();
    });
  },
};
</script>

<style>
  body {
    font-size: 16px;
  }
</style>
