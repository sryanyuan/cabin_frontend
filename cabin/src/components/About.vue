<template>
    <about-container></about-container>
</template>

<script>
import AboutContainer from "@/components/AboutContainer.vue"
export default {
    data: function() {
        return {
            articleId: this.$route.params.id,
            summary: false
        }
    },
    components: {
        AboutContainer
    }
}
</script>

<style scoped>

</style>