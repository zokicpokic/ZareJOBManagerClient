Copy code
<template>
  <div class="new-job-container">
    <h1>New Job</h1>
    <!-- Use a v-if condition to render the form when data is available -->
    <form @submit.prevent="addJob" v-if="dataLoaded">
      <div>
        <label for="jobName">Job Name:</label>
        <input type="text" id="jobName" v-model="jobName" required>
      </div>
      <div>
        <label for="jobDate">Job Date:</label>
        <input type="date" id="jobDate" v-model="jobDate" required>
      </div>
      <div>
        <label for="clientName">Client Name:</label>
        <input type="text" id="clientName" v-model="clientName" required>
      </div>
      <div>
        <label for="operaterName">Operator Name:</label>
        <input type="text" id="operaterName" v-model="operaterName" required>
      </div>
      <!-- PRN Dropdowns -->
      <div v-for="index in 5" :key="index">
        <label :for="`prnSelect${index}`">PRN{{ index }}:</label>
        <select :id="`prnSelect${index}`" v-model="selectedPrn[index - 1]" required>
            <!-- Check if selectedJob exists and if it does, only show the matched PRN, otherwise show the "Select PRN" option -->
            <option v-for="prn in codeOptions" :key="prn.id" :value="prn.id">{{ prn.name ? prn.name : prn.code_name }}</option>
        </select>
      </div>

      <!-- KOV Dropdowns -->
      <div v-for="index in 4" :key="index">
        <label :for="`kovSelect${index}`">KOV{{ index }}:</label>
        <select :id="`kovSelect${index}`" v-model="selectedKov[index - 1]" required>
            <option v-for="kov in codeOptions" :key="kov.id" :value="kov.id">{{ kov.name ? kov.name : kov.code_name }}</option>
        </select>
      </div>

    <!-- Material Dropdown -->
    <div>
      <label for="materialSelect">Material:</label>
      <select id="materialSelect" v-model="selectedMaterial" required>
        <option v-if="!selectedJob" disabled value="">Select Material</option>
        <option v-for="material in materialOptions" :key="material.id" :value="material.id">{{ material.name ? material.name : material.material_name }}</option>
        <option v-if="selectedJob && selectedJob.material_name" :value="selectedJob.material_id">{{ selectedJob.material_name }}</option>
      </select>
    </div>

    <!-- Status Dropdown -->
    <div>
      <label for="statusSelect">Status:</label>
      <select id="statusSelect" v-model="selectedStatus" required>
        <option v-if="!selectedJob" disabled value="">Select Status</option>
        <option v-for="status in statusOptions" :key="status.id" :value="status.id">{{ status.name ? status.name : status.status_name }}</option>
        <option v-if="selectedJob && selectedJob.status_name" :value="selectedJob.status_id">{{ selectedJob.status_name }}</option>
      </select>
    </div>
    <div class="button-container" style="display: flex; justify-content: space-between;">
      <button type="submit" class="custom-button">{{ selectedJob ? 'Update Job' : 'Add Job' }}</button>
      <button @click="dismissModal" class="close-button">Close</button>
    </div>
    </form>
    <CustomAlert
      v-if="showAlert"
      :alertHeading="alertHeading"
      :alertMessage="alertMessage"
      @close="dismissAlert"
    />
  </div>
</template>

<script>
const moment = require('moment');
const apiUrl = 'https://89.216.103.191:3000';// production
//const apiUrl = 'https://192.168.50.251:3000';// dev
import CustomAlert from "@/components/CustomAlert.vue"; // Import your custom alert component

