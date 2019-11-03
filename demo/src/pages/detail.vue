<template>
    <div>
        <!-- <v-header></v-header> -->
        <div class="header">
            <span class="iconfont icon-xiangshang-copy" @click="$router.go(-1)"></span>
            <span class="iconfont icon-good_active-copy fr"></span>
            <span
                class="iconfont icon-liuyan fr"
                @click="$router.push(`/comment/${$route.params.id}`)"
            ></span>
            <span
                class="iconfont icon-wujiaoxing fr"
                :class="[isActive?'yellow':'blue']"
                @click="change"
            ></span>
            <span class="iconfont icon-fenxiang fr"></span>
            <!-- 点赞数 -->
            <i>{{data.popularity}}</i>
            <!-- 评论数 -->
            <b>{{data.comments}}</b>
        </div>
        <div class="wrap">
            <img :src="d.image" alt />
            <p>{{d.title}}</p>
            <i>{{d.image_source}}</i>
        </div>
        <link rel="stylesheet" :href="d.css" />
        <div v-html="d.body"></div>
    </div>
</template>
<script>
import API from "../common/js/api";
import vHeader from "../views/header1";
export default {
    data() {
        return {
            d: [],
            id: "",
            data: [],
            isActive: false,
        };
    },
    components: {
        vHeader
    },
    mounted() {
        var id = this.$route.params.id;
        console.log(id)
        this.$axios({
            url: API.detail + id,
            method: "get"
        }).then(res => {
            this.d = res.data;
        });
        //评论
        this.$axios({
            url: API.msg + id,
            method: "get"
        }).then(res => {
            this.data = res.data;
        });

        var arr=localStorage.getItem("arr")?JSON.parse(localStorage.getItem("arr")):[];
        this.isActive = arr.some(item=>item.id==id)
      
    },
    methods: {
        change() {
            // this.isActive = !this.isActive;
            // if (!this.isActive) {

            // }
            if(this.isActive){
                 var arr=JSON.parse(localStorage.getItem("arr"));
                var idx=arr.findIndex(item=>item.id==this.d.id)
                arr.splice(idx,1);
                localStorage.setItem("arr", JSON.stringify(arr))
                this.isActive = false
            }else{
            var arr = localStorage.getItem('arr')?JSON.parse(localStorage.getItem('arr')):[]
            arr.push(this.d)
            localStorage.setItem('arr',JSON.stringify(arr))
            this.isActive = true
            }
        }
    }
};
</script>
<style lang='stylus' scoped>
@import '../common/styl/index.styl';
.white{
    color #fff
}
.yellow{
    color yellow
}
.wrap {
    margin-top: 0.8rem;
    // margin-bottom .3rem
    width: 100vw;
    height: 2.7rem;
    position: absolute;

    img {
        width: 100%;
        height: 100%;
    }

    p {
        position: absolute;
        left: 0.2rem;
        bottom: 0.2rem;
        font-size: 0.4rem;
        color: $color2;
        line-height: 0.5rem;
    }

    i {
        position: absolute;
        right: 0.2rem;
        bottom: 0.2rem;
        color: $color2;
    }
}

.header {
    width: 85%;
    height: 0.8rem;
    background: $color1;
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 5%;
    padding-right: 10%;
    line-height: 0.8rem;
    z-index: 1;

    span {
        color: $color2;
        font-size: 0.4rem;
    }

    .yellow {
        color: yellow !important;
    }

    .fr {
        margin-left: 0.6rem;
    }

    i {
        font-size: 0.3rem;
        color: $color2;
        position: absolute;
        right: 0.12rem;
    }

    b {
        font-size: 0.3rem;
        color: $color2;
        position: absolute;
        right: 1.2rem;
    }
}
</style>