<template>
    <comments :toWho="toWho" uri="guestbook"></comments>
</template>

<script>
import Comments from '@/components/Comments.vue'
import api from '@/assets/js/api.js'

export default {
    data: function() {
        return {
            toWho: {}
        }
    },
    components: {
        Comments
    },
    created() {
        let self = this
        api.getSuperAdmin(function(res) {
            if (!res.success) {
                self.$message.warning(res.error)
            } else {
                self.toWho.uid = res.res.uid
                self.toWho.name = res.res.username
                console.log(self.toWho, res.res)
            }
        })
    }
}
</script>

<style scoped>

</style>
