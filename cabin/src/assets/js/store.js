import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        userInfo: {
            uid: 0,
            username: "",
            role: 0,
            avatar: "",
            sex: 0,
            mood: ""
        }
    },
    mutations: {
        updateUser(state, user) {
            state.userInfo.uid = user.uid
            state.userInfo.username = user.username
            state.userInfo.role = user.role
            state.userInfo.avatar = user.avatar
            state.userInfo.sex = user.sex
            state.userInfo.mood = user.mood
        },
        resetUser(state) {
            state.userInfo.uid = 0
            state.userInfo.username = ""
            state.userInfo.role = 0
            state.userInfo.avatar = ""
            state.userInfo.sex = 0
            state.userInfo.mood = ""
        }
    }
})

export default store
