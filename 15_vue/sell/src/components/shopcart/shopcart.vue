<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          <transition-group name="dropBall"
            tag:ul
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:after-enter="afterEnter">
            <div v-for="(ball,index) in balls" v-bind:key="index"  class="ball" v-show="ball.show"></div>
          </transition-group>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="{'enough':totalPrice>=minPrice}">
          {{payDesc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "shopcart",
        props:{
          deliveryPrice:{
            type:Number,
            default:0
          },
          minPrice:{
            type:Number,
            default:0
          },
          selectFoods:{
            type:Array,
            default (){
              return [
                {
                  count:1,
                  price:15
                }
              ]
            }
          }
        },
        data (){
          return {
            balls:[
              {
                show:false,
              },
              {
                show:false,
              },
              {
                show:false,
              },
              {
                show:false,
              },
              {
                show:false,
              }
            ],
            dropBalls:[]
          }
        },
        computed:{
            totalPrice (){
              let total=0;
              this.selectFoods.forEach((food) => {
                total+=food.price*food.count;
              });
              return total
            },
            totalCount (){
              let count=0;
              this.selectFoods.forEach((food) => {
                count+=food.count;
              });
              return count;
            },
            payDesc (){
              if(this.totalPrice===0){
                  return "￥"+this.minPrice+"起送";
              }else if(this.minPrice>this.totalPrice){
                  let diff=0;
                  diff=this.minPrice-this.totalPrice;
                  return "还差"+diff+"元起送";
              }else {
                return "去结算";
              }
            }
        },
        methods:{
          dropBall (el){
            console.log("dropBall----->in----->shopcart");
            console.log(el);
            this.balls.forEach((ball) =>{
              if(!ball.show){
                ball.show=true;
                ball.el=el;
                this.dropBalls.push(ball);
                return;
              }
            })
          },
          //过渡钩子函数
          beforeEnter (el){
            console.log("beforeEnter");
            this.dropBalls.forEach((dropBall) => {
              let rect=dropBall.el.getBoundingClientRect();
            //计算开始的位置
              let translateX=rect.left-32;
              let translateY=-(window.innerHeight-rect.top-26);
            //设置
              el.style.webkitTransform="translate3d("+translateX+"px,"+translateY+"px,0)";
              el.style.transform="translate3d("+translateX+"px,"+translateY+"px,0)";
              el.style.display="";
            })
          },
          enter (el){
            console.log("enter");
            //让浏览器重绘
              let rf=el.offsetHeight;
              this.$nextTick(() =>{
                el.style.webkitTransform="translate3d(0,0,0)";
                el.style.transform="translate3d(0,0,0)";
              })
          },
          afterEnter (el){
            console.log("afterEnter");
          }
        }

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .shopcart
    position: fixed
    left:0
    bottom:0
    z-index:50
    width: 100%
    height: 48px
    background-color: #fc8c84
    .content
      display: flex
      background-color: #141d27
      font-size: 0
      color:  rgba(255,255,255,0.4)
      .content-left
        flex :1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin:0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing :border-box
          vertical-align: top
          border-radius:50%
          background-color: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius :50%
            text-align :center
            background-color:#2b343c
            &.highlight
              background-color: rgb(0,160,220)
            .icon-shopping_cart
              line-height:44px
              font-size:24px
              color: #80858a
              &.highlight
                color: rgb(255,255,255)
          .num
            position: absolute
            top:0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background-color: rgb(240,20,20)
            box-shadow : 0 4px 8px 0 rgba(0,0,0,0.4)
          .ball
          &.dropBall
            position :fixed
            left:32px
            bottom:26px
            width: 16px
            height: 16px
            border-radius :50%
            background-color: #00a0dc
            transition: translateX 0.5s linear, translateY 0.5s linear
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          box-sizing :border-box
          border-right:1px solid rgba(255,255,255,0.1)
          font-size: 16px
          font-weight: 700
          padding-right:12px
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          line-height: 24px
          margin:12px 0 0 12px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          background-color: #2b333b
          &.enough
            background-color: #00b43c
            color: #fff

</style>
