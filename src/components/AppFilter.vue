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
        selected_bathrooms: []
      },
      services: [],
      latitude: null,
      longitude: null,
      radius: null,
      radiusSlider: 10,
      isCitySelected: false,
    };
  },
  methods: {

    selected_filtersCount(selectedFilters) {
      return selectedFilters.length;
    },
    async fetchServices() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/service');
        this.services = response.data.result;
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    },
    initializeTomTomSearchBox() {
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

      ttSearchBox.on("tomtom.searchbox.resultselected", (event) => {
        if (event.data && event.data.result && event.data.result.position) {
          var position = event.data.result.position;
          this.latitude = position.lat;
          this.longitude = position.lng;
          this.isCitySelected = true;

          console.log("Latitude:", this.latitude);
          console.log("Longitude:", this.longitude);
        }
      });

      ttSearchBox.on("tomtom.searchbox.resultscleared", () => {
        this.latitude = null;
        this.longitude = null;
        this.isCitySelected = false;
      });

      var searchBoxContainer = document.getElementById("tomtom-searchbox-container");
      searchBoxContainer.appendChild(ttSearchBox.getSearchBoxHTML());
    },
    applyFilters() {
      if (!this.isCitySelected) {
        this.latitude = null;
        this.longitude = null;
        this.isCitySelected = false;


      }

      console.log({
        ...this.selected_filters,
        latitude: this.latitude,
        longitude: this.longitude,
        radius: this.radiusSlider,
      });
      this.$emit('filterSearch', {
        ...this.selected_filters,
        latitude: this.latitude,
        longitude: this.longitude,
        radius: this.radiusSlider,
      });
    },
    reloadPage() {
      window.location.reload();
    }
  },
  mounted() {
    this.initializeTomTomSearchBox();
    this.fetchServices();
  },
};
</script>


<template>
  <!-- Dropdown menu for selecting services -->
  <div class="dropdown m-5 d-flex justify-content-center">
    <div class="dropdown me-3">
      <button class="btn btn-outline-secondary dropdown-toggle ms-3" type="button" id="geoFiltersDropdown"
        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        City
        <span v-if="isCitySelected" class="badge bg-secondary">
          <svg style="fill: white; width: 80%;" xmlns="http://www.w3.org/2000/svg" height="16" width="14"
            viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
            <path
              d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
          </svg></span>
      </button>
      <div style="width: 400px;" class="dropdown-menu px-2" aria-labelledby="geoFiltersDropdown">
        <div id="tomtom-searchbox-container"></div>
        <div class="form-group">

          <input type="hidden" class="form-control" id="latitudeInput" v-model="latitude" placeholder="Enter latitude">
        </div>
        <div class="form-group">

          <input type="hidden" class="form-control" id="longitudeInput" v-model="longitude" placeholder="Enter longitude">
        </div>
        <div class="form-group">
          <div class="form-group">
            <label for="radiusSlider">Radius:</label>
            <input type="range" class="form-range" id="radiusSlider" v-model="radiusSlider" min="1" max="20">
            <span>{{ radiusSlider }} km</span>
          </div>
        </div>
      </div>
    </div>
    <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="servicesDropdown"
      data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Services
      <span v-if="selected_filtersCount(selected_filters.selected_services) > 0" class="badge bg-secondary">{{
        selected_filtersCount(selected_filters.selected_services) }}</span>
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
      <span v-if="selected_filtersCount(selected_filters.selected_rooms) > 0" class="badge bg-secondary">{{
        selected_filtersCount(selected_filters.selected_rooms) }}</span>
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
      <span v-if="selected_filtersCount(selected_filters.selected_bedrooms) > 0" class="badge bg-secondary">{{
        selected_filtersCount(selected_filters.selected_bedrooms) }}</span>
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
      <span v-if="selected_filtersCount(selected_filters.selected_beds) > 0" class="badge bg-secondary">{{
        selected_filtersCount(selected_filters.selected_beds) }}</span>
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
      <span v-if="selected_filtersCount(selected_filters.selected_max_guests) > 0" class="badge bg-secondary">{{
        selected_filtersCount(selected_filters.selected_max_guests) }}</span>
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
      <span v-if="selected_filtersCount(selected_filters.selected_bathrooms) > 0" class="badge bg-secondary">{{
        selected_filtersCount(selected_filters.selected_bathrooms) }}</span>
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
    <button class="btn btn-outline-danger ms-3" @click="reloadPage">Reset Filters</button>







  </div>
</template>
