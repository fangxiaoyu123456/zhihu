<template>
    <div>
        <div class="list" @click="$router.push(`/detail/${eve.id}`)">
            <p>{{eve.title}}</p>
            <img :src="eve.images[0]" alt />
        </div>
    </div>
</template>
<script>
import API from "../common/js/api";
export default {
    props:['eve']
};
</script>
<style lang='stylus' scoped>
@import '../common/styl/index.styl';
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