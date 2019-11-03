<template>
    <div class="wrap">
        <van-swipe :autoplay="3000" indicator-color="white" class="box">
            <van-swipe-item v-for="item in d" :key="item.id" 
            @click="$router.push(`/detail/${item.id}`)"
            >
                <img :src="item.image" alt />
                <p>{{item.title}}</p>
            </van-swipe-item>
        </van-swipe>
        <!-- @touchstart="$router.push(`/detail/${item.id}`)" -->
        <!-- is="router-link" :to="$router.push(`/detail/${item.id}`)" -->
        <!-- <van-swipe :autoplay="3000" indicator-color="white" class="box">
            <van-swipe-item>
                <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=751506784,1715615798&fm=26&gp=0.jpg" alt />
                <p>建筑行业内真正有含金量的大奖有哪些?</p>
            </van-swipe-item>
        </van-swipe> -->
    </div>
</template>
<script>
import API from "../common/js/api";
export default {
    data() {
        return {
            d: []
        };
    },
    mounted() {
        this.$axios({
            url: API.swiper,
            method: "get"
        }).then(res => {
            this.d = res.data.top_stories
        });
    }
};
</script>
<style lang='stylus' scoped>
.wrap {
    margin-top: 0.8rem;
}

.box {
    height: 3rem;
    width: 100vw;
    position relative
}

img {
    height: 3rem;
    width: 100vw;
}
p{
    position absolute
    color $color2
    font-size .35rem
    line-height .5rem
    left .2rem
    bottom 0.4rem
    color #fff
}
</style>