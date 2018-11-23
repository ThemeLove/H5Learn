<template>
  <div>
    <v-header v-bind:seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import VHeader from './components/header/V-Header.vue'
  import goods from './components/goods/goods'
  import ratings from './components/ratings/ratings'
  import seller from 'components/seller/seller'
  import {urlParse} from "./common/js/util.js"

  const ERR_OK = 0;//接口状态码
  export default {
    data(){
      return {
        seller:{
          id: (() => {//这里定义了一个自执行函数，用于初始化的时候执行一次给id属性赋值，如果是普通方法的话就不会被调用，id就为undefined,所以一定要用自执行函数
            let queryParam=urlParse();
            return queryParam.id;
          })()
        }
      }
    },
    created(){
      this.$http.get('/api/seller?id='+this.seller.id).then((response) => {
        response=response.body;
        if(response.errno===ERR_OK){
          // this.seller=response.data;//这样直接赋值会直接替换原seller对象，其在data中定义的id属性会丢失
          this.seller=Object.assign({},this.seller,response.data);//扩展原seller对象的属性，这样其在data中定义的id属性不会丢失
        }
      });
    },
    components:{
      "v-header":VHeader,
      "goods":goods,
      "ratings":ratings,
      "seller":seller
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  .tab
    display:flex
    width:100%
    height:40px
    line-height 40px
    border-1px:rgba(7,17,27,0.1)
    .tab-item
      flex:1
      text-align: center
      &>a
        display :block
        font-size 14px
        color: rgb(77,85,93)
        &.active
          color:rgb(240,20,20)

</style>
