<script>
import { emitter } from '../eventBus';

export default {
    name: 'AppHeader',
    data() {
        return {
            searchTerm: '', // Add a variable to store the search term
        };
    },
    methods: {
        handleSearch() {
            console.log('Search button clicked');
            console.log('Search term:', this.searchTerm);

            emitter.emit('searchTermChanged', this.searchTerm)
        },
    },

};
</script>


<template>
    <header class="navbar navbar-dark sticky-top bg-white flex-nowrap p-2 border-bottom" style="height:80px">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/"><img class="img-fluid"
                src="../assets/image/boolbnb (4).png" style="width: 150px;" alt=""></a>

        <div class="col nomobile pt-3">
            <div class="input-group mb-3 rounded-pill border border-danger">
                <!-- Use v-model for two-way binding -->
                <input v-model="searchTerm" @keyup.enter="handleSearch" type="text"
                    class="form-control rounded-pill border border-0" placeholder="Type the city or the apartment name"
                    aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button @click="handleSearch" class="btn btn-danger rounded-pill d-flex align-items-center" type="button"
                    id="button-addon2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                        viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="col-md-3 col-lg-2 d-flex justify-content-end pe-5 ">
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar">
                <div class="badge rounded-pill text-bg-white border border-danger p-2 px-3">
                    <div class="badge rounded-pill text-bg-danger me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-list" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-person text-dark" viewBox="0 0 16 16">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
                    </svg>
                </div>
            </button>
        </div>


        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                    Menu
                </h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li class="nav-item">
                        <a class="nav-link active text-dark" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link text-dark dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">Login/Register</a>
                        <div class="dropdown-menu" aria-labelledby="dropdownId">
                            <a class="dropdown-item text-dark" href="http://127.0.0.1:8000/login">Login</a>
                            <a class="dropdown-item" href="http://127.0.0.1:8000/register">Register</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </header>
</template>


<style lang="scss" scoped>
.logo {
    width: 100%;
    height: 150px;

    display: block;

    & img {

        width: 200px;
        height: 150px;

    }

}

.site_nav {
    height: 150px;
}

.h_100px {
    height: 100px;
}


@media screen and (max-width: 580px) {
    .nomobile {
        display: none;
    }

    .img {
        width: 300px;
        height: 300px;
    }
}
</style>