<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left" @click="toggleListShow">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
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
    <transition-group
      name="dropBall"
      tag:ul
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter">
      <div v-for="(ball,index) in balls"  v-bind:key="index"  class="ball" v-show="ball.show"></div>
    </transition-group>
    <div class="shopcart-list" v-show="listShow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty">清空</span>
      </div>
      <div class="list-content" ref="list-content">
        <ul>
          <li class="food" v-for="food in selectFoods">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>￥{{food.price*food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from "components/cartcontrol/cartcontrol";
  import BScroll from "better-scroll";

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
                isDrop:false
              },
              {
                show:false,
                isDrop:false
              },
              {
                show:false,
                isDrop:false
              },
              {
                show:false,
                isDrop:false
              },
              {
                show:false,
                isDrop:false
              }
            ],
            toggleList:false
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
            },
            listShow(){
              if(!this.totalCount){
                  return false;
              }
              return this.toggleList;
            }
        },
        methods:{
          dropBall (target){
            console.log("dropBall----->in----->shopcart");
            console.log(target);
            for (let i = 0; i < this.balls.length; i++) {
              let ball=this.balls[i];

              if(!ball.show){
                ball.show=true;
                ball.target=target;
                return;
              }
            }
          },
          //过渡钩子函数
          beforeEnter (el){
            console.log("beforeEnter");

            for (let i = 0;i<this.balls.length; i++) {
              let ball=this.balls[i];
              if(ball.show&&!ball.isDrop){//如果找到了
                ball.isDrop=true;
                console.log(ball);
                el["dropBall"]=ball;
                let rect=ball.target.getBoundingClientRect();
                //计算开始的位置
                let translateX=rect.left-32;
                let translateY=-(window.innerHeight-rect.top-30);
                console.log("translateX="+translateX);
                console.log("translateY="+translateY);
                //设置
                // el.style.transition="translateX 0.5s linear, translateY 0.5s cubic-bezier(0.49,-0.29,0.75,0.41)";
                // el.style.transition="all 0.5s linear";
                el.style.transition="all 0.5s cubic-bezier(0.49,-0.29,0.75,0.41)";
                let transformStr="translate3d("+translateX+"px,"+translateY+"px,0)";
                console.log(transformStr);
                el.style.webkitTransform=transformStr;
                el.style.transform=transformStr;
                el.style.display="";
                return;
              }
            }
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
            let ball=el.dropBall;
            ball.show=false;
            ball.isDrop=false;
            ball.target=null;
            el.dropBall=null;
            el.style.display="";
            this.balls.push(this.balls.shift());//删除数组的第一个元素再放到数组的末尾
            console.log(this.balls);
          },
          toggleListShow (){
            this.toggleList=!this.toggleList;
          }
        },
      components:{
          "cartcontrol":cartcontrol,
      }

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

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
    .ball
      position :fixed
      left:32px
      bottom:26px
      width: 16px
      height: 16px
      border-radius :50%
      background-color: #00a0dc
      text-align :center
      line-height :16px
      color: #fff
      display:""
      transition: translate3dX 0.5s linear, translate3dY 0.5s cubic-bezier(0.49,-0.29,0.75,0.41)
    .shopcart-list
      position :fixed
      left: 0
      bottom:48px
      width: 100%
      overflow :hidden
      .list-header
        width: 100%
        height: 40px
        vertical-align :middle
        text-align :center
        background-color: #f3f5f7
        border-bottom:1px solid rgba(7,17,27,0.1)
        .title
          padding:0 18px
          line-height:40px
          font-size:14px
          font-weight :200
          color: rgb(7,17,27)
          float: left
        .empty
          padding:0 18px
          line-height:40px
          font-size:14px
          font-weight :200
          color: rgb(0,160,220)
          float: right
      .list-content
        max-height :241px
        width: 100%
        padding-right :18px
        background-color: #fff
        .food
          position :relative
          height :48px
          box-sizing :border-box
          margin: 0 18px
          background-color: white;
          border-1px(rgba(7,17,27,0.1))
          .name
            line-height: 48px
            font-size:14px
            font-weight:200
            color: rgb(7,17,27)
          .price
            position :absolute
            right :100px
            top:0
            span
              line-height: 48px
              font-size:14px
              font-weight:700
              color: rgb(240,20,20)
          .cartcontrol-wrapper
            position: absolute
            right :0
            top: 6px

            vertical-align :middle
            text-align :center




</style>
