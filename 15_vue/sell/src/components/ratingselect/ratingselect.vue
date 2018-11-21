<template>
<div class="ratingselect">
  <div class="rating-type border-1px">
    <span class="block positive" v-bind:class="{'active':selectData.selectType===2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
    <span class="block positive" v-bind:class="{'active':selectData.selectType===0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
    <span class="block negative" v-bind:class="{'active':selectData.selectType===1}" @click="select(1,$event)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
  </div>
  <div class="switch" v-bind:class="{'on':selectData.onlyContent}">
    <span class="icon-check_circle" @click="toggleOnlyContent"></span>
    <span class="text">只看有内容的评价</span>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
    const POSITIVE =0 ;
    const NEGATIVE =1 ;
    const ALL =2 ;
    export default {
        name: "ratingselect",
        props:{
          ratings:{
            type:Array,
            default (){
              return [];
            }
          },
          selectData:{
            type:Object,
            default (){
              return {
                selectType:ALL,
                onlyContent:true
              }
            }
          },
          desc:{
            type:Object,
            default (){
              return {
                all:"全部",
                positive:"满意",
                negative:"不满意"
              }
            }
          }
        },
        data(){
          return {

          }
        },
        computed: {
          positives (){
            return this.ratings.filter((rating) => {
              return rating.rateType===POSITIVE;
            })
          },
          negatives () {
            return this.ratings.filter((rating) => {
              return rating.rateType===NEGATIVE;
            })
          }
        },
        methods:{
          toggleOnlyContent (){
              this.selectData.onlyContent=!this.selectData.onlyContent;
          },
          select (type,event){
            console.log("select");
            if(!event._constructed){
              return;
            }
            console.log("select after");
            this.selectData.selectType=type;
          }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7,17,27,0.1))
      font-size:0
      .block
        display: inline-block
        padding:8px 12px
        margin-right:8px
        border-radius: 1px
        color: rgb(77,85,93)
        font-size:12px
        line-height: 16px
        &.active
          color:#fff
        .count
          font-size:8px
          margin-left:2px
        &.positive
          background-color: rgba(0,160,220,0.2)
          &.active
            background-color: rgb(0,160,220)
        &.negative
          background-color: rgba(77,85,93,0.2)
          &.active
            background-color: rgb(77,85,93)


    .switch
      padding:12px 18px
      font-size:0
      line-height: 24px
      border-bottom:1px solid rgba(7,17,27,0.1)
      color: rgb(147,153,159)
      &.on
        .icon-check_circle
          color:#00c850
      .icon-check_circle
        margin-right:4px
        font-size:24px
        display: inline-block
        vertical-align: top
      .text
        font-size:12px
        vertical-align: top

</style>
