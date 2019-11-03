<template>
    <div>
        <!-- <v-header></v-header> -->
        <div class="header">
            <span is-link @click="showPopup">
                <van-icon name="wap-nav" />
            </span> 
           <van-popup v-model="show" position="left" :style="{ height: '100%',width : '80%' }">
                <div class="box">
                    <div class="top">
                        <div class="one">
                            <img
                                src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=267271381,2663362996&fm=26&gp=0.jpg"
                                alt
                            />
                        </div>
                        <div class="two">
                            <h3>呵呵哒</h3>
                        </div>
                    </div>
                    <div class="down">
                        <div class="three" @click="$router.push('/collect')">
                            <i class="iconfont icon-wujiaoxing"></i>我的收藏
                        </div>
                        <div class="four">
                            <i class="iconfont icon-xiazai"></i>离线下载
                        </div>
                    </div>
                </div>
                <div class="smbox" @click="close">
                    <b class="iconfont icon-yemian"></b>首页
                </div>
            </van-popup>
            <h1 ref="title">首页</h1>
        </div>
        <v-swipe></v-swipe>
<!-- 
        <h1>今日新闻</h1>
        <v-item></v-item> -->
        <!-- <div>
            <h2>{{d[0].title}}</h2>
            <div class="list" v-for="item in d[0].data" :key="item.id">
                <p>{{item.title}}</p>
                <img :src="item.images[0]" alt />
            </div>
        </div>-->
        <div v-for="item in d" :key="item.title">
            <v-everyDay :d="item"></v-everyDay>
        </div>
        <!-- <v-before></v-before> -->
        <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">

            <div v-for="item in list" :key="item.id">
                <div>
                    <van-sticky><h2>{{item.date}}</h2></van-sticky>
                    <div class="list" v-for="subItem in item.stories" :key="subItem.id" @click="$router.push(`/detail/${subItem.id}`)">
                        <p>{{subItem.title}}</p>
                        <img :src="subItem.images[0]" alt />
                    </div>
                </div>
            </div>
        </van-list>-->
    </div>
