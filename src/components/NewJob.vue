<template>
  <div class="new-job">
    <h1>New Job</h1>
    <div class="client-section">
      <label>Klijent:</label>
      <input list="client-datalist" v-model="selectedJob.client_id">
      <datalist id="client-datalist">
        <option v-for="client in clients" :key="client.id">{{ client.client_name }}</option>
      </datalist>
      <span v-if="selectedJob">{{ selectedJob.job_date }}</span>
    </div>    
    <div class="job-details">
      <!-- Repeat this structure for each job detail like PAPIR vrsta, PRINTER, etc. -->
      <div class="job-item">
        <label>PAPIR vrsta:</label>
        <input list="paper-datalist" v-model="selectedJob.paper_id">
        <datalist id="paper-datalist">
          <option v-for="material in filteredMaterialsEquipmentPaper" :key="material.id">{{ material.dekel_code }}</option>
        </datalist>
        <label>PRINTER:</label>
        <input list="printer-datalist" v-model="selectedJob.printer_id">
        <datalist id="printer-datalist">
          <option v-for="material in materialsEquipment" :key="material.id">{{ material.dekel_code }}</option>
        </datalist>
        <label>KOVERAT vrsta:</label>
        <input list="envelope-datalist" v-model="selectedJob.envelope_id">
        <datalist id="envelope-datalist">
          <option v-for="material in filteredMaterialsEquipmentEnvelope" :key="material.id">{{ material.dekel_code }}</option>
        </datalist>
        <label>KOV PRINTER:</label>
        <input list="printer_env-datalist" v-model="selectedJob.envelope_printer_id">
        <datalist id="printer_env-datalist">
          <option v-for="material in materialsEquipment" :key="material.id">{{ material.dekel_code }}</option>
        </datalist>
        <label>KOVERTIR:</label>
        <input list="printer_env_ps-datalist" v-model="selectedJob.envelope_printer_id">
        <datalist id="printer_env_ps-datalist">
          <option v-for="material in filteredMaterialsEquipmentEnvelopePS" :key="material.id">{{ material.dekel_code }}</option>
        </datalist>
        <label>PS MASINA:</label>
        <input list="ps-datalist" v-model="selectedJob.ps_machine_id">
        <datalist id="ps-datalist">
          <option v-for="material in materialsEquipment" :key="material.id">{{ material.dekel_code }}</option>
        </datalist>
      </div>
      <div class="job-item">
        <label>Qty listova</label>
        <input type="text" v-model="selectedJob.qty_lists" @keydown="preventNonNumericKey" />

        <label>Qty stranica</label>
        <input type="text" v-model="selectedJob.qty_pages" @keydown="preventNonNumericKey" />

        <label>Qty koverata</label>
        <input type="text" v-model="selectedJob.qty_envelope" @keydown="preventNonNumericKey" />

        <label>Kutija kom.:</label>
        <input type="text" v-model="selectedJob.qty_boxes" @keydown="preventNonNumericKey" />
    </div>
    </div>
    
    <div class="operators">
      <!-- Repeat for each operator -->
      <div class="operator">
        <div class="operator-icon"></div>
        <span>user1</span>
      </div>
      
      <!-- ... -->
    </div>
    
    <div class="actions">
      <button class="action-btn start-btn" @click="startJob" :disabled="!isStartEnabled">
        <font-awesome-icon icon="play" />
      </button>
      <button class="action-btn pause-btn" @click="stopJob" :disabled="!isOtherActionsEnabled">
        <font-awesome-icon icon="pause" />
      </button>
      <button class="action-btn stop-btn" @click="stopJob" :disabled="!isOtherActionsEnabled">
        <font-awesome-icon icon="stop" />
      </button>
      <button class="action-btn end-btn" @click="stopJob" :disabled="!isOtherActionsEnabled">
        <font-awesome-icon icon="check" />
      </button>
      <button data-v-8c8614a6="" class="action-btn close-btn" @click="closeNewJobModal">
          <svg class="svg-inline--fa fa-times" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
              <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.2 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72 276.07 422.79c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
          </svg>
      </button>
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
  setup(_, { emit }) {
    const store = useCodeTablesStore();

    var isJobFromStore = store.getSelectedJob != null
    // Initialize selectedJob as a computed property
    const selectedJob = computed(() => {
      const jobFromStore = store.getSelectedJob;
      if (jobFromStore) {
        return {...jobFromStore};
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

    const closeNewJobModal = () => {
      emit('close');  // Emitting an event to signal the parent to close the modal.
    };

    const startJob = async () => {
      // Assuming you have the job data in selectedJob
      selectedJob.value.status_id = getStatusIdByName("Running");
      
      const newJobData = selectedJob.value;

      // Dispatch the createJob action from your Pinia store
      await store.createJob(newJobData);
      
      emit('jobAdded');
      // Close the modal or perform any other action after the job is created successfully.
      closeNewJobModal();
    };

    const stopJob = async () => {
      // Assuming you have the job data in selectedJob
      const now = new Date();
      selectedJob.value.status_id = getStatusIdByName("Finished");
      selectedJob.value.end_time = getTime(now);
      //const newJobData = selectedJob.value;

      // Dispatch the createJob action from your Pinia store
      //await store.updateJob(newJobData.id, newJobData);
      // Close the modal or perform any other action after the job is created successfully.
      closeNewJobModal();
    };

    const preventNonNumericKey = ($event) => {
      if(!/^(\d|\b|Tab|ArrowLeft|ArrowRight|Delete)$/.test($event.key)) {
          $event.preventDefault();
      }
    }

    return {
      selectedJob,
      clients,
      users,
      materialsEquipment,
      filteredMaterialsEquipmentPaper,
      filteredMaterialsEquipmentEnvelope,
      filteredMaterialsEquipmentEnvelopePS,
      startJob,
      stopJob,
      isJobFromStore,
      closeNewJobModal,
      preventNonNumericKey,
    };
  },
  computed: {
    isJobPassed() {
      return this.isJobFromStore;
    },
    isStartEnabled() {
        return !this.isJobPassed;
    },
    isOtherActionsEnabled() {
        return this.isJobPassed;
    }
}
};
</script>

<style scoped>
.new-job {
  /* Container styles */
}

.client-section {
  /* This will add space below every jobItem. */
  margin-bottom: 16px;

  /* Alternatively, if you want to add space around the entire control (e.g., top, right, bottom, and left), you can use: */
  margin: 16px;
  
  /* If you want to add spacing between elements inside the .jobItem, use padding instead: */
  padding: 16px;
}

.job-item, job-details {
  /* This will add space below every jobItem. */
  margin-bottom: 16px;

  /* Alternatively, if you want to add space around the entire control (e.g., top, right, bottom, and left), you can use: */
  margin: 16px;
  
  /* If you want to add spacing between elements inside the .jobItem, use padding instead: */
  padding: 16px;
}

.operator {
  /* Styles for each operator item */
}

.actions {
    display: flex;
    justify-content: space-between; /* Add this line to justify the content */
    gap: 1rem;
    align-items: center; /* To vertically align items if they have different heights */
}

.action-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s;
}

.action-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.action-btn:disabled {
    background-color: #f5f5f5;
    color: #a8a8a8;
    cursor: not-allowed;
    opacity: 0.7;
}

/* Ensure icons inside the button inherit the color and cursor */
.action-btn:disabled .font-awesome-icon {
    color: inherit;
    cursor: inherit;
}

.close-btn {
    margin-left: auto; /* This will push the button to the right */
    color: #666; /* Color for the close button (change if needed) */
}

.close-btn .fa-times {
    color: inherit; /* Ensure the icon inherits the color from the button */
}

.start-btn .fa-play,
.end-btn .fa-check {
  color: green;
}

.pause-btn .fa-pause {
  color: blue;
}

.stop-btn .fa-stop {
  color: red;
}

.footer-icons {
  /* Styles for the bottom icons */
}
</style>