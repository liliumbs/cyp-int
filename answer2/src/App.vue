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
</style>