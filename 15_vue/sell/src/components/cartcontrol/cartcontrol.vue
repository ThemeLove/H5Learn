<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart($event)"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue'

    export default {
        name: "cartcontrol",
        props:{
          food:{
            type:Object
          }
        },
        created(){
          // console.log(this.food);
        },
        methods:{
          addCart(event){
            if(!event._constructed){
              return;
            }
            console.log("addCart");
            if(!this.food.count){
              Vue.set(this.food,"count",1);
            }else{
              this.food.count++;
            }
            console.log("cartcontrol");
            console.log(event.target);
            this.$emit("add-cart",event.target);
          },
          decreaseCart(event){
            if(!event._constructed){
              return;
            }
            console.log("decreaseCart");
            if(this.food.count){
              this.food.count--;
            }
          }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
      font-size:0
      .cart-decrease
        display: inline-block
        line-height: 24px
        padding:6px
        font-size: 24px
        color: rgb(0,160,220)
        //进入动画
        &.move-enter
          opacity:0
          transform:translate3d(44px,0,0) rotate(0deg)
        &.move-enter-active,&.move-leave-active
          transition: all 0.5s
        &.move-enter-to
          opacity:1
          transform:translate3d(0,0,0) rotate(360deg)

        //退出动画
        &.move-leave
           opacity:1
           transform:translate3d(0,0,0) rotate(0deg)
        &.move-leave-to
          opacity:0
          transform:translate3d(44px,0,0) rotate(-360deg)
      .cart-count
        display: inline-block
        vertical-align: top
        padding-top: 6px
        line-height: 24px
        text-align: center
        font-size: 10px
        color: rgb(147,153,159)
        min-width :20px
      .cart-add
        display: inline-block
        line-height: 24px
        padding:6px
        font-size: 24px
        color: rgb(0,160,220)


</style>
