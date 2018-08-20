<template>
    <section id="sidebar">
        <section id="intro">
            <img :src="logoimg" class="intro-circle" />
            <header>
                <h2>Gocode</h2>
                <p>一处思绪驿站</p>
            </header>
            <ul class="icons">
                <li>W</li>
                <li>G</li>
            </ul>
        </section>
        <section id="recent-posts">
            <ul class="posts">
                <header>
                    <h3>最近的随笔</h3>
                </header>
                <sidebar-recent-post-item v-for="post in recentPosts.Posts" :url="post.url" :pubDatetime="post.pubDatetime" :title="post.title" :key="post.id" />
            </ul>
        </section>
    </section>
</template>

<script>
import SidebarRecentPostItem from "@/components/sidebarRecentPostItem.vue"
export default {
    data: function() {
        return {
            recentPosts: {Posts: [
                {id: 0, title: "Loading", url: "Loading", pubDatetime: "1999-09-09 09:09:09"},
                {id: 1, title: "Loading", url: "Loading", pubDatetime: "1999-09-09 09:09:09"}
            ]}
        }
    },
    props: ["logoimg"],
    components: {
        SidebarRecentPostItem
    }
}
</script>

<style scoped>
#sidebar>:first-child {
    border-top: 0;
    margin-top: 0;
    padding-top: 0;
}

#sidebar>* {
    border-top: solid 1px rgba(160, 160, 160, .3);
    margin: 3em 0 0;
    padding: 3em 0 0;
    text-align: left;
}

#sidebar {
    margin-right: 3em;
    min-width: 22em;
    width: 22em;
    margin-left: 0;
}

header h3 {
    font-size: 16px;
}

ul.icons {
    cursor: default;
    padding-left: 0;
    list-style: none;
}

ul.icons li {
    display: inline-block;
    padding: 0 1em 0 0;
}

#intro header p {
    font-size: .8em;
    opacity: .6;
    line-height: 2.5;
    margin-top: -1em;
    font-weight: 400;
    font-family: Releway,Helvetica,sans-serif;
    margin: 0 0 2em;
    color: rgb(0, 0, 0);
    text-align: left;
}

#intro header h2 {
    font-size: 2em;
    font-weight: 900;
    font-family: Releway,Helvetica,sans-serif;
    color: #3c3b3b;
    line-height: 1.65;
    letter-spacing: .25em;
    margin: 0 0 1em;
}

ul li {
    padding-left: .5em;
}

ul.posts {
    padding: 0;
    list-style: none;
}

ul.posts li {
    border-top: dotted 1px rgba(160, 160, 160, .3);
    margin: 1.5em 0 0;
    padding: 1.5em 0 0;
}

ol, ul {
    margin: 0 0 2em;
}

ul.posts article {
    display: flex;
}

ul.posts article header h3 {
    font-size: 12px;
    margin-top: .125em;
    color: #3c3b3b;
    font-family: Raleway,Helvetica,sans-serif;
    font-weight: 800;
    line-height: 1.65;
    margin: 0 0 1em;
}

</style>