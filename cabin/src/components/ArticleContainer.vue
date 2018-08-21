<template>
    <article class="post">
        <header>
            <div class="title">
                <h2><a :href="url">{{title}}</a></h2>
            </div>
            <div class="meta">
                <time class="published" :datetime="datetime">{{datetime}}</time>
                <span class="author"></span>
                <p>Read</p>
            </div>
        </header>
        <div id="postbody" v-html="content">
        </div>
        <footer v-if="summary">
            <ul class="actions">
                <li><a :href="url" class="button big">阅读全文</a></li>
            </ul>
            <ul class="stats">
                <li><a :href="categoryUrl">{{category}}</a></li>
                <li><a href="#" class="icon fa fa-heart">{{like}}</a></li>
                <li><a href="#" class="icon fa fa-comment">{{comments}}</a></li>
            </ul>
        </footer>
        <footer v-else>
        </footer>
    </article>
</template>

<script>
export default {
  data: function() {
    return {
        title: "",
        url: "",
        datetime: "1970-01-01 00:00:00",
        content: ""
    };
  },
  props: ["categoryId", "articleId", "summary"],
  created: function() {
      this.like = 0
      this.comments = 0
      this.category = "通用"
      this.categoryUrl = "/#/category"
      this.title = "TEST1111111111111111111111111111111111111111111"
      this.content = `<h2>Go的协程调度</h2>
<p>Golang由于其轻量级线程goroutine的特性得到大家的关注，轻量级线程的出现也使得各种回调加上下文恢复的工作转移到了内置的runtime调度器中，不用程序员自己处理了，极大的降低了程序员的负担，终于可以用同步的思想去写业务逻辑了。</p>
<p>在c++中，网络处理基本都基于iocp(windows)或者epoll(linux)，当然两者一个是proactor，一个是reactor，有所区别，这里不做讨论，但是程序员始终要做的就是处理完某个逻辑，等待数据包读完整，然后再次根据任务的上下文继续做接下来的逻辑。然而在Golang中，你只要把业务逻辑写成一个整体的流程，然后顺序写下来就行，所以在心智负担上，go会减轻很多。</p>
<p>这里简单的记录下golang runtime中的调度器，这个和操作系统调度进程、线程有点儿类似，在这里我们可以简单的探究下golang内部的调度大概是怎样做的。</p>
<p>golang的调度概念中，主要有以下三个角色：</p>
<ul>
<li><p>M</p>
<p>在这里可以简单的看做是操作系统的线程，代码的执行者。</p>
</li>
<li><p>P</p>
<p>在google的实现文档中，它的名字为processor，在调度中，它主要起到实现M:N调度的功能。P主要是记录一些上下文信息，还有本地的G列表。在最早版本的go设计中，只有全局的G列表，用一个全局锁来避免读写冲突，每一个M要获取任务必须得访问该全局列表，造成了性能损耗。新版本中由于P的出现，每个P都有本地的G队列，M获取G任务是无锁的，这个和tcmalloc中的内存分配策略也比较像，一个线程会绑定属于自己线程的cache来做无锁的分配。</p>
</li>
<li><p>G</p>
<p>G代表了一个goroutine的上下文，包含routine的堆栈、代码指针等信息，用于在切换后可以恢复执行现场的功能。</p>
</li>

</ul>
<p>不少文章其实这儿写的不够明白，其实这三个概念比较清晰，线程M始终是执行者，用来执行G，但是不是1:1的关系，M在执行G的时候，必须要获取P，然后再来执行P中的<code>runable G list</code>中的G任务。</p>
<p>在go程序初始化后，有一个参数<code>GOMAXPROCS</code>，也有函数可以自己设置，但是在程序运行中调用会stw，消耗太大，不建议使用。golang早前的版本默认该值为1，现在已经和cpu的核数一致了。</p>
<p>该参数不是M有多少个的意思，其实是P有多少个的意思。在程序执行的初期，1个M会独占一个P，但是M在整个程序的生命周期中，并不是一直和P想到的，大致的关系为Number of P &gt;= Number of M。由于一个M最多对应一个P，而P会有多个G，所以一个M就会对应多个G，M:N也就实现了。</p>
<p>会用golang的都知道，相比c中创建线程需要提供回调函数、栈大小等信息返回一个线程句柄，golang创建一个goroutine是相当的简单：</p>
<pre><code>go func() {
	// Do something
}
</code></pre>
<p>虽然语法简单，但是其实内部的实现和c中创建线程也差不多，也包含将函数、参数压栈并call一个函数来创建goroutine。但是这里创建goroutine就比较简单了，在go的实现中，一定会是某个已经在跑的goroutine中创建的，既然该goroutine在跑，那么肯定属于某一个P，相同地，肯定属于一个操作系统线程，这里也就是M了。所以创建仅仅是简单的创建一个G对象，包含着函数、参数等信息，注意这里的参数是复制一份的，然后简单的push到P的runable G list的尾部，这样创建goroutine的工作就完成了。于是当前P的队列中新增了一个G。</p>
<p>上面讲到了M很有可能会多于P，这种情况在M在执行某个P的G的时候，该G进行了一个系统调用并且没有返回（阻塞），那么调度器会将M与P进行分离，M将直接接管执行系统调用的G，同时会创建或者唤醒休眠的M来绑定之前的P，于是M会比P数量更多。当系统调用完成后，M必须得获取P来执行G，假设没有可用的P，那么会将G放入全局的G队列，同时自身进入休眠状态。</p>
<p>调度还有一个很重要的方面就是偷取任务，这个工作主要是P来进行的。当一些P处于饥饿状态的时候，则会去全局的G队列中取可执行的G，当取完了，则会去别的P的本地队列中偷取一半可执行的G，这里的实现用的是cas，所以性能损耗比较小。</p>
`
  }
};
</script>

