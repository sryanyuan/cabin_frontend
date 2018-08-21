<template>
    <section id="sidebar">
        <section id="intro">
            <img :src="logoimg" class="intro-circle" />
            <header>
                <h2>Gocode</h2>
                <p>一处思绪驿站 <i class="fa fa-hand-peace-o"></i></p>
            </header>
            <ul class="icons">
                <li v-for="item in iconLinks" :key="item.id"><a :href="item.link" target="_blank" :title="item.title" :class="item.faIcon"/></li>
            </ul>
        </section>
        <section id="recent-posts">
            <ul class="posts">
                <header>
                    <h3>最近的随笔</h3>
                </header>
                <sidebar-recent-post-item v-for="post in recentPosts.Posts" :url="post.url" :pubDatetime="post.pubDatetime" :title="post.title" :key="post.id" />
                <ul class="actions">
                    <li>
                        <a href="/#/blog" class="button">...查看更多...</a>
                    </li>
                </ul>
            </ul>
        </section>
        <section id="categories">
            <ul class="posts">
                <header>
                    <h3><a href="/#/categories">分一下类</a></h3>
                </header>
                <sidebar-category-item v-for="cate in categories.Categories" :url="cate.url" :name="cate.name" :count="cate.count" :key="cate.id" />
            </ul>
        </section>
        <section class="blurb">
            <h2>关于</h2>
            <p>留一丝思绪于永恒.</p>
            <ul class="actions">
                <li><a href="/#/about" class="button">了解更多</a></li>
            </ul>
        </section>
        <section id="footer">
            <p class="copyright">© sryan's secret cabin</p>
        </section>
    </section>
</template>

<script>
import SidebarRecentPostItem from "@/components/sidebarRecentPostItem.vue"
import SidebarCategoryItem from "@/components/sidebarCategoryItem.vue"
export default {
    data: function() {
        return {
            recentPosts: {Posts: [
                {id: 0, title: "今天是个好天气", url: "Loading", pubDatetime: "1999-09-09 09:09:09"},
                {id: 1, title: "测试一下子", url: "Loading", pubDatetime: "1999-09-09 09:09:09"}
            ]},
            categories: {
                Categories: [
                    {id: 0, name: "生活点滴", url: "/#/category?cat=1", count: 3},
                    {id: 1, name: "技术", url: "/#/category?cat=2", count: 3}
                ]
            },
            iconLinks: [
                {
                    id: 0,
                    faIcon: "fa fa-github",
                    title: "Github",
                    link: "https://github.com/sryanyuan"
                },
                {
                    id: 1,
                    faIcon: "fa fa-weibo",
                    title: "Weibo",
                    link: "https://weibo.com/2215093590"
                }
            ]
        }
    },
    props: ["logoimg"],
    components: {
        SidebarRecentPostItem,
        SidebarCategoryItem
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
    font-family: Raleway,Helvetica,sans-serif;
    color: rgb(0, 0, 0);
    text-align: left;
    letter-spacing: .25em;
}

#intro header h2 {
    font-size: 2em;
    font-weight: 900;
    font-family: Raleway,Helvetica,sans-serif;
    color: #3c3b3b;
    line-height: 1.65;
    letter-spacing: .25em;
    margin: 0 0 1em;
}

#intro .intro-circle {
    border-radius: 50%;
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

ul.posts article header h3 {
    font-size: 12px;
    margin-top: .125em;
    color: #3c3b3b;
    font-family: Raleway,Helvetica,sans-serif;
    font-weight: 800;
    line-height: 1.65;
    margin: 0 0 1em;
}

a {
    opacity: .6;
    color: rgb(0, 0, 0);
}

ul.icons li>* {
    text-decoration: none;
    border: 0;
}

ul.actions {
    list-style: none;
    padding-left: 0;
}

ul.actions a {
    text-decoration: none;
}

#categories header h3 a {
    text-decoration: none;
}

.blurb h2 {
    font-size: .8em;
    margin: 0 0 1.5em;
    letter-spacing: .25em;
}

.blurb p {
    opacity: .65;
    font-size: .9em;
    margin: 0 0 2em;
}

#footer .copyright {
    color: #aaa;
    font-size: .5em;
    font-family: Raleway,Helvetica,sans-serif;
    font-weight: 400;
    letter-spacing: .25em;
}

</style>