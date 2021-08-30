<template>
  <div id="app">
    <button @click="onButtonClick()" v-show="!this.showMenu">Click me 😄</button>
    <LazyList
        v-if="this.showMenu"
        v-bind:items="this.items" 
        v-bind:isLoading="this.isLoading" 
        v-bind:maxItems="this.maxItems" 
    />
  </div>
</template>

<script>
    const uniqueId = require('lodash.uniqueid');

    export default {
        data() {
            return {
                showMenu: false,
                isLoading: false,
                nextItem: 1,
                items: [],
                maxItems: 100,
                maxItemsAtLoad: 20,
            };
        },
        updated() {
            // Detecting the selector where the list ends.
            const listElm = document.querySelector('#lazy-list');
            // Adding an event listener on scroll event in order to run loadMore function
            listElm.addEventListener('scroll', e => {
                if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
                    this.loadMore();
                }
            });
        },
        methods: {
            onButtonClick() {
                // Fetch some data when we press on the show button
                this.loadMore();

                this.showMenu = !this.showMenu;
            },
            loadMore () {
                // Set loading state until the data is filled
                this.isLoading = true;

                // This is a fake api call which can be replaced with real data (0.3 sec delay).
                setTimeout(e => {
                    if (this.maxItems > this.items.length && this.isLoading) {
                        for (let i = 0; i < this.maxItemsAtLoad; i++) {
                            this.items = [...this.items, {
                                uid: uniqueId(),
                                name: `List item #${this.nextItem++}`,
                            }];
                        }
                    }

                    this.isLoading = false;
                }, 300);
            }
        }
    };
</script>

<style>
    body {
        background-color: #f2f2f2;
        padding: 50px;
    }

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