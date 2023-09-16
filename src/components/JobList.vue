<template>
  <div>
    <h1>Job List</h1>
    <div class="table-container">
      <button @click="openNewJobModal">Add Job</button>
      <!-- Modal Overlay -->
      <div class="modal-overlay" v-if="showModal">
        <!-- Modal Content -->
        <div class="modal">
          <!-- Pass selectedJob as a prop to NewJobModal -->
          <NewJobModal :selectedJob="selectedJob" @close="closeNewJobModal" @jobAdded="refreshJobsList"/>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Job Name</th>
            <th>Job Date</th>
            <th>Client Name</th>
            <th>Operator Name</th>
            <th>Status Name</th> <!-- Display Status Name -->
          </tr>
        </thead>
        <tbody>
          <!-- Iterate through jobs and display them in rows -->
          <tr v-for="job in jobs" :key="job.jobid" @click="openJobModal(job)">
            <td>{{ job.job_name }}</td>
            <td>{{ job.job_date }}</td>
            <td>{{ job.client_name }}</td>
            <td>{{ job.operater_name }}</td>
            <td>{{ job.status_name }}</td> <!-- Display Status Name -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import NewJobModal from "@/components/NewJob.vue"; // Import your modal component
const apiUrl = 'https://89.216.103.191:3000'; // production

export default {
  data() {
    return {
      showModal: false, // Initially, the modal is hidden
      jobs: [], // To store the retrieved jobs
      selectedJob: null, // To store the selected job
    };
  },
  components: {
    NewJobModal, // Register the modal component
  },
  mounted() {
    // Make an API request to retrieve the jobs and store them in the 'jobs' data property
    this.fetchJobs();
  },
  methods: {
    refreshJobsList() {
        // logic to fetch and refresh the list of jobs goes here
        this.fetchJobs();
    },
    openNewJobModal() {
      this.showModal = true; // Show the modal when the "Add Job" button is clicked
    },
    closeNewJobModal() {
      this.selectedJob = null
      this.showModal = false; // Close the modal when needed (e.g., after form submission or cancel)
    },
    openJobModal(job) {
      this.selectedJob = job; // Set the selected job
      this.showModal = true; // Show the modal
    },
    async fetchJobs() {
      try {
        // Make an API request to retrieve the jobs and store them in the 'jobs' data property
        const response = await fetch(apiUrl + '/jobs'); // Replace 'apiUrl' with your API endpoint
        if (response.ok) {
          this.jobs = await response.json();
        } else {
          console.error('Failed to fetch jobs.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  }
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
  background-color: #002f60;
}

</style>
  
  
  
  