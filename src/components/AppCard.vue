<script>

export default {
    name: 'AppCard',
    props: {
        apartment: null,
    },
}
</script>

<template>
    <div class="card mb-5" style="width: 18rem; border: none;">
        <img :src="baseUrl + 'storage/' + apartment.cover_image" class="card-img-top" alt="..."
            style="border-radius: 13px;">
        <div class="card-body">
            <h5 class="card-title">{{ apartment.name }}</h5>
            <p class="card-text">{{ apartment.description }}</p>
            <router-link class="btn text-white" style="background-color: #ff385c;"
                :to="'/apartment/' + apartment.id">Open</router-link>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>