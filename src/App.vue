<template>
  <div>
    <nav>
      <ul>
        <router-link to="/new-job" class="nav-link" exact>New Job</router-link>
        <router-link to="/jobs" class="nav-link">Jobs</router-link>
      </ul>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  background-color: #f2f8fa; /* Background color for the top menu (light navy) */
  color: white; /* Font color for the top menu */
  padding: 10px;
}

ul {
  list-style: none;
  display: flex;
  align-items: center; /* Vertically center items within the navigation bar */
  justify-content: flex-start; /* Align items to the left */
  padding: 0; /* Remove default padding on the ul element */
  margin: 0; /* Remove default margin on the ul element */
}

/* Style the links */
.nav-link {
  text-decoration: none; /* Remove underline */
  color: black; /* Font color for all links (black) */
  margin-right: 20px; /* Add spacing between links */
}

/* Style the selected link */
.nav-link.router-link-exact-active {
  text-decoration: underline; /* Underline for the selected link */
  font-weight: bold; /* Make the selected link bold */
}

This will make sure that when you access the root path (/), the "New Job" link is selected and styled accordingly.

.nav-link:hover {
  text-decoration: underline; /* Underline on hover */
}

/* Add more CSS styles as needed */
</style>









