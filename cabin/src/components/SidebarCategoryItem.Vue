<template>
    <li>
        <article>
            <header>
                <router-link :to="{name: 'blogCategory', params: {id: categoryId}, query: {page: 0}}">{{name}}</router-link>
                <span style="float:right;">{{count}}</span>
            </header>
        </article>
    </li>
</template>

<script>
export default {
    data: function() {
        return {

        }
    },
    props: ["name", "count", "categoryId"]
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: #3c3b3b;
    font-family: Releway, Helvetica, sans-serif;
    font-size: 16px;
}

header>:last-child {
    margin-bottom: 0;
}

header {
    opacity: .65;
}

</style>