<style scoped>
.post {
    margin: 0 0 2em;
    padding: 3em 3em 1em;
    position: relative;
    background: #fff;
    border: 1px solid rgba(160, 160, 160, .3);
}

a {
    text-decoration: none;
    color: rgb(0, 0, 0);
}

header {
    display: flex;
    border-bottom: solid 1px rgba(160, 160, 160, .3);
    left: -3em;
    margin: -3em 0 3em;
    position: relative;
    width: calc(100% + 6em);
}

header .title {
    flex-grow: 1;
    padding: 3.75em 3em 3.3em;
    word-break: break-all;
}

header .title h2 {
    font-weight: 900;
    font-size: 1.5em;
    margin-top: 0;
    text-align: start;
}

header .title>:last-child, header .meta>:last-child {
    margin-bottom: 0;
}

header .meta {
    padding: 3.75em 3em 1.75em;
    min-width: 17em;
    text-align: right;
    width: 17em;
    border-left: solid 1px rgba(160, 160, 160, .3);
}

header .meta>* {
    margin: 0 0 1em;
}

header .meta p {
    opacity: .7;
    color: #000;
    font-size: .7em;
    line-height: 2.5;
    font-weight: 400;
}

header .meta .published {
    color: #3c3b3b;
    display: block;
    font-size: .7em;
    font-weight: 800;
    letter-spacing: .25em;
    margin-top: .5em;
    white-space: nowrap;
    text-size-adjust: 100%;
}

.author {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    border-bottom: 0;
    font-size: .6em;
    font-weight: 400;
}

#postbody {
    text-align: left;
}

footer {
    display: flex;
    align-items: center;
    text-align: start;
}

footer .actions {
    flex-grow: 1;
    list-style: none;
    cursor: default;
    padding-left: 0;
}

ul.actions li:last-child {
    padding-right: 0;
}

ul.actions li {
    display: inline-block;
    padding: 0 1.5em 0 0 ;
    vertical-align: middle;
}

.stats {
    opacity: .7;
    cursor: default;
    list-style: none;
    padding: 0;
    color: rgb(100, 100, 100);
}

.stats li {
    display: inline-block;
    font-size: .6em;
    font-weight: 400;
    line-height: 1;
    margin: 0 0 0 2em;
    padding: 0 0 0 2em;
    border-left: solid 1px rgba(160, 160, 160, .3);
    padding-left: 2em;
}

.stats li:first-child {
    border-left: 0;
    margin-left: 0;
    padding-left: 0;
}

.stats li a:first-child {
    border-bottom: dotted 1px rgba(160, 160, 160, .65);
    color: inherit;
}

a.icon {
    position: relative;
    border-bottom: 0;
    color: inherit;
}

.icon:before {
    margin-right: .75em;
    color: rgba(160, 160, 160, .3);
}

</style>
