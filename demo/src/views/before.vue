<template>
    <div>
        <!-- <h2>10月26日&nbsp;星期六</h2>
    <div class="list">
        <p> 呵呵哒呵呵哒呵呵哒呵呵哒</p>
        <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3583433020,118316633&fm=26&gp=0.jpg" alt="">
        </div>-->

        <!-- <div>
            <h2>{{this.date}}</h2>
            <div
                class="list"
                v-for="item in d"
                :key="item.id"
                @touchstart="$router.push(`/detail/${item.id}`)"
            >
                <p>{{item.title}}</p>
                <img :src="item.images[0]" alt />
            </div>
        </div> -->

        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->

            <div v-for="item in list" :key="item.id">
                <div>
                    <h2>{{item.date}}</h2>
                    <div class="list" v-for="subItem in item.stories" :key="subItem.id" @click="$router.push(`/detail/${subItem.id}`)">
                        <p>{{subItem.title}}</p>
                        <img :src="subItem.images[0]" alt />
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>
<script>
import API from "../common/js/api";
export default {
    data() {
        return {
            date: "",
            d: [],
            list: [],
            loading: false,
            finished: false,
            num: 0
        };
    },
    mounted() {
        var date = new Date().toLocaleDateString();
        var d = date.split("/").join("");
        this.$axios({
            url: API.before + d,
            method: "get"
        }).then(res => {
            this.d = res.data.stories;
            this.date = res.data.date;
        });
    },
    methods: {
        onLoad() {
            // 异步更新数据
            // for (let i = 0; i < 1; i++) {
            //     this.list.push(this.list.length + 1);
            // }
            var newTime = new Date().getTime();
            var oldTime = newTime - 24 * 60 * 60 * 1000 * this.num;
            var date = new Date(oldTime);
            var year = date.getFullYear();
            var month = (date.getMonth() + 1 + "").padStart(2, "0");
            var day = (date.getDate() + "").padStart(2, "0");
            var time = year + month + day;
            console.log(time)
            this.$axios({
                url: API.before + time,
                method: "get"
            }).then(res => {
                this.list.push(res.data);
                this.num++;
                this.loading = false;
            });

            // 加载状态结束
           

            // 数据全部加载完成
            // if (this.list.length >= 40) {
            //     this.finished = true;
            // }
        }
    }
};
</script>
<style lang='stylus' scoped>
@import '../common/styl/index.styl';

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