</template>
<script>
// import vBefore from "../views/before";
import vSwipe from "../views/swipe";
import vItem from "../views/item";
import vEveryDay from "../views/everyDay";
import API from "../common/js/api";
export default {
    components: {
        vSwipe,
        vItem,
        vEveryDay
        // vBefore
    },
    data() {
        return {
            show: false,
            date: "",
            d: [],
            list: [],
            loading: false,
            finished: false,
            isLoad: true,
            num: 1
        };
    },
    mounted() {
        this.$axios({
            url: API.nowItem,
            method: "get"
        }).then(res => {
            // this.d = res.data.stories;
            this.d.push({
                title: "今日新闻",
                data: res.data.stories
            });
            this.getBefore(this.num);
            // console.log(this.d);
        });
        console.log(this.d);
        // var date = new Date().toLocaleDateString();
        // var d = date.split("/").join("");
        // this.$axios({
        //     url: API.before + d,
        //     method: "get"
        // }).then(res => {
        //     this.d = res.data.stories;
        //     this.date = res.data.date;
        // });
        window.onscroll = () => {
            //判断到底
            var st =
                document.documentElement.scrollTop || document.body.scrollTop; //上卷的距离
            var wh = document.documentElement.clientHeight; //窗口的高度
            var dh = document.documentElement.offsetHeight; //文档的高度
            if (st + wh + 500 >= dh && this.isLoad) {
                this.num++;
                this.getBefore(this.num);
            }
            //判断顶部的内容要不要发生改变
            var everyTitle = document.querySelectorAll(".every-title");
            var arr = [];
            for (var i = 0; i < everyTitle.length; i++) {
                arr.push(everyTitle[i].getBoundingClientRect().top)
            }
            // console.log(arr)
            var n = arr.findIndex((item, index) => {
                return item < this.$refs.title.offsetHeight && arr[index + 1] > 0
            })

            if (n == -1) {
                this.$refs.title.innerHTML = "首页"
            } else {
                this.$refs.title.innerHTML = everyTitle[n].innerHTML
            }
        };
    },
    methods: {
        showPopup() {
            this.show = true;
        },
        close() {
            this.show = false;
        },
        //  onLoad() {
        //     // 异步更新数据
        //     // for (let i = 0; i < 1; i++) {
        //     //     this.list.push(this.list.length + 1);
        //     // }
        //     var newTime = new Date().getTime();
        //     var oldTime = newTime - 24 * 60 * 60 * 1000 * this.num;
        //     var date = new Date(oldTime);
        //     var year = date.getFullYear();
        //     var month = (date.getMonth() + 1 + "").padStart(2, "0");
        //     var day = (date.getDate() + "").padStart(2, "0");
        //     var time = year + month + day;
        //     console.log(time)
        //     this.$axios({
        //         url: API.before + time,
        //         method: "get"
        //     }).then(res => {
        //         this.list.push(res.data);
        //         this.num++;
        //               this.loading = false;
        //     });
        getBefore(n) {
            var date = new Date().getTime();
            //请求数据用的年月日
            var requestTimes = date - (n - 1) * 24 * 60 * 60 * 1000;
            var requestDate = new Date(requestTimes);
            var requestYear = requestDate.getFullYear();
            var requestMonth = (requestDate.getMonth() + 1 + "").padStart(
                2,
                "0"
            );
            var requestDay = (requestDate.getDate() + "").padStart(2, "0");
            var requestParams = requestYear + requestMonth + requestDay;
            //页面展示的年月日
            var showTimes = date - n * 24 * 60 * 60 * 1000;
            var showDate = new Date(showTimes);
            var showYear = showDate.getFullYear();
            var showMonth = (showDate.getMonth() + 1 + "").padStart(2, "0");
            var showDay = (showDate.getDate() + "").padStart(2, "0");
            var n = showDate.getDay();
            var week = [
                "星期日",
                "星期一",
                "星期二",
                "星期三",
                "星期四",
                "星期五",
                "星期六"
            ];
            var showParams = `${showYear}-${showMonth}-${showDay} ${week[n]}`;

            //开关
            this.isLoad = false;
            this.$axios({
                url: API.before + requestParams
            }).then(res => {
                this.isLoad = true;
                // var arr = this.state.arr;
                this.d.push({
                    title: showParams,
                    data: res.data.stories
                });
                // this.setState({
                //     arr: arr
                // })
            });
        }
    }
};
</script>
<style lang="stylus" scoped>
@import '../common/styl/index.styl';

h1 {
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.3rem;
    padding-left: 0.2rem;
}

.header {
    position: fixed;
    left: 0;
    top: 0;
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
    width: 90%;
    height: 2rem;
    background: $color1;
    padding: 0.2rem 5%;

    .top {
        width: 100%;
        height: 1rem;

        .one {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            overflow: hidden;
            position: absolute;
            left: 0;
            top: 0;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .down {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        text-align: left;

        .three {
            width: 50%;
        }

        .four {
            flex: 1;
        }

        i {
            margin-left: 0.2rem;
            margin-right: 0.2rem;
        }
    }
}

.smbox {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background: #F0F0F0;
    text-align: left;
    padding-left: 0.3rem;
    color: $color1;
    font-size: 0.4rem;

    b {
        margin-right: 0.2rem;
        font-size: 0.4rem;
    }
}

h2 {
    width: 100vw;
    height: 0.7rem;
    background: $color1;
    line-height: 0.7rem;
    font-size: 0.3rem;
    color: $color2;
    text-align: center;
}

.list {
    width: 90%;
    margin: 0 auto;
    height: 1.5rem;
    border-radius: 0.15rem;
    padding: 0.2rem;
    margin-bottom: 0.1rem;
    background: $color2;

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