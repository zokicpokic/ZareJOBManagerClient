  <!-- src/components/Login.vue -->
  <template>
    <div class="login-container">
        <h1>Login</h1>
        <input class="login-input" v-model="username" placeholder="Username" />
        <input class="login-input" type="password" v-model="password" placeholder="Password" />
        <button class="login-button" @click="login">Login</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        password: ""
      };
    },
    methods: {
      login() {
        // For simplicity, we are not doing any real authentication here.
        // In a real-world application, you'd validate the credentials against a backend service.
        if (this.username && this.password) {
          this.$router.push({ name: 'JobList' });
        } else {
          alert("Please enter username and password");
        }
      }
    }
  };
  </script>

  <style scoped>
    .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh; /* This ensures the container takes the full viewport height */
    }
    
    .login-input, .login-button {
        width: 250px; /* Adjust this value based on your design requirements */
        margin: 10px 0; /* Some vertical spacing between elements */
        padding: 10px; /* Makes the inputs and button a bit taller */
    }
    
    .login-button {
        cursor: pointer;
    }
    .login-input {
        font-size: 16px;
    }
  </style>