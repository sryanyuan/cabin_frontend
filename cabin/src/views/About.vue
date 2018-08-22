<template>
  <div id="wrapper">
    <nav-header>Header</nav-header>
    <div id="main">
      <about-container></about-container>
    </div>
    <sidebar logoimg="../static/my.png"></sidebar>
  </div>
</template>

<script>
import AboutContainer from "@/components/AboutContainer.vue"
import NavHeader from "@/components/NavHeader.vue"
import Sidebar from "@/components/Sidebar.vue"
export default {
    data: function() {
        return {
            articleId: this.$route.params.id,
            summary: false
        }
    },
    components: {
        AboutContainer,
        NavHeader,
        Sidebar
    }
}
</script>

<style scoped>

</style>