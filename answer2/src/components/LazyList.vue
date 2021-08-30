<template>
    <div class="wrapper">
        <h4>{{ header }}</h4>
        <transition name="fade">
            <div class="loading" v-show="isLoading && items.length !== maxItems">
                <span class="fa fa-spinner fa-spin"></span> Loading ...
            </div>
        </transition>
        <ul class="list" id="lazy-list">
            <li class="list-item" v-for="{ uid, name } in items" v-text="name" :key="uid"></li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue';

const LazyList = Vue.extend({
    props: ['items', 'isLoading', 'maxItems'],
    data() {
        return {
            header: 'Answer #2 - Lazy Loading'
        };
    },
});

export default LazyList;
</script>

<style scoped>
    #lazy-list {
        height: 300px;
        overflow: auto;
        list-style-type: none;
        margin: 0;
        padding: 0 10px;
        line-height: 20px;
    }

    h4 {
        text-align: center;
        margin: 0 0 35px 0;
        font-weight: 400;
        font-size: 24px;
    }

    .container {
        padding: 40px 80px 15px 80px;
        background-color: #fff;
        border-radius: 8px;
        max-width: 800px;
    }

    .wrapper {
        position: relative;
    }

    .list {
        overflow: auto;
        height: 50vh;
        border: 2px solid #dce4ec;
        border-radius: 5px;
    }

    .list-item {
        margin-top: 1px;
        border-left: none;
        border-right: none;
        border-top: none;
        border-bottom: 2px solid #dce4ec;
    }

    li.list-item:last-of-type {
        border-bottom: none;
    }

    .loading {
        text-align: center;
        position: absolute;
        color: #fff;
        z-index: 9;
        background: #005cb2;
        padding: 8px 18px;
        border-radius: 5px;
        left: calc(50% - 45px);
        top: calc(50% - 18px);
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-to {
        opacity: 0
    }
</style>