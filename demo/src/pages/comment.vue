<template>
    <div>
        <div class="header">
            <span class="iconfont icon-xiangshang-copy" @click="$router.go(-1)"></span>
            <span class="com">
                <i>{{this.com.short_comments + this.com.long_comments}}</i>条点评
            </span>
            <span class="iconfont icon-bianji fr"></span>
        </div>
        <van-collapse v-model="activeNames">
            <van-collapse-item title="标题1"></van-collapse-item>
            <van-collapse-item :title="this.com.long_comments +'条长评论'" name="1">
                <div v-for="item in l" :key="item.id">
                    <div class="box">
                        <div class="left">
                            <div class="smbox">
                                <img :src="item.avatar" alt />
                            </div>
                        </div>
                        <div class="right">
                            <h2>
                                {{item.author}}
                                <span
                                    class="iconfont icon-good_active-copy fr"
                                >{{item.likes}}</span>
                            </h2>
                            <p>{{item.content}}</p>
                            <h3>{{item.time}}</h3>
                        </div>
                    </div>
                </div>
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            </van-collapse-item>
            <van-collapse-item :title="this.com.short_comments +'条短评论'" name="2" class="short">
                <div v-for="item in s" :key="item.id">
                    <div class="box">
                        <div class="left">
                            <div class="smbox">
                                <img :src="item.avatar" alt />
                            </div>
                        </div>
                        <div class="right">
                            <h2>
                                {{item.author}}
                                <span
                                    class="iconfont icon-good_active-copy fr"
                                >{{item.likes}}</span>
                            </h2>
                            <p>{{item.content}}</p>
                            <h3>{{item.time|changeTime}}</h3>
                        </div>
                    </div>
                </div>
            </van-collapse-item>
        </van-collapse>
        <!-- <div>
            <div class="box">
                <div class="left">
                    <div class="smbox">
                        <img
                            src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=751506784,1715615798&fm=26&gp=0.jpg"
                            alt
                        />
                    </div>
                </div>
                <div class="right">
                    <h2>
                        你快乐吗
                        <span class="iconfont icon-good_active-copy fr">1</span>
                    </h2>
                    <p>十亿少女梦</p>
                    <h3>2019-10-10</h3>
                </div>
            </div>
        </div>-->
    </div>
</template>
<script>
import API from "../common/js/api";
export default {
    data() {
        return {
            activeNames: [],
            l: [],
            s: [],
            com: []
        };
    },
    mounted() {
        //长评评论
        var id = this.$route.params.id
        this.$axios({
            url: API.long + id + "/long-comments",
            method: "get"
        }).then(res => {
            this.l = res.data.comments;
        });
        //短评评论
        this.$axios({
            url: API.long + id + "/short-comments",
            method: "get"
        }).then(res => {
            this.s = res.data.comments;
        });
        //评论数量
        this.$axios({
            url: API.msg + id,
            method: "get"
        }).then(res => {
            this.com = res.data;
        });
    },
};
</script>
<style lang='stylus' scoped>
@import '../common/styl/index.styl';

.box {
    width: 100%;
    display: flex;
    padding-bottom: 0.1rem;
    padding-top: 0.1rem;
    border-bottom: 1px solid #ccc;

    .left {
        width: 0.6rem;

        .smbox {
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .right {
        flex: 1;
        margin-left: 0.2rem;

        h2 {
            color: #000;
            font-size: 0.3rem;
            margin-bottom: 0.1rem;

            span {
                color: #ccc;
            }
        }

        p {
            margin-bottom: 0.1rem;
        }
    }
}
.header{
    width 90%
    height .8rem
    background $color1
    position absolute
    left 0
    top 0
    z-index 1
    padding 0 5%
    line-height .8rem
    font-size .4rem
    color $color2
    span{
        font-size .4rem
        i{
            font-style normal
        }
    }
    .com{
        margin-left .3rem
    }
}
.short{
    position fixed
    bottom 0
    left 0    
}
</style>
