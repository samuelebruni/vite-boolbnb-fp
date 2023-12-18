<script>
import axios from 'axios';

export default {
    name: 'AppCard',
    props: {
        apartment: null,
    },
    data() {
        return {
            baseUrl: 'http://127.0.0.1:8000/'
        }
    },
    methods: {
        truncateText(text, maxLength) {
            if (text && text.length > maxLength) {
                return text.slice(0, maxLength) + '...';
            }
            return text || ''; // Return an empty string if text is null or undefined
        }
    }
}
</script>

<template>
    <router-link :to="'/apartment/' + apartment.id">
        <div class="card mb-5 h-100" style="position: relative;">
            <img :src="baseUrl + 'storage/' + apartment.cover_image" class="" alt="..."
                style="border-radius: 5px; height: 100%">
            <div class="badge bg_overlay badge-overlay">
                <h5 class="apartment-name-overlay">{{ truncateText(apartment.name, 20) }}</h5>
                <p class="apartment-address-overlay">{{ truncateText(apartment.address, 30) }}</p>
            </div>
        </div>
    </router-link>
</template>


<style lang="scss" scoped>

.bg_overlay {
    background-color: rgba(255, 255, 255, 0.636);
}
.badge-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
    color: #FF385C;
    text-align: center;
    width: 90%;
}

.apartment-name-overlay,
.apartment-address-overlay {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
}

.apartment-name-overlay {
    margin-top: 0; /* Remove space above the name */
    margin-bottom: 5px;
    /* Add margin between name and address */
}

.apartment-address-overlay {
    margin-top: 0;
    margin-bottom: 10px;
    /* Remove default margin */
}

.card {
    &:hover {
        box-shadow: 0 4px 8px #FF385C, 0 0 16px #FF385C; /* Add box shadow on hover */
        transform: scale(1.05); /* Add magnification effect on hover */
    }
}
</style>