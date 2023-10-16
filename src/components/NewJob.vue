<template>
  <div class="new-job">
    <h1>New Job</h1>
    
    <div class="client-section">
      <label>Klijent:</label>
      <select v-model="selectedJob.client_id">
        <option :value="null">Select a client</option>
        <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.client_name }}</option>
      </select>
      <span v-if="selectedJob">{{ selectedJob.job_date }}</span>
    </div>    
    <div class="job-details">
      <!-- Repeat this structure for each job detail like PAPIR vrsta, PRINTER, etc. -->
      <div class="job-item">
        <label>PAPIR vrsta:</label>
        <select v-model="selectedJob.paper_id">
          <option :value="null">Select</option>
          <option v-for="material in filteredMaterialsEquipmentPaper" :key="material.id" :value="material.id">{{ material.dekel_code }}</option>
        </select>
        <label>PRINTER:</label>
        <select v-model="selectedJob.printer_id">
          <option :value="null">Select</option>
          <option v-for="material in materialsEquipment" :key="material.id" :value="material.id">{{ material.dekel_code }}</option>
        </select>
        <label>KOVERAT vrsta:</label>
        <select v-model="selectedJob.envelope_id">
          <option :value="null">Select</option>
          <option v-for="material in filteredMaterialsEquipmentEnvelope" :key="material.id" :value="material.id">{{ material.dekel_code }}</option>
        </select>
        <label>KOV PRINTER:</label>
        <select v-model="selectedJob.envelope_printer_id">
          <option :value="null">Select</option>
          <option v-for="material in materialsEquipment" :key="material.id" :value="material.id">{{ material.dekel_code }}</option>
        </select>
        <label>KOVERTIR:</label>
        <select v-model="selectedJob.envelope_ps_id">
          <option :value="null">Select</option>
          <option v-for="material in filteredMaterialsEquipmentEnvelopePS" :key="material.id" :value="material.id">{{ material.dekel_code }}</option>
        </select>
        <label>PS MASINA:</label>
        <select v-model="selectedJob.ps_machine_id">
          <option :value="null">Select</option>
          <option v-for="material in materialsEquipment" :key="material.id" :value="material.id">{{ material.dekel_code }}</option>
        </select>
      </div>
      <div class="job-item">
        <label>Qty listova</label>
        <input type="text" v-model="selectedJob.qty_lists" />
        <label>Qty stranica</label>
        <input type="text" v-model="selectedJob.qty_pages" />
        <label>Qty koverata</label>
        <input type="text" v-model="selectedJob.qty_envelope" />
        <label>Kutija kom.:</label>
        <input type="text" v-model="selectedJob.qty_boxes" />
      </div>
    </div>
    
    <div class="operators">
      <!-- Repeat for each operator -->
      <div class="operator">
        <div class="operator-icon"></div>
        <span>Vaske</span>
      </div>
      
      <!-- ... -->
    </div>
    
    <div class="actions">
      <button @click="startJob">START</button>
      <button>PAUZA</button>
      <button>STOP</button>
      <button>END</button>
    </div>
    
    <div class="footer-icons">
      <!-- Icons at the bottom -->
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useCodeTablesStore } from '@/store';

export default {
  name: 'NewJob',
  setup() {
    const store = useCodeTablesStore();

    // Initialize selectedJob as a computed property
    const selectedJob = computed(() => {
      const jobFromStore = store.getSelectedJob;
      if (jobFromStore) {
        return { ...jobFromStore };
      }

      // If it's null in the store, create a default job
      const now = new Date();
      const defaultJobTypeId = getJobTypeIdByName('dekel');
      const defaultStatusId = getStatusIdByName('Created');
      const defaultUserId = getUsersIdByName('user1');
      return {
        client_id: null,
        operater_id: defaultUserId,
        job_date: now,
        job_type_id: defaultJobTypeId,
        paper_id: null,
        printer_id: null,
        envelope_id: null,
        envelope_printer_id: null,
        envelope_ps_id: null,
        ps_machine_id: null,
        qty_lists: null,
        qty_pages: null,
        qty_envelope: null,
        qty_boxes: null,
        start_time: getTime(now),
        end_time: null,
        status_id: defaultStatusId,
        other: null,
      };
    });

    // Compute properties based on the store data
    const clients = computed(() => store.getClients);
    const users = computed(() => store.getUsers);
    const materialsEquipment = computed(() => store.getMaterialsEquipment);
    const filteredMaterialsEquipmentPaper = computed(() => {
      // Replace 'filterCondition' with your actual filtering condition
      // For example, if you want to filter based on a property 'someProperty'
      // and only include elements where 'someProperty' meets a certain condition:
      const filterCondition = (material) => {
        return material.material_equipment_type === 'Papir A4';
      };
            // Filter materialsEquipment based on the filter condition
      return materialsEquipment.value.filter(filterCondition);
    });

    const filteredMaterialsEquipmentEnvelope = computed(() => {
      // Replace 'filterCondition' with your actual filtering condition
      // For example, if you want to filter based on a property 'someProperty'
      // and only include elements where 'someProperty' meets a certain condition:
      const filterCondition = (material) => {
        return material.material_equipment_type === 'Koverat';
      };
            // Filter materialsEquipment based on the filter condition
      return materialsEquipment.value.filter(filterCondition);
    });

    const filteredMaterialsEquipmentEnvelopePS = computed(() => {
      // Replace 'filterCondition' with your actual filtering condition
      // For example, if you want to filter based on a property 'someProperty'
      // and only include elements where 'someProperty' meets a certain condition:
      const filterCondition = (material) => {
        return material.material_equipment_type === 'PS Obrazac';
      };
            // Filter materialsEquipment based on the filter condition
      return materialsEquipment.value.filter(filterCondition);
    });
    // Function to get job_type_id by name
    function getJobTypeIdByName(name) {
      const jobTypes = store.getJobTypes;
      const jobType = jobTypes.find((type) => type.name === name);
      return jobType ? jobType.id : null;
    }

    // Function to get status_id by name
    function getStatusIdByName(name) {
      const statuses = store.getStatuses;
      const status = statuses.find((s) => s.status_name === name);
      return status ? status.id : null;
    }

    // Function to get user_id by name
    function getUsersIdByName(name) {
      const users = store.getUsers;
      const user = users.find((u) => u.username === name);
      return user ? user.id : null;
    }
    // Function to get time from a Date object
    function getTime(date) {
      return date.toTimeString().split(' ')[0];
    }

    // When the component is mounted, set the selectedJob in the store
    if (!store.getSelectedJob) {
      store.setSelectedJob(selectedJob.value);
    }

    const startJob = async () => {
      // Assuming you have the job data in selectedJob
      const newJobData = selectedJob.value;

      // Dispatch the createJob action from your Pinia store
      await store.createJob(newJobData);

      // You can perform other actions or state updates here if needed
    };
    return {
      selectedJob,
      clients,
      users,
      materialsEquipment,
      filteredMaterialsEquipmentPaper,
      filteredMaterialsEquipmentEnvelope,
      filteredMaterialsEquipmentEnvelopePS,
      startJob,
    };
  },
};
</script>

<style scoped>
.new-job {
  /* Container styles */
}

.client-section {
  /* Styles for the client dropdown and date/time */
}

.job-details {
  /* Styles for the job details section */
}

.operator {
  /* Styles for each operator item */
}

.actions {
  /* Styles for the action buttons */
}

.footer-icons {
  /* Styles for the bottom icons */
}
</style>