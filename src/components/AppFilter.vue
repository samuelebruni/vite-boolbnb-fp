<script>
import axios from 'axios';

export default {
  name: 'AppFilter',
  data() {
    return {
      selected_filters: {
        selected_services: [],
        selected_rooms: [],
        selected_bedrooms: [],
        selected_beds: [],
        selected_max_guests: [],
        selected_bathrooms: [],
      },
      services: [],
      selectedLatitude: '',
      selectedLongitude: '',
      selectedRadius: 10,
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

      // Pass latitude, longitude, and filters to the parent component
      this.$emit('filterSearch', {
        latitude: this.selectedLatitude,
        longitude: this.selectedLongitude,
        radius: this.selectedRadius,
        filters: this.selected_filters,
      });
    },
    selectedFiltersCount(filterType) {
      return this.selected_filters[filterType].length;
    },
  },
  mounted() {
    this.fetchServices();

    // TomTom SearchBox implementation
    var options = {
      searchOptions: {
        key: "C1hD0sgXZDUkeMEZv5sG1rcdkSZbr1dX",
        language: "en-GB",
        limit: 5,
      },
      autocompleteOptions: {
        key: "C1hD0sgXZDUkeMEZv5sG1rcdkSZbr1dX",
        language: "en-GB",
      },
    };

    var ttSearchBox = new tt.plugins.SearchBox(tt.services, options);

    // Add an event listener for the onObjectSelection event
    ttSearchBox.on("tomtom.searchbox.resultselected", (event) => {
      // Log the entire result object to the console for inspection
      console.log("Result Object:", event.data.result);

      // Check if the selected object has coordinates
      if (event.data && event.data.result && event.data.result.position) {
        var position = event.data.result.position;

        // Update the selected latitude and longitude
        this.selectedLatitude = position.lat;
        this.selectedLongitude = position.lng;

        // Log the latitude and longitude to the console
        console.log("Latitude:", this.selectedLatitude);
        console.log("Longitude:", this.selectedLongitude);
      }
    });

    var searchBoxContainer = document.getElementById("tomtom-searchbox-container");
    searchBoxContainer.appendChild(ttSearchBox.getSearchBoxHTML());
  },
};


</script>

<template>
  <!-- Dropdown menu for selecting services -->
  <div class="dropdown m-5 d-flex justify-content-center">
    <div>
      <button class="btn btn-outline-secondary dropdown-toggle me-3" type="button" id="cityDropdown"
        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        City
      </button>
      <div class="dropdown-menu px-2" aria-labelledby="roomsDropdown">
        <!-- Add these input fields to your template -->
        <div id="tomtom-searchbox-container"></div>

        <input type="text" v-model="selectedLatitude" placeholder="Enter Latitude">
        <input type="text" v-model="selectedLongitude" placeholder="Enter Longitude">
        <div class="ms-3">
          <label for="radiusSlider" class="form-label">Radius: {{ selectedRadius }} km</label>
          <input id="radiusSlider" type="range" min="1" max="20" v-model="selectedRadius" class="form-range"
            @input="updateRadius" />
        </div>
      </div>
    </div>
    <div>
      <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="servicesDropdown"
        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Services <span v-if="selectedFiltersCount('selected_services') > 0" class="badge bg-secondary">{{
          selectedFiltersCount('selected_services') }}</span>
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
    </div>
    <div>
      <button class="btn btn-outline-secondary dropdown-toggle ms-3" type="button" id="roomsDropdown"
        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Rooms <span v-if="selectedFiltersCount('selected_rooms') > 0" class="badge bg-secondary">{{
          selectedFiltersCount('selected_rooms') }}</span>
      </button>
      <div class="dropdown-menu px-2" aria-labelledby="roomsDropdown">
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
    </div>
    <button class="btn btn-outline-secondary dropdown-toggle ms-3" type="button" id="bedroomsDropdown"
      data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Bedrooms <span v-if="selectedFiltersCount('selected_bedrooms') > 0" class="badge bg-secondary">{{
        selectedFiltersCount('selected_bedrooms') }}</span>
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
    <button class="btn btn-outline-secondary dropdown-toggle ms-3" type="button" id="bedsDropdown"
      data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Beds <span v-if="selectedFiltersCount('selected_beds') > 0" class="badge bg-secondary">{{
        selectedFiltersCount('selected_beds') }}</span>
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
    <button class="btn btn-outline-secondary dropdown-toggle ms-3" type="button" id="maxGuestsDropdown"
      data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Max Guests <span v-if="selectedFiltersCount('selected_max_guests') > 0" class="badge bg-secondary">{{
        selectedFiltersCount('selected_max_guests') }}</span>
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
    <button class="btn btn-outline-secondary dropdown-toggle ms-3" type="button" id="bathroomsDropdown"
      data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Bathrooms <span v-if="selectedFiltersCount('selected_bathrooms') > 0" class="badge bg-secondary">{{
        selectedFiltersCount('selected_bathrooms') }}</span>
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

