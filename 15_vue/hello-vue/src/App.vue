<template>
  <div id="app">
    <h1 v-text="title"></h1>
    <input v-model="newItem" v-on:keyup.enter="addNewItem">
    <ul>
      <li v-for="item in items" v-bind:class="{finished:item.isFinished}" v-on:click="toggle(item)">
        {{item.label}}
      </li>
    </ul>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Store from './store.js'

export default {
  data:function(){
    return{
      title: 'this is a todo list',
      items:Store.fetch(),
      newItem:""
    }
  },
  methods:{
    toggle:function (item) {
      item.isFinished=!item.isFinished;
    },
    addNewItem:function () {

      this.items.push(
        {
          label:this.newItem,
          isFinished:false
        }
      );

      this.newItem="";
    }
  },
  watch:{
    items:{
      handler:function (items) {
          Store.save(items)
      },
      deep:true
    }
  }
}
</script>

<style>
  .finished{
    text-decoration: line-through;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
