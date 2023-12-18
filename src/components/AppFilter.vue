<script>
import axios from 'axios';

export default {
  name: 'AppFilter',
  data() {
    return {
      selected_filters: {
        selected_services: [], // Array to store selected services
        selected_rooms: [], // Array to store selected rooms
        selected_bedrooms: [], // Array to store selected bedrooms
        selected_beds: [], // Array to store selected beds
        selected_max_guests: [], // Array to store selected maxGuests
        selected_bathrooms: [] // Array to store selected bathrooms
      },
      services: [], // Array to store available services
    };
  },
  methods: {
    async fetchServices() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/service');
        this.services = response.data.result;
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    },
    applyFilters() {
      console.log(this.selected_filters);
      this.$emit('filterSearch', this.selected_filters)
    },
  },
  mounted() {
    // Fetch available services when the component is mounted
    this.fetchServices();
  },
};
</script>


<template>
  <!-- Dropdown menu for selecting services -->
  <div class="dropdown m-5 d-flex justify-content-center">
    <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="servicesDropdown"
      data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Services
    </button>
    <div class="dropdown-menu px-2" aria-labelledby="servicesDropdown">
      <div v-for="service in services" :key="service.id" class="form-check">
        <input class="form-check-input" type="checkbox" :id="'serviceCheckbox_' + service.id"
          v-model="selected_filters.selected_services" :value="service.id" />
        <label class="form-check-label" :for="'serviceCheckbox_' + service.id">
          {{ service.name }}
        </label>
      </div>
    </div>
    <button class="btn btn-outline-secondary dropdown-toggle ms-3" type="button" id="servicesDropdown"
      data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Rooms
    </button>
    <div class="dropdown-menu px-2" aria-labelledby="servicesDropdown">
      <ul>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_rooms" value="1"> 1</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_rooms" value="2"> 2</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_rooms" value="3"> 3</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_rooms" value="4"> 4</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_rooms" value="5"> 5</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_rooms" value="other">
          > 5 </li>
      </ul>
    </div>
    <button class="btn btn-outline-secondary dropdown-toggle ms-3" type="button" id="servicesDropdown"
      data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Bedrooms
    </button>
    <div class="dropdown-menu px-2" aria-labelledby="servicesDropdown">
      <ul>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_bedrooms" value="1"> 1</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_bedrooms" value="2"> 2</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_bedrooms" value="3"> 3</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_bedrooms" value="4"> 4</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_bedrooms" value="5"> 5</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_bedrooms" value="other">
          > 5 </li>
      </ul>
    </div>
    <button class="btn btn-outline-secondary dropdown-toggle ms-3" type="button" id="servicesDropdown"
      data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Beds
    </button>
    <div class="dropdown-menu px-2" aria-labelledby="servicesDropdown">
      <ul>
        <li class="list_filters"> <input class="form-check-input" type="checkbox" v-model="selected_filters.selected_beds"
            value="1"> 1</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox" v-model="selected_filters.selected_beds"
            value="2"> 2</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox" v-model="selected_filters.selected_beds"
            value="3"> 3</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox" v-model="selected_filters.selected_beds"
            value="4"> 4</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox" v-model="selected_filters.selected_beds"
            value="5"> 5</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox" v-model="selected_filters.selected_beds"
            value="other">
          > 5 </li>
      </ul>
    </div>
    <button class="btn btn-outline-secondary dropdown-toggle ms-3" type="button" id="servicesDropdown"
      data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Max Guests
    </button>
    <div class="dropdown-menu px-2" aria-labelledby="servicesDropdown">
      <ul>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_max_guests" value="1"> 1</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_max_guests" value="2"> 2</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_max_guests" value="3"> 3</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_max_guests" value="4"> 4</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_max_guests" value="5"> 5</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_max_guests" value="other">
          > 5 </li>
      </ul>
    </div>
    <button class="btn btn-outline-secondary dropdown-toggle ms-3" type="button" id="servicesDropdown"
      data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Bathrooms
    </button>
    <div class="dropdown-menu px-2" aria-labelledby="servicesDropdown">
      <ul>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_bathrooms" value="1"> 1</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_bathrooms" value="2"> 2</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_bathrooms" value="3"> 3</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_bathrooms" value="4"> 4</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_bathrooms" value="5"> 5</li>
        <li class="list_filters"> <input class="form-check-input" type="checkbox"
            v-model="selected_filters.selected_bathrooms" value="other">
          > 5 </li>
      </ul>
    </div>
    <button class="btn btn-outline-danger ms-3" @click="applyFilters">Apply Filters</button>







  </div>
</template>
