<script>
import axios from 'axios';

export default {
    name: 'Apartment',
    data() {
        return {
            apartment: null,

            loading: false,
            baseUrl: 'http://127.0.0.1:8000/',
            contactsApi: 'api/contacts',
            name: '',
            email: '',
            phone: '',
            message: '',
            apartment_id: '',
            errors: [],
            success: null
        }
    },
    methods: {
        async getApartment() {
            const id = this.$route.params.id;
            const data = await axios.get('http://127.0.0.1:8000/api/apartment/' + id);
            console.log(data);
            this.apartment = data.data.result;
            this.$nextTick(() => {
                this.initializeMap();
            });
        },
        initializeMap() {
            const apartment = this.apartment;

            // Ensure that TomTom Maps API is loaded before using it
            if (typeof tt !== 'undefined' && typeof tt.map === 'function') {
                tt.setProductInfo("map", "1.0.0");
                const map = tt.map({
                    key: "C1hD0sgXZDUkeMEZv5sG1rcdkSZbr1dX", // Replace with your actual API key
                    container: "map-" + apartment.id,
                    center: [apartment.longitude, apartment.latitude],
                    zoom: 16,
                });
                const marker = new tt.Marker({
                    color: '#ff385c',
                }).setLngLat([apartment.longitude, apartment.latitude]).addTo(map);
            } else {
                console.error('TomTom Maps API not available.');
            }
        },
        sendForm() {
            this.loading = true;
            this.errors = [];
            this.success = null
            const payload = {
                apartment_id: this.apartment_id,
                name: this.name,
                email: this.email,
                phone: this.phone,
                message: this.message,
            };
            console.log(payload);
            axios.post(this.baseUrl + this.contactsApi, payload)
                .then(response => {
                    const success = response.data.success
                    if (!success) {
                        console.log(response);
                        console.log(response.data.errors);
                        this.errors = response.data.errors
                    } else {
                        console.log(response);
                        console.log(response.data.message);
                        this.name = ''
                        this.email = ''
                        this.message = ''
                        this.phone = ''

                        this.success = response.data.message
                    }
                    this.loading = false
                })
                .catch(error => {
                    console.error(error.message);
                    console.log(error.response); // Mostra la risposta completa
                    this.loading = false;
                })
        }
    },
    mounted() {
        this.getApartment();
        this.apartment_id = this.$route.params.id;
    }
}
</script>


<template>
    <div v-if="apartment">
        <div class="container px-0 py-4">
            <h2 class="text-center mt-3" style="margin-bottom: 45px;">{{ apartment.name }}</h2>
            <div class="mb-5">
                <div class="d-flex">
                    <div>
                        <img class="rounded-top img-fluid" :src="this.baseUrl + 'storage/' + apartment.cover_image" alt="">
                    </div>

                    <div class="d-flex flex-column">
                        <div class="col-3" v-for="image in apartment.images">

                            <img :src="this.baseUrl + 'storage/' + image.path" style="height: 223px; width: 320px">

                        </div>
                    </div>
                </div>
            </div>

            <h4 class="">{{ apartment.address }}</h4>


            <div :id="'map-' + apartment.id" style="width: 100%; height: 400px;border-radius: 15px;"></div>
            <div class="border-bottom py-3">
                <span>{{ apartment.max_guests }} Ospiti <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" class="bi bi-dot" viewBox="0 0 16 16">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                    </svg></span>
                <span>{{ apartment.bedrooms }} Camere da letto <svg xmlns="http://www.w3.org/2000/svg" width="16"
                        height="16" fill="currentColor" class="bi bi-dot" viewBox="0 0 16 16">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                    </svg></span>
                <span>{{ apartment.beds }} Letti</span>
            </div>
            <div class="py-4">
                <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6 py-3">
                        <p>{{ apartment.description }}</p>
                        <p><strong>Rooms: </strong>{{ apartment.rooms }}</p>
                        <p><strong>Mq: </strong>{{ apartment.mq }}</p>
                        <div>
                            <ul>
                                <li v-for=" service  in  apartment.services ">{{ service.name }}</li>
                            </ul>
                        </div>
                    </div>




                    <div class="col-sm-12 col-md-6 col-lg-6 py-3">
                        <div class="card py-3 px-5" style="border-radius: 15px;">
                            <h3 class="text-center">You're interested?</h3>
                            <span class="text-center" style="color: #ff385c;"><strong>Fill in now and you will be contacted
                                    as soon as possible!</strong></span>

                            <form action="" v-on:submit.prevent="sendForm()">
                                <div v-if="!loading">
                                    <div class="mb-3">
                                        <label for="name" class="form-label text-uppercase">Name</label>
                                        <input type="text" name="name" id="name" class="form-control"
                                            placeholder="Elon Musk" aria-describedby="nameHelper" v-model="name"
                                            :class="{ 'is-invalid': errors.name }">
                                        <small id="nameHelper" class="text-muted">Type your name</small>

                                        <div class="alert alert-danger" role="alert" v-if="errors.name">
                                            <strong>Erorrs!</strong>

                                            <ul>
                                                <li v-for="message in errors.name">{{ message }}</li>
                                            </ul>

                                        </div>

                                    </div>

                                    <div class="mb-3">
                                        <label for="phone" class="form-label  text-uppercase">phone</label>
                                        <input type="tel" name="phone" id="phone" class="form-control" placeholder="123456"
                                            aria-describedby="phoneHelper" v-model="phone"
                                            :class="{ 'is-invalid': errors.phone }">
                                        <small id="phoneHelper" class="text-muted">Type your phone</small>

                                        <div class="alert alert-danger" role="alert" v-if="errors.phone">
                                            <strong>Erorrs!</strong>

                                            <ul>
                                                <li v-for="message in errors.phone">{{ message }}</li>
                                            </ul>

                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="email" class="form-label text-uppercase">email</label>
                                        <input type="text" name="email" id="email" class="form-control"
                                            placeholder="elon@musk.com" aria-describedby="emailHelper" v-model="email"
                                            :class="{ 'is-invalid': errors.email }">
                                        <small id="emailHelper" class="text-muted">Type your email</small>

                                        <div class="alert alert-danger" role="alert" v-if="errors.email">
                                            <strong>Erorrs!</strong>

                                            <ul>
                                                <li v-for="message in errors.email">{{ message }}</li>
                                            </ul>

                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="message" class="form-label">Message</label>
                                        <textarea class="form-control" name="message" id="message" rows="3"
                                            placeholder="Your message here..." v-model="message"
                                            :class="{ 'is-invalid': errors.message }"></textarea>

                                        <div class="alert alert-danger" role="alert" v-if="errors.message">
                                            <strong>Erors!</strong>

                                            <ul>
                                                <li v-for="message in errors.message">{{ message }}</li>
                                            </ul>

                                        </div>
                                    </div>

                                    <button type="submit" class="btn mb-3" :class="{ ' btn-primary w-100': !loading }"
                                        :disabled="loading">
                                        <span v-if="loading">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                                                <path
                                                    d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                            </svg>
                                        </span>
                                        <span v-else>
                                            Send
                                        </span>

                                    </button>
                                </div>
                                <div class="loader text-center py-5" v-else>

                                    <i class="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
                                    <div class="mt-3">
                                        Loading...
                                    </div>


                                </div>




                                <div class="alert alert-success" role="alert" v-if="success">
                                    <strong>
                                        {{ success }}
                                    </strong>
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>
