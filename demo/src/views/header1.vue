<template>
<div>
    <div class="header">
        <span class="iconfont icon-xiangshang-copy " @click="$router.go(-1)"></span>
        <span class="iconfont icon-good_active-copy fr"></span>
        <span class="iconfont icon-liuyan fr" @click="$router.push(`/comment/${$route.params.id}`)"></span>
        <span class="iconfont icon-wujiaoxing fr" @click="change"></span>
        <span class="iconfont icon-fenxiang fr"></span>
        <!-- 点赞数 -->
        <i>{{d.popularity}}</i>
        <!-- 评论数 -->
        <b>{{d.comments}}</b>
    </div>
</div>
</template>
<script>
import API from '../common/js/api';
export default {
    data(){
        return {
            d : []
        }
    },
    mounted(){
        var id = this.$route.params.id
        this.$axios({
            url:API.msg + id,
            method:"get"
        }).then(res=>{
            this.d=res.data
        })
    }
}
</script>
<style lang='stylus' scoped>
@import '../common/styl/index.styl';
.header{
    width 85%
    height .8rem
    background $color1
    position absolute
    top 0
    left 0
    padding-left 5%
    padding-right 10%
    line-height .8rem
    z-index 1
    span{
        color $color2
        font-size .4rem
    }
    .fr{
        margin-left .6rem
    }
    i{
        font-size .3rem
        color $color2
        position absolute
        right .12rem
    }
    b{
        font-size .3rem
        color $color2
        position absolute
        right 1.2rem
    }
}
</style>