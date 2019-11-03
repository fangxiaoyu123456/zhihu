<template>
    <div>
        <div>
            <h2 class="every-title">{{d.title}}</h2>
            <!-- <div class="list" v-for="item in d.data" :key="item.id">
                <p>{{item.title}}</p>
                <img :src="item.images[0]" alt />
            </div> -->
            <div v-for="eve in d.data" :key="eve.id">
            <v-day :eve="eve"></v-day>
            </div>
        </div>

    </div>
</template>
<script>
import API from "../common/js/api";
import vDay from '../views/day'
export default {
    props: ["d"],
    components:{
        vDay
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

</style>