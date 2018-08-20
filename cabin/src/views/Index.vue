<template>
  <div>
    <nav-header>Header</nav-header>
    <sidebar logoimg="../assets/logo.png"></sidebar>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue"
import Sidebar from "@/components/Sidebar.vue"
export default {
    name: "Index",
    components: {
        NavHeader,
        Sidebar
    }
}
</script>
