<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
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
