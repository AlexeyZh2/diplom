<template>
    <li class="elements__item">
        <button class="elements__delete"
            type="button"></button>
        <img src="#" alt="Фото"
            class="elements__photo">
        <div class="elements__name-container">
            <h3 class="elements__name"></h3>
            <div class="elements__like-container">
                <button class="elements__button"
                    type="button"></button>
                <p class="elements__like-counter">
                    0</p>
            </div>
        </div>
    </li>
</template>
<script>
export default {
    data: function () {
        return {

            openPopupImage: false,
        }
    },
    methods: {

    },
</script>
<style>
@import '../../public/pages/index.css';
</style>