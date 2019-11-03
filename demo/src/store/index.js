import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
var state = {
    path:""
}
var mutations = {
    changePath(state,path){
        state.path = path
    }
}
var actions = {
    changePath(context,path){
        context.commit('changePath',path)
    }
}
var getters = {

}
var store = new vuex.Store({
    state,
    mutations,
    actions,
    getters,
})
export default store

