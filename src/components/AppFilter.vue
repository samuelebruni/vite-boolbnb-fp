<script>
import axios from 'axios';

export default {
  name: 'AppFilter',
  data() {
    return {
      filters: {
        bathrooms: null,
        rooms: null,
        guests: null,
        squareMeters: null,
        beds: null,
      },
    };
  },
  methods: {
    async applyFilters() {
      // Costruisci l'URL dell'API con i parametri di filtro
      const apiUrl = 'http://127.0.0.1:8000/api/apartment';
      const params = {
        bathrooms: this.filters.bathrooms,
        rooms: this.filters.rooms,
        guests: this.filters.guests,
        squareMeters: this.filters.squareMeters,
        beds: this.filters.beds,
      };

      try {
        // Effettua la richiesta all'API con i parametri di filtro
        const response = await axios.get(apiUrl, { params });

        // Aggiorna la lista degli appartamenti con i risultati filtrati
        this.$emit('updateApartments', response.data.result);
      } catch (error) {
        console.error('Errore nella richiesta API:', error);
      }

      // Chiudi la modale dopo l'applicazione dei filtri
      $('#filter').modal('hide');
    },
  },
};

</script>
  
<template>
    <!-- Modal -->
    <div class="modal fade" id="filter" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Filtri</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- Campi del filtro -->
                    <div class="mb-3">
                        <label for="bathrooms" class="form-label">Bagni</label>
                        <input type="number" class="form-control" id="bathrooms" v-model="filters.bathrooms">
                    </div>

                    <div class="mb-3">
                        <label for="rooms" class="form-label">Stanze</label>
                        <input type="number" class="form-control" id="rooms" v-model="filters.rooms">
                    </div>

                    <div class="mb-3">
                        <label for="guests" class="form-label">Ospiti</label>
                        <input type="number" class="form-control" id="guests" v-model="filters.guests">
                    </div>

                    <div class="mb-3">
                        <label for="squareMeters" class="form-label">Metri Quadrati</label>
                        <input type="number" class="form-control" id="squareMeters" v-model="filters.squareMeters">
                    </div>

                    <div class="mb-3">
                        <label for="beds" class="form-label">Letti</label>
                        <input type="number" class="form-control" id="beds" v-model="filters.beds">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                    <button type="button" class="btn btn-primary" @click="applyFilters">Applica filtri</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
  
<style scoped>
/* Aggiungi stili specifici al tuo componente se necessario */
</style>