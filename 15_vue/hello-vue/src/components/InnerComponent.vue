<template>
  <div>
    <slot></slot>
    <h1>我是子组件</h1>
    <p>{{greeting}}</p>

    <input v-model="toOutMsg"  placeholder="请输入">
    <input type="button" value="发消息给父组件" v-on:click="sendToOut">

    <br>收到父组件消息：<br>
    <ul>
      <li v-for="outMsg in outMsgs">
        {{outMsg}}
      </li>
    </ul>

  </div>
</template>

<script>

    export default {
        name: "inner-component",
        data(){
          return {
            greeting: "Greetings from the child-component",
            toOutMsg:"",
          }
        },
      props:["outMsgs"],
      methods:{
        sendToOut:function () {
            this.$emit("inner-speak",this.toOutMsg);
          }
      }
    }
</script>

<style scoped>
</style>
