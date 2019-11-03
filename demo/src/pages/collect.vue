<template>
    <div class="wrap">
        <div class="header">
            <span>
                <van-icon name="wap-nav" />
            </span>
            <h1>2条收藏</h1>
        </div>

        <!-- <div class="list" @touchstart="$router.push(`/detail/${item.id}`)">
            <p>呵呵哒呵呵哒呵呵哒呵呵哒</p>
            <img
                src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3583433020,118316633&fm=26&gp=0.jpg"
                alt
            />
        </div> -->
        <div v-for="eve in d" :key="eve.id">
            <div class="list" @touchstart="$router.push(`/detail/${eve.id}`)">
                <p>{{eve.title}}</p>
                <img :src="eve.images[0]" alt />
            </div>
        </div>
    </div>
</template>
<script>
import API from "../common/js/api";
import vItem from '../views/item'
export default {
    data() {
        return {
            d: JSON.parse(localStorage.getItem("arr"))
        };
    },
    mounted() {
        // console.log(this.$store.state.path)
        // this.d = localStorage.getItem("arr");
        console.log(this.d)

    }
};
</script>
<style lang='stylus' scoped>
@import '../common/styl/index.styl';

h1 {
    height: 0.7rem;
    line-height: 0.7rem;
    font-size: 0.3rem;
    padding-left: 0.2rem;
}

.wrap {
    background: #F4F4F4;
    height: 100vh;
}

// .top{
// margin-top .8rem
// }
.header {
    background: $color1;
    width: 100vw;
    height: 0.8rem;
    text-align: center;
    line-height: 0.8rem;
    color: $color2;
    z-index: 1;

    span {
        position: absolute;
        left: 0.2rem;
        font-size: 0.4rem;
    }
}

.box {
    width: 100%;
    margin-top: 0.8rem;
}

.list {
    width: 90%;
    margin: 0 auto;
    height: 1.5rem;
    border-radius: 0.15rem;
    padding: 0.2rem;
    margin-bottom: 0.1rem;
    background: $color2;

    // margin-top 0.8rem
    p {
        font-size: 0.3rem;
        display: inline-block;
        width: 70%;
        line-height: 0.4rem;
    }

    img {
        width: 0.3rem;
        width: 1.5rem;
        height: 1.5rem;
        float: right;
    }
}
</style>