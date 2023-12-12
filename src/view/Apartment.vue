<script>
import axios from 'axios';

export default {
    name: 'Apartment',
    data() {
        return {
            apartment: null
        }
    },
    components: {

    },
    methods: {
        async getApartment() {
            const id = this.$route.params.id
            const data = await axios.get('http://127.0.0.1:8000/api/apartment/' + id)
            console.log(data);
            this.apartment = data.data.result;
        }
    },
    mounted() {
        this.getApartment();
    }
}
</script>

<template>
    <div v-if="apartment">
        <div class="container py-4">
            <h2 class="text-center mt-3" style="margin-bottom: 45px;">{{ apartment.name }}</h2>
            <div>
                <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-sm-3">
                        <div
                            style="border-radius: 20px 0px 0px 20px; background-image: url(https://a0.muscache.com/im/pictures/c89164d3-b5a3-46d5-b355-62238c241170.jpg?im_w=1200);height: 400px;background-size: cover; background-position: 50%;">
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6" style="height: 400px;">
                        <div class="row" style="height: 100%">
                            <div class="col-6 mb-3">
                                <div
                                    style="background-image: url(https://a0.muscache.com/im/pictures/c89164d3-b5a3-46d5-b355-62238c241170.jpg?im_w=1200);height: 100%;background-size: cover; background-position: 50%;">
                                </div>
                            </div>
                            <div class="col-6 mb-3">
                                <div
                                    style="border-radius: 0px 20px 0px 0px; background-image: url(https://a0.muscache.com/im/pictures/05368ed7-e85d-4205-a52e-999c9d361690.jpg?im_w=720);height: 100%;background-size: cover; background-position: 50%;">
                                </div>
                            </div>
                            <div class="col-6">
                                <div
                                    style="background-image: url(https://a0.muscache.com/im/pictures/c89164d3-b5a3-46d5-b355-62238c241170.jpg?im_w=1200);height: 100%;background-size: cover; background-position: 50%;">
                                </div>
                            </div>
                            <div class="col-6">
                                <div
                                    style="border-radius: 0px 0px 20px 0px; background-image: url(https://a0.muscache.com/im/pictures/c89164d3-b5a3-46d5-b355-62238c241170.jpg?im_w=1200);height: 100%;background-size: cover; background-position: 50%;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h3 class="">Where:</h3>
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
                                <li v-for="service in apartment.services">{{ service.name }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 py-3">
                        <div class="card py-3 px-5" style="border-radius: 15px;">
                            <h3 class="text-center">You're interested?</h3>
                            <span class="text-center" style="color: #ff385c;"><strong>Fill in now and you will be contacted
                                    as soon as possible!</strong></span>
                            <form action="">
                                <div class="mb-2 mt-4">
                                    <label for="exampleName" class="form-label">Name</label>
                                    <input type="text" class="form-control" placeholder="Name">
                                </div>
                                <div class="mb-2">
                                    <label for="exampleFormControlInput1" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="exampleFormControlInput1"
                                        placeholder="name.surname@example.com">
                                </div>
                                <div class="mb-2">
                                    <label for="exampleFormControlInput1" class="form-label">Phone</label>
                                    <input type="text" class="form-control" id="exampleFormControlInput1"
                                        placeholder="Your number phone">
                                </div>
                                <div class="mb-2">
                                    <label for="exampleFormControlTextarea1" class="form-label">Leave a message</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                                <button class="btn text-white mt-3" style="background-color: #ff385c;">Send</button>

                            </form>
                        </div>
                    </div>

                </div>

            </div>


        </div>
    </div>
</template>


<style lang="scss" scoped></style>
