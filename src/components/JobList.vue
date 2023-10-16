<template>
  <div>
    <h1>Job Lista</h1>
    <div class="table-container">
      <button @click="openNewJobModal">Dodaj Job</button>
      <!-- Modal Overlay -->
      <div class="modal-overlay" v-if="showModal">
        <!-- Modal Content -->
        <div class="modal">
          <!-- Pass selectedJob as a prop to NewJobModal -->
          <NewJobModal :selectedJob="selectedJob" @close="closeNewJobModal" @jobAdded="refreshJobsList" />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Klijent</th>
            <th>Operater</th>
            <th>Datum</th>
            <th>START</th>
            <th>END</th>
            <th>TIME Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <!-- Iterate through jobs from the store and display them in rows -->
          <tr v-for="job in jobs" :key="job.jobid" @click="openJobModal(job)">
            <td>{{ getClientName(job.client_id) }}</td>
            <td>{{ getOperaterName(job.operater_id) }}</td>
            <td>{{ formatDate(job.job_date) }}</td>
            <td>{{ formatTime(job.start_time) }}</td>
            <td>{{ formatTime(job.end_time) }}</td>
            <td>{{ calculateTimeTotal(job.start_time, job.end_time) }}</td>
            <td>{{ getStatusName(job.status_id) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<!-- Rest of the component remains the same -->


<script>
import NewJobModal from "@/components/NewJob.vue"; // Import your modal component
import { computed } from 'vue'; // Import computed from Vue
import { useCodeTablesStore } from "@/store"; // Import your Pinia store

export default {
  setup() {
    const store = useCodeTablesStore();
    const jobs = computed(() => store.jobs);

    // Define a computed property to map client_id to client_name
    const getClientName = (client_id) => {
      const client = store.clients.find((c) => c.id === client_id);
      return client ? client.client_name : ''; // Return the client_name or an empty string
    };

    // Define a computed property to map operater_id to username
    const getOperaterName = (operater_id) => {
      const user = store.users.find((u) => u.id === operater_id);
      return user ? user.username : ''; // Return the client_name or an empty string
    };

    // Define a computed property to map status_id to status_name
    const getStatusName = (status_id) => {
      const status = store.statuses.find((s) => s.id === status_id);
      return status ? status.status_name : ''; // Return the client_name or an empty string
    };

    // Define a method to format the date as "DD.MM."
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${day}.${month}.${year}`;
    };

    // Define a method to format the time as "hh:mm:ss"
    const formatTime = (timeString) => {
      if (!timeString) {
        return '-'; // Return a dash if time is missing
      }

      const date = new Date(timeString);
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');

      return `${hours}:${minutes}:${seconds}`;
    };

    // Define a method to calculate the time total in hh:mm format
    const calculateTimeTotal = (startTime, endTime) => {
      if (!startTime || !endTime) {
        return '-'; // Return a dash if either start or end time is missing
      }

      const startDateTime = new Date(`1970-01-01T${startTime}`);
      const endDateTime = new Date(`1970-01-01T${endTime}`);

      // Set both dates to the same fixed date (e.g., the oldest date)
      const fixedDate = new Date('1970-01-01');

      startDateTime.setFullYear(fixedDate.getFullYear(), fixedDate.getMonth(), fixedDate.getDate());
      endDateTime.setFullYear(fixedDate.getFullYear(), fixedDate.getMonth(), fixedDate.getDate());

      const timeDiffMs = endDateTime - startDateTime;
      const hours = String(Math.floor(timeDiffMs / 3600000)).padStart(2, '0');
      const minutes = String(Math.floor((timeDiffMs % 3600000) / 60000)).padStart(2, '0');
      const seconds = String(Math.floor((timeDiffMs % 60000) / 1000)).padStart(2, '0');

      return `${hours}:${minutes}:${seconds}`;
    };

    return {
      jobs,
      getClientName,
      getOperaterName,
      getStatusName,
      formatDate,
      formatTime,
      calculateTimeTotal,
    };
  },
  data() {
    return {
      showModal: false, // Initially, the modal is hidden
    };
  },
  components: {
    NewJobModal, // Register the modal component
  },
  mounted() {
    // No need to fetch jobs here, they are already fetched and stored in the store
  },
  methods: {
    refreshJobsList() {
      // logic to fetch and refresh the list of jobs goes here (if needed)
      // Since jobs are reactive, you may not need to manually refresh here
    },
    openNewJobModal() {
      this.showModal = true; // Show the modal when the "Add Job" button is clicked
    },
    closeNewJobModal() {
      // Clear selectedJob in the store and close the modal
      useCodeTablesStore().selectedJob = null;
      this.showModal = false;
    },
    openJobModal(job) {
      // Set the selected job in the store and show the modal
      useCodeTablesStore().selectedJob = job;
      this.showModal = true;
    },
  },
};
</script>

<style>
/* Add your CSS styles for the table here if needed */
/* Modal Overlay Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Ensure the modal overlay is above other content */
}

/* Modal Styles */
.modal {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1000; /* Ensure the modal is above the overlay */
}

.table-container {
  width: 90%; /* the same as the table's width */
  margin: 0 auto; /* center the container on the page */
  overflow-x: auto; /* Add horizontal scrolling */
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #000; /* Add a border to the entire table */
}

th {
  background-color: navy; /* Light navy background color for header cells */
  color: white; /* Text color for header cells */
  font-weight: bold; /* Bold text for header cells */
  padding: 8px; /* Padding for header cells */
  text-align: left; /* Left-align header text */
  border: 1px solid #000; /* Add a border to header cells */
}

th, td {
  padding: 8px; /* Padding for table cells */
  text-align: left; /* Left-align cell text */
  border: 1px solid #000; /* Add a border to all cells */
}

/* Style even and odd rows differently for better readability */
tr:nth-child(even) {
  background-color: #f2f2f2; /* Background color for even rows */
}

/* Change font color to green on hover */
tr:hover {
  color: rgb(10, 208, 10);
}

.table-row {
  cursor: pointer; /* Show a pointer cursor on hover to indicate clickability */
}

h1 {
  text-align: center;
  color: navy;
}

button {
  background-color: navy;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: rgb(0, 0, 55); /* Dark navy background color on hover */
}

</style>