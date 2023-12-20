<script>

export default {
    name: 'AppCardSponsored',
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
            <span class="badge rounded-pill  badge-sponsored">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stars"
                    viewBox="0 0 16 16">
                    <path
                        d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                </svg>
                <span>Sponsored</span>
            </span>
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
    margin-top: 0;
    /* Remove space above the name */
    margin-bottom: 5px;
    /* Add margin between name and address */
}

.apartment-address-overlay {
    margin-top: 0;
    margin-bottom: 10px;
    /* Remove default margin */
}

.badge-sponsored {
    position: absolute;
    background-color: #ff385ddc;
    top: 8%;
    right: -11%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;

    svg {
        fill: white; // Adjust the fill color of the star icon
        width: 10px; // Adjust the width of the star icon
        height: 10px; // Adjust the height of the star icon
        margin-right: 4px; // Add a small margin between the icon and text
    }

    span {
        font-size: 8px; // Adjust the font size of the "Sponsored" text
    }
}

.card {
    &:hover {
        box-shadow: 0 4px 8px #FF385C, 0 0 16px #FF385C;
        /* Add box shadow on hover */
        transform: scale(1.05);
        /* Add magnification effect on hover */
    }
}
</style>