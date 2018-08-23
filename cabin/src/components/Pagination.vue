<template>
    <ul class="actions pagination">
        <li>
            <router-link :to="{name: 'blogCategory', query: {page: prevPage}}" :class="buttonClsPrev">上一页</router-link>
        </li>
        <li>
            <router-link :to="{name: 'blogCategory', query: {page: nextPage}}" :class="buttonClsNext">下一页</router-link>
        </li>
    </ul>
</template>

<script>
export default {
    data: function () {
        return {
            
        }
    },
    computed: {
        prevPage: function () {
            let pg = this.page - 1
            return pg < 0 ? 0 : pg
        },
        nextPage: function() {
            return this.page + 1
        },
        buttonClsPrev: function() {
            let res = {
                button: true,
                disabled: this.disablePrevPage()
            }
            return res
        },
        buttonClsNext: function() {
            let res = {
                button: true,
                disabled: this.disableNextPage()
            }
            return res
        }
    },
    created: function() {
        
    },
    methods: {
        disablePrevPage: function () {
            return !this.previous
        },
        disableNextPage: function() {
            return !this.next
        }
    },
    props: ["previous", "next", "category", "page"]
}
</script>

<style scoped>
ul.actions {
    display: flex;
    list-style: none;
    margin-left: 0;
    justify-content: flex-start;
    padding-left: 0;
}

ul.actions>li a {
    text-decoration: none;
}

ul.actions>li:first-child {
    margin-right: 18px;
}

.button.disabled {
    pointer-events: none;
    color: rgba(160, 160, 160, .3) !important;
}
</style>
