<script>
import axios from 'axios';

export default {
    name: 'Apartment',
    data() {
        return {
            apartment: null,

            loading: false,
            loading_page: false,
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
            this.loading_page = true;
            const id = this.$route.params.id
            const data = await axios.get('http://127.0.0.1:8000/api/apartment/' + id)
            this.apartment = data.data.result;
            this.loading_page = false;
            this.$nextTick(() => {
                this.initializeMap();
            });
        },
        initializeMap() {
            const apartment = this.apartment;
            tt.setProductInfo("map", "1.0.0");
            const map = tt.map({
                key: "C1hD0sgXZDUkeMEZv5sG1rcdkSZbr1dX",
                container: "map-" + apartment.id,
                center: [apartment.longitude, apartment.latitude],
                zoom: 16,
            });
            const marker = new tt.Marker({
                color: '#ff385c',
            }).setLngLat([apartment.longitude, apartment.latitude]).addTo(map);
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
            <h2 class="text-center pink my-5">{{ apartment.name }}</h2>



            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">

                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div :id="'map-' + apartment.id"
                                style="width: 80%; height: 400px;border-radius: 15px; margin: 0 auto;"></div>

                        </div>
                    </div>
                </div>
            </div>

            <!-- Immagine principale a sinistra -->
            <div class="row">
                <div class="col-sm-12 col-lg-10 col-xl-6">
                    <img class="image_cover" :src="this.baseUrl + 'storage/' + apartment.cover_image" alt="">

                    <!-- Btn maps & others images -->
                    <div class="d-flex justify-content-between btn_action">
                        <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <h6 class="justify-content-start mt-3 btn btn-pink"><i
                                    class="fa-solid fa-location-dot text-white"></i> {{ apartment.address }} </h6>
                        </a>
                        <!--  <a href="" data-bs-toggle="modal" data-bs-target="#imagesOthersModal">
                            <h6 class="justify-content-end mt-3 btn btn-pink">👉 Show others images </h6>
                        </a> -->
                    </div>


                    <!-- Modal images -->
                    <div class="modal fade" id="imagesOthersModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">

                                <div class="modal-body">

                                    <!-- Carousel images -->
                                    <div class="container w-100 my-5">

                                        <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
                                            <div class="carousel-inner">

                                                <div v-for="image in apartment.images" class="carousel-item">
                                                    <img class="cover_image d-block w-100"
                                                        :src="this.baseUrl + 'storage/' + image.path" alt="Immagine">

                                                </div>

                                            </div>
                                            <button class="carousel-control-prev" type="button"
                                                data-bs-target="#carouselExample" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon bg-black" aria-hidden="true"></span>
                                                <span class="visually-hidden">Previous</span>
                                            </button>
                                            <button class="carousel-control-next" type="button"
                                                data-bs-target="#carouselExample" data-bs-slide="next">
                                                <span class="carousel-control-next-icon bg-black" aria-hidden="true"></span>
                                                <span class="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>




                </div>
                <!-- Immagini aggiuntive a destra, disposte in 2 colonne -->
                <div class="col-sm-12 col-lg-8 col-xl-6 d-sm-none d-md-none d-lg-block pt-4">
                    <div class="row ">
                        <div class="col-6  mb-3" v-for="(image, index) in apartment.images.slice(0, 2)" :key="index">
                            <div class="card border-0 d-flex flex-column">
                                <img :src="this.baseUrl + 'storage/' + image.path" class="img-dx"
                                    alt="Immagine {{ index + 1 }}">
                            </div>
                        </div>

                        <div class="col-6  mb-3" v-for="(image, index) in apartment.images.slice(2, 4)" :key="index">
                            <div class="card border-0 d-flex flex-column">
                                <img :src="this.baseUrl + 'storage/' + image.path" class="img-dx"
                                    alt="Immagine {{ index + 1 }}">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <ul class="py-3 ps-0">
                    <li class="d-inline-block" v-for=" service  in  apartment.services "><span class="ms-2 me-1"> •</span>{{
                        service.name }}</li>
                </ul>
            </div>
            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6 py-3">
                    <h6 style="margin: -2rem 0 0">Description: </h6>
                    <p class="mb-5">{{ apartment.description }}</p>

                    <div class="card-body details_info mx_auto my-3">
                        <div class="d-flex justify-content-between">

                            <div class="card-body d-flex flex-column justify-content-between align-items-start pb-0 ">

                                <h6 class="d-flex align-items-center ">
                                    <img class="me-3"
                                        src="data:image/png;base64,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">
                                    Rooms: {{ apartment.rooms }}
                                </h6>

                                <h6 class="d-flex align-items-center ">
                                    <img class="me-3"
                                        src="data:image/png;base64,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">
                                    Bedrooms: {{ apartment.bedrooms }}
                                </h6>

                                <h6 class="d-flex align-items-center me-1">
                                    <img class="me-3"
                                        src="data:image/png;base64,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">
                                    Max Guests: {{ apartment.max_guests }}
                                </h6>

                            </div>

                            <div class="card-body d-flex flex-column justify-content-between align-items-start pb-0 ms_5">

                                <h6 class="d-flex align-items-center me-4">
                                    <img class="me-3"
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFeUlEQVR4nO2Z708TdxzHOxP3ZM5H2zKXuGR/wNzikz3Yg+3BnuzZWGlYhiZzrQaJ1EWM9Fo2t0FvoD6gmyZI3LIZFxxzw2hbpK0i8kvvKFXpaAu9oxAQLCACvZbetfdZvkdbIPTn9SZ14Z28A7Tfe3+/Lz6f+36vqUy2pS39v4Tp7Xs0OPGjBifuYXqSymQNTtxD46vq+t+WFYJOnoRtGpz4QYMTUQwnIVdrcCKqwUk9ytlUEA1O1KMFaXESmq9S8I9nHiYeBWBiilnnsUkGLINL8Ld9EVrtC9D9YA6aWynhOgFKT+KbBqGt7d+L6QkeLcYxOAuptBwB6JuIgJXm4NYoBzMMn3hv4OGsAIMqo6299+6mgGhwsgn9N1uu0SkhGJaH7vEYhI+DueAqBNLo0ygYfqfibda4KSCYnnSiBXiop0khFsM8dI5xAsRtHwcLy+shhueiwnuXe+Zi7UU83BQQDU5OowVM+YMbIJ6EeOjwrUDcGeNgKbwKgX4bmlmBQG51LMUqQk5vEgjhRwuYnlkP4md4uDm6ssju8QgEuTUQPMDDxyutlgC5Hwch/AUD8miJB1sMom8iItzocUV5gPvT6yEKEmR8YbVdiMkIsNFViEgUwD61ESInkA43vGKlIqU2mj1hodmqFD5uoSOKDifsEAMSv3GR0YLRwuNCQAgsGUTWIO1UZJ+FZpdShWw0+9hKcR/lAtIzHEhcj1oHtVBc4TVniGiQdi/7vpViI9lDxEyxgXZf6K1sQdBC0HVOf0S4mZF8k1PQZXeCedCfcb6MIFaa/StniAQMdzoXEM/sSi/xPA+Gi39AsVorWPFVNdQ12/IDsdCcRzwI254tCOENJFrJ1ksKACXHvoEjdY2gOKoTfKmHzqMiFDsqFsRCsR1itt9Tv1wWQM603BZydI1/Cn/Xp6lKwYGg56jvf70GZbVn4YLNKeTUXDQJIOjncwGy9jRf65rnCWRwjEmc5s81SGts+zV7GDANLQpu9y4nBUGvx8eg8QUJcrqlI7HtnrtOJgVBr8fHxDeEggNp8zCwX6PPCmTfidrCqIjD7e11uL0gtQdcI93PFMTuHtn/X4A4XFRpYhKlkflNaQo+OdwWnD98IyTKZebgvMoUnFWamJpkIACwzeH29khcjS6Um5hEZWQCKlMQpLDSGHSmrIrL9caAe2RUGggv3T/k27VugmcFgoQmd7i8nfm1k7dzA0QMZEQqEJWRsaQDibXZC3aP97MB18gdh9vLZQnAofH33SMl6PqkwQfMi69e9bC268OcPR9fGWJbSs2wU5aDXC7XyzpDU0N1w3l7taFpoxvO29H7aFxWgVaKuyt2x1qzczXLREhegZ2LH3rFyX026zArzZ3JF8RKseWiQNRYbToQuVqbdCdMKpsvvNdCsXwe1Qh2jMLrYkCK1VhlOhBFhe5YToEWmr0kvhrcdzKRkldov0zfWpoDOQWah2GnheYeiDnVW5zwolgQhVpblA7k06PYJzmHtvlgl5XmurKGoNkr3S7IbkdJIflR3YfpWwv7QFRwfz9st1DskWuecDQVQKubDVmpyOcp9/QcVHSk6p30Nzu2R3T4oX7YrjQz0apbITjVtww/kWEwkGGo712G4zdD6OAbl0kkhbrqzXQgJcd0u0WHf3EjuDv9owjDSvU9nqL85I50IPsqK18SHX7IyLyX6XGkrH3pNZlEkqu1bIozhM0rWHWdKcr8XBWQ7Ds8uVrrT14R7HFewQeNTHkmkIOmwMcSgniSVqQCc+cVjD4gZa5ISCkVSHGF9m6KivTlFawyMj9n/OxhCn4tFYhcrW1LAWLOK1hpYi6oTAyVzkoT861UIMVqzFBcoaU2WI0ZpJpjS1uS5a5/AYkON947OwjMAAAAAElFTkSuQmCC">
                                    Bathrooms: {{ apartment.bathrooms }}
                                </h6>

                                <h6 class="d-flex align-items-center me-4">
                                    <img class="me-3"
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD4UlEQVR4nO2YX0xTVxzHb/awJ9/kZTHZHva2ZPNhL8Ys8WF/sknPpWCgVErHkv1LZnzZEnrOHbnYlhZ6L2GR/0OQKRNthWJ7TisUZAgyb9UaY9DIn8ifF4kGC0W2hclZ7rSmUyh16597s36Tz0PvuQ+/T3/nd05ahskmfWERFgEkgc2Q1xi1BCD8JQtJdSwAEgeAOMIi3M+oOSzENoDICoC+dxi1BkBcBBD5kzV5WUatyePwXhbh3wEk3zJqzX4Ov8Eico+F5DijtGg433sA4fIX4LA+9r1CfngHi/ANAMlIIe98lVFaWESMLxyriKwBSIaj7/A8/wpA5ByAeFrDe3IYNQRAUslC/Bsw4Y+fPUPEAhAOs9D3FqMWCQDJH8BENM89H2YRoZsR2znFdiIarQm/y3L4g82Q15hUR1PueX27Id5OQhHJLffujjfEcgDCZU+2CRbT/k0nef9XJnXvt5v3G844Cm72HS2c7q7WXm42f7Q71RJJT8eRTz4cbDPeX71WRR+FquiydIS6xIK7rfy+HNVIyOmuyRtYuWr5WyLK9PnvNo5bNN8w/yEA+fY83f/98YY9aXEK+VKshMziaAX92Z7XnNRhT/UPIdcWIl020MKoKa6siMLiynZEYXH9Xzoy3KrJudStOxl0Gyeuespmg27jrbHTRScCP72/U14/wAd+MDouzZWJv84km1LH2IyhevRGseWCW1sxsO9fiwx1at+UzpZMrc03U7p08hmP5puo1GOYlNd15qEWq3uRCv5wyrB7H9DDP958oLMM/ZKP/K+9lMgpO2gZdxZfX19s/4dEFPn5uFMfKramXkR4is1zn5bYL07lfR94O2GRnjrgmZO4lc0koswFuWVObPCkS0Twh2kNWaIH7SO3tabenQmJnD9WcD0yW7+lhEzkbj1tb4WhdIoI/jA1u+9RnXXIqXoRwR+mX9QFF3KRd1diWyvILccTmZXQMhIazmVCpMI5/7iQH0QJDrs+tL7YscWwd9DxM7q0DrsQg8P3kOqtFwYSP357DJPycRsrsTrXsCH1lKTt+BW24GDVyHjCF6J88Y2dKjoR7C19ciH2lk7In6MXYiZFSmwXpbgiwtFGWtN2OmJv65vfjq/F/kimRD6tCqzGFWk81kGnVmhC1PbdoZkS+cw+mBWhyupIYC3u1qptaKJ17d0biXC41rvxuThCv6obTTsGs+dxXBG14BLy459aasGVFQmprCNLlyspadQveOqLZ5QAadQvyDW9tIjS/nzosoEWuaasCKOmjnTZ2c6z4gEpFqdYcKXTmnuIUUg6rbmH5Jqer1OuPdO1JTV/AZKYyy/zk08ZAAAAAElFTkSuQmCC">
                                    Beds: {{ apartment.beds }}
                                </h6>

                                <h6 class="d-flex align-items-center me-1">
                                    <img class="me-3"
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACX0lEQVR4nO1aPWgUQRSeoIiCERHRSqLYqWCnjWVsFOyOKwN3mbdRsIgS772cOFgel513F0RiocRSq7NaRNBOLSy0UlELFW3EH1ALbVbGZCGnt7s5nN3snfPBa79vP+a+e2/erhD/B8IRiXzCBtMSTzgi8kapdHMdoF6QpO/Z4DM8QLyolFov8kJJqQ2AfAOIQ8tGQkncmZ72N4mscUpd2gzEt41oFkYiztOqvUVkharytwHyg0gwKyNLpR9NnW3uELbh1Xg3ED/vFvtt5BMQ3/nXWubp4jZ6RteeCWrvA9JvewhlX8jvvZp/0IoRQC4D6Z9rYsToIpeFLUjU4xL113xPQ3/30D8mbMOb9Q8B8Ydcwo76M9RaR0RW8P7ISyZGbOYiCZV6c0yifpZRQ3wF9fZekReqyz3FrpGMekcaKjONUUl8QViA4TF8NriGH9i4Ol/zrz1cqzL6Sc8HyOUpah1INWLIzl/uhBev38+9jK7Rj3s2j1pHAfkHkH43WZ/fk2rEkDaDL7mX0Y0zAsiHgfjbit7zskqtnQNlZPKc3g/IH3tMA08mFG8dCCMn63O7JPKbuNHG/JVPKLWx0EbgzNz2qBmnDJu3/ro2F8VIZaYxappmH4PnYtdCoyhGJDL1uJQlX/Jm9fHCGemFviZxZyRwJxK6n1YSXEYCl5HQZSQJLiOBy0joMpIEl5HAZSR0GRmEjMhhuSFW+ryzS+IrhTyRaIsCyE9XYaJT2C3Kyr0WkH4d/8qO7xZ+r5W2aZTEjwdm0xi7+yV+kbr7Leo2XqIej7bxqR8XDM37ETEE+AVmVKsknJUj1QAAAABJRU5ErkJggg==">
                                    Mq: {{ apartment.mq }}
                                </h6>

                            </div>

                        </div>

                        <div class="d-flex justify-content-between">

                            <div class="card-body d-flex flex-column justify-content-center align-items-start pb-0 pt-0">



                            </div>

                        </div>

                    </div>

                </div>




                <div class="col-sm-12 col-md-6 col-lg-6 py-3">
                    <div class="card py-3 px-3" style="border-radius: 15px;">
                        <h3 class="text-center">You're interested?</h3>
                        <span class="text-center" style="color: #ff385c;"><strong>Fill in now and you will be
                                contacted
                                as soon as possible!</strong></span>

                        <form action="" v-on:submit.prevent="sendForm()">
                            <div v-if="!loading">
                                <div class="mb-3">
                                    <label for="name" class="form-label text-uppercase">Name</label>
                                    <input type="text" name="name" id="name" class="form-control" placeholder="Elon Musk"
                                        aria-describedby="nameHelper" v-model="name" :class="{ 'is-invalid': errors.name }">
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
                                        <strong>Errors!</strong>

                                        <ul>
                                            <li v-for="message in errors.message">{{ message }}</li>
                                        </ul>

                                    </div>
                                </div>

                                <button type="submit" class="btn mb-3" :class="{ ' btn-primary w-100': !loading }"
                                    :disabled="loading">
                                    <span v-if="loading">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="bi bi-send" viewBox="0 0 16 16">
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





        <!--  <div :id="'map-' + apartment.id" style="width: 80%; height: 400px;border-radius: 15px; margin: 0 auto;"></div> -->


    </div>
    <div v-else-if="loading_page" class="container_loader">
        <div id="wifi-loader">
            <svg class="circle-outer" viewBox="0 0 86 86">
                <circle class="back" cx="43" cy="43" r="40"></circle>
                <circle class="front" cx="43" cy="43" r="40"></circle>
                <circle class="new" cx="43" cy="43" r="40"></circle>
            </svg>
            <svg class="circle-middle" viewBox="0 0 60 60">
                <circle class="back" cx="30" cy="30" r="27"></circle>
                <circle class="front" cx="30" cy="30" r="27"></circle>
            </svg>
            <svg class="circle-inner" viewBox="0 0 34 34">
                <circle class="back" cx="17" cy="17" r="14"></circle>
                <circle class="front" cx="17" cy="17" r="14"></circle>
            </svg>
            <div class="text" data-text="Loading"></div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
#map {
    width: 800px;
}

.image_cover {
    width: 650px;
    height: 450px;
    max-width: 100%;
}

img {
    border-radius: 15px;
}

.img-dx {
    height: 190px;
}

.my_auto {
    margin: 1rem 0;
}

.btn-pink {
    color: #ffffff;
    background: #ff385c;
}

/* Colors */
.pink {
    color: #ff385c;
}
</style>
