<script>
import axios from 'axios';

export default {
  name: 'AppFilter',
  data() {
    return {
      selectedServices: [], // Array to store selected services
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
      // Log information for debugging
      console.log('All Apartments:', this.$parent.apartments);
      console.log('Selected Services:', this.selectedServices);

      // Use the applyFilters function to filter apartments
      const filteredApartments = this.applyFiltersFunction(
        this.$parent.apartments,
        this.selectedServices
      );

      // Log the filtered apartments for debugging
      console.log('Filtered Apartments:', filteredApartments);

      // You can update the parent component's state with the filtered data if needed
      this.$parent.filteredApartments = filteredApartments;
    },

    applyFiltersFunction(allApartments, selectedServices) {
      // Use the provided applyFilters function to filter apartments based on selected services
      return allApartments.filter((apartment) => {
        return selectedServices.every((selectedServiceId) => {
          return apartment.services.some((apartmentService) => {
            return apartmentService.id === selectedServiceId;
          });
        });
      });
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
  <div class="dropdown m-5 ">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="servicesDropdown" data-bs-toggle="dropdown"
      aria-haspopup="true" aria-expanded="false">
      Select Services
    </button>
    <div class="dropdown-menu" aria-labelledby="servicesDropdown">
      <div v-for="service in services" :key="service.id" class="form-check">
        <input class="form-check-input" type="checkbox" :id="'serviceCheckbox_' + service.id" v-model="selectedServices"
          :value="service.id" />
        <label class="form-check-label" :for="'serviceCheckbox_' + service.id">
          {{ service.name }}
        </label>
      </div>
      <button class="btn btn-primary" @click="applyFilters">Apply Filters</button>
    </div>
  </div>
</template>
