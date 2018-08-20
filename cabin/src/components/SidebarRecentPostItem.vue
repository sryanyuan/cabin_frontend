<template>
    <li>
        <article>
            <header>
                <h3>
                    <a :href="url">{{title}}</a>
                </h3>
                <time class="published" :datetime="pubDatetime">{{pubDatetime}}</time>
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
    props: ["url", "pubDatetime", "title"]
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: #3c3b3b;
    font-family: Releway, Helvetica, sans-serif;
    font-size: 12px;
}

a {
  transition: color .2s ease,border-bottom-color .2s ease;
}

a:hover {
  color: #2ebaae !important;
  border-bottom-color: transparent;
}

a:hover:before {
  color: #2ebaae !important;
}

time {
    opacity: .65;
    font-family: Releway,Helvetica,sans-serif;
    font-size: 12px;
    display: block;
    font-size: .6em;
    font-weight: 400;
    margin: -.625em 0 1.7em;
}

</style>