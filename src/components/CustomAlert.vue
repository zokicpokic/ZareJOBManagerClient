<template>
    <div class="custom-alert-overlay">
      <div class="custom-alert">
        <h2 class="alert-heading">{{ alertHeading }}</h2>
        <p>{{ alertMessage }}</p>
        <button @click="dismissAlert">OK</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      alertHeading: String,
      alertMessage: String,
    },
    methods: {
      dismissAlert() {
        this.$emit('close'); // Emit the 'close' event to parent component (JobList.vue)
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add CSS styles for your custom alert here */
  .custom-alert-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  }
  
  .custom-alert {
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    padding: 20px;
    text-align: center;
  }
  
  .alert-heading {
    color: navy;
    font-weight: bold;
  }
  </style>
  
  