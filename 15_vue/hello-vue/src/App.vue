<template>
  <div id="app">
    <h1>我是父组件</h1>
    <div class="listContainer">
      <h1 v-text="title"></h1>
      <input v-model="newItem" v-on:keyup.enter="addNewItem">
      <ul>
        <li v-for="item in items" v-bind:class="{finished:item.isFinished}" v-on:click="toggle(item)">
          {{item.label}}
        </li>
      </ul>
    </div>

    <div class="outContainer">
      <input v-model="toInnerMsg" placeholder="请输入">
      <input type="button" value="发消息给子组件" v-on:click="sendToInner">
      <br>收到子组件消息：<br>
        <ul>
          <li v-for="innerMsg in innerMsgs">
            {{innerMsg}}
          </li>
        </ul>
    </div>
    <inner-component class="innerContainer" v-bind:outMsgs="outMsgs" v-on:inner-speak="receiveInnerSpeak">
      <h1>inner-component</h1>
    </inner-component>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Store from './store.js'
import InnerComponent from './components/InnerComponent'

export default {

  data:function(){
    return{
      title: 'this is a todo list',
      items:Store.fetch(),
      newItem:"",
      toInnerMsg:"",
      innerMsgs:[],
      outMsgs:[]
    }
  },
  components:{InnerComponent},
  methods:{
    toggle:function (item) {
      item.isFinished=!item.isFinished;
    },
    addNewItem:function () {
      console.log("addNewItem=");
      this.items.push(
        {
          label:this.newItem,
          isFinished:false
        }
      );
      this.newItem="";
    },

    //收到inner组件发来的消息
    receiveInnerSpeak:function(msg){
      this.innerMsgs.push(msg||"");
    },

    //给inner组件发消息
    sendToInner:function () {
      this.outMsgs.push( this.toInnerMsg);
    }

  },

  watch:{
    items:{
      handler:function (items) {
          Store.save(items)
      },
      deep:true
    },
    innerMsgs:{
      handler:function (items) {
        console.log("innerMsgs");
      },
      deep:true
    }
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  ul>li{
    list-style: none;
  }
  #app{
    width: 600px;
    background-color: #9da0a4;
    padding: 60px;
  }

  .listContainer{
    margin: 10px auto;
    background-color: hotpink;
    border: 1px solid #000;
  }

  .outContainer{
    margin: 10px auto;
    background-color: #eeeeee;
    border: 1px solid #000;
    padding: 30px 0;
  }

  .innerContainer{
    width: 100%;
    background-color: #63a35c;
    text-align: center;
    border: 1px dashed #000;
    margin:0 auto;
    padding: 30px 0;
  }

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