export default {
  props: {
    selectedJob: Object, // Add a prop to receive the selectedJob
  },
  data() {
    return {
      codeOptions: [], // Populate this with your PRN codes
      materialOptions: [], // Populate this with your material data
      statusOptions: [], // Populate this with your status data
      selectedPrn: ['', '', '', '', ''], // Initialize as an empty array with 5 empty strings
      selectedKov: ['', '', '', ''], // Initialize as an empty array with 4 empty strings
      jobName: '',
      jobDate: '',
      clientName: '',
      operaterName: '',
      selectedMaterial: null, // Initialize as null or set it to a default material ID
      selectedStatus: null, // Initialize as null or set it to a default status ID
      showAlert: false,
      alertHeading: "",
      alertMessage: "",
      dataLoaded: false, // Add a data property to track if data is loaded
    };
  },
  methods: {
    async addJob() {
      try {
        const prn1 = this.selectedPrn[0];
        const prn2 = this.selectedPrn[1];
        const prn3 = this.selectedPrn[2];
        const prn4 = this.selectedPrn[3];
        const prn5 = this.selectedPrn[4]
        const kov1 = this.selectedKov[0];
        const kov2 = this.selectedKov[1];
        const kov3 = this.selectedKov[2];
        const kov4 = this.selectedKov[3];

        let response;
        if (this.selectedJob) {
            response = await fetch(`${apiUrl}/jobs/${this.selectedJob.jobid}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              job_name: this.jobName,
              job_date: this.jobDate,
              client_name: this.clientName,
              operater_name: this.operaterName,
              prn1: prn1,
              prn2: prn2,
              prn3: prn3,
              prn4: prn4,
              prn5: prn5,
              kov1: kov1,
              kov2: kov2,
              kov3: kov3,
              kov4: kov4,
              material_id: this.selectedMaterial,
              status_id: this.selectedStatus,
            }),
          });
        } else {
          response = await fetch(apiUrl +'/jobs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            job_name: this.jobName,
            job_date: this.jobDate,
            client_name: this.clientName,
            operater_name: this.operaterName,
            prn1: prn1,
            prn2: prn2,
            prn3: prn3,
            prn4: prn4,
            prn5: prn5,
            kov1: kov1,
            kov2: kov2,
            kov3: kov3,
            kov4: kov4,
            material_id: this.selectedMaterial,
            status_id: this.selectedStatus,
          }),
        });
        }

        if (response.ok) {
          this.$emit('jobAdded'); // Emit an event named "jobAdded"
          /*const data = await response.json();
          console.log('New job ID:', data.jobid);*/
          this.jobName = '';
          this.jobDate = '';
          this.clientName = '';
          this.operaterName = '';
          this.selectedPrn = ['', '', '', '', '']; // Reset PRN selections
          this.selectedKov = ['', '', '', '']; // Reset KOV selections
          this.selectedMaterial = null; // Reset material selection
          this.selectedStatus = null; // Reset status selection
          // Show a custom success alert
          this.alertHeading = "Job Added Successfully";
          this.alertMessage = "The job has been added successfully.";
          this.showAlert = true;       
          // Dismiss the modal
         //this.dismissModal();
        } else {
          // Show a custom error alert
          this.alertHeading = "Error Adding Job";
          this.alertMessage = "There was an error while adding the job.";
          this.showAlert = true;     
          // Dismiss the modal
          //this.dismissModal();
          console.error('Error adding job:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding job:', error);
      }
    },
    async fetchData() {
      try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const responseCodes = await fetch(apiUrl + '/codes');
        const responseMaterials = await fetch(apiUrl + '/materials');
        const responseStatuses = await fetch(apiUrl + '/statuses');
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
        if (responseCodes.ok) {
          this.codeOptions = await responseCodes.json();
        }

        if (responseMaterials.ok) {
          this.materialOptions = await responseMaterials.json();
        }

        if (responseStatuses.ok) {
          this.statusOptions = await responseStatuses.json();
        }
        // Set dataLoaded to true when data is successfully loaded
        this.dataLoaded = true;
        this.populateFromSelectedJob();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    // Add this method to dismiss the modal
    dismissModal() {
      this.$emit('close'); // Emit the 'close' event to parent component (JobList.vue)
    },
    dismissAlert() {
      this.showAlert = false; // Hide the custom alert
      if (this.alertHeading === "Job Added Successfully") {
        this.dismissModal(); // Close the modal if it was a success alert
      }
    },
    populateFromSelectedJob() {
      if (this.selectedJob) {
        this.jobName = this.selectedJob.job_name;
        const utcDate = moment.utc(this.selectedJob.job_date);
        this.jobDate = utcDate.format('YYYY-MM-DD');
        this.clientName = this.selectedJob.client_name;
        this.operaterName = this.selectedJob.operater_name;
        for (let i = 0; i < 5; i++) {
          this.selectedPrn[i] = this.selectedJob[`Prn${i + 1}`] || '';
        }

        for (let i = 0; i < 4; i++) {
          this.selectedKov[i] = this.selectedJob[`Kov${i + 1}`] || '';
        }

        this.selectedMaterial = this.selectedJob.material_name ? this.selectedJob.material_id : null;
        this.selectedStatus = this.selectedJob.status_name ? this.selectedJob.status_id : null;
      }
    }
  },
  watch: {
    selectedJob: {
      immediate: true,
      handler() {
        this.populateFromSelectedJob();
      }
    }
  },
  created() {
    // Call fetchData when the component is created to fetch data before rendering
    this.fetchData();
  },
  mounted() {
      if (this.selectedJob) {
      this.jobName = this.selectedJob.job_name;
      this.jobDate = this.selectedJob.job_date;
      this.clientName = this.selectedJob.client_name;
      this.operaterName = this.selectedJob.operater_name;
      
      // Populate PRN and KOV fields
      for (let i = 0; i < 5; i++) {
        this.selectedPrn[i] = this.selectedJob[`prn${i + 1}`] || ''; // Use the corresponding PRN property
      }
      
      for (let i = 0; i < 4; i++) {
        this.selectedKov[i] = this.selectedJob[`kov${i + 1}`] || ''; // Use the corresponding KOV property
      }
      
      this.selectedMaterial = this.selectedJob.material_id;
      this.selectedStatus = this.selectedJob.status_id;
    }
    //this.fetchData();
  },
  components: {
    CustomAlert, // Register the custom alert component
  }
};
</script>

<style>
/* Add your CSS styles for the form elements here */
/* Styles for the custom button */
.custom-button {
  background-color: navy; /* Set the background color to navy */
  color: white; /* Set the text color to white */
  font-weight: bold; /* Make the text bold */
  padding: 10px 20px; /* Adjust padding as needed for button size */
  border: none; /* Remove the border */
  cursor: pointer; /* Add a pointer cursor on hover */
  /* Add any other desired styles here */
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

form div {
  margin-bottom: 10px; /* Add space between form elements */
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

label {
  width: 150px; /* Adjust the width as needed */
  text-align: left;
}

input,
select {
  width: 50%; /* Inputs and selects take the remaining width */
  padding: 5px;
  border: 1px solid #ccc;
}

button {
  margin-top: 10px; /* Add space between the last form element and the button */
}

.new-job-container {
  position: relative; /* This makes it a reference point for absolutely positioned children */
  padding-top: 0px; /* This provides space for the close button and some additional padding */
}

.close-button {
  float: right;
  background-color: rgb(172, 0, 0); /* Red background color */
  color: white; /* White text color */
  border: none; /* Remove any border */
  padding: 10px 20px; /* Provide some padding */
  cursor: pointer; /* Add a pointer cursor on hover */
  font-weight: bold; /* Make the text bold */
}
.custom-button:hover {
  background-color: rgb(0, 0, 55); /* Dark navy background color on hover */
}

.close-button:hover {
  background-color: rgb(105, 2, 2); /* Dark red background color on hover */
}


</style>
