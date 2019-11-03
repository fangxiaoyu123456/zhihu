<template>
<div>
    <!-- <div class="list">
        <p> 呵呵哒呵呵哒呵呵哒呵呵哒</p>
        <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3583433020,118316633&fm=26&gp=0.jpg" alt="">
        @touchstart="$router.push(`/detail/${item.id}`)"
        is="router-link" :to="$router.push(`/detail/${item.id}`)"
    </div> -->
    <div class="list" v-for="item in d" :key="item.id" 
    @click="$router.push(`/detail/${item.id}`)"
    >
        <p>{{item.title}}</p>
        <img :src="item.images[0]" alt="">
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
    mounted() {
        this.$axios({
            url:API.nowItem,
            method:"get"
        }).then(res=>{
            this.d = res.data.stories;
        })
    },
    
}
</script>
<style lang='stylus' scoped>
@import '../common/styl/index.styl'
.list{
    width 90%
    margin 0 auto
    height 1.5rem
    border-radius .15rem
    padding .2rem
    margin-bottom .1rem
    background $color2
    p{
        font-size .3rem
        display inline-block
        width 70%
        line-height .4rem
    }
    img{
        width .3rem
        width 1.5rem
        height 1.5rem
        float right
    }
}
</style>