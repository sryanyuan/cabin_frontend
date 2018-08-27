import priv from '@/assets/js/privilege.js';
import api from '@/assets/js/api.js'
import store from '@/assets/js/store.js'

export default {
    beforeEach(router) {
        router.beforeEach((to, from, next) => {
            // Fetching login data
            let res = this.checkPrivilege(to, router)
            if (res.ret) {
                next()
                return
            }
            next(res.next)
        })
    },
    getCookie(name) {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
         return (arr[2]);
        else
         return null;
    },
    getLocalUserInfo() {
        let value = this.getCookie("user")
    },
    getRouterPrivilege(to) {
        let pv = 0
        if (null == to.meta) {
            return pv
        }
        pv = to.meta.privilege
        if (null == pv) {
            return 0
        }
        return pv
    },
    // True if passed, false if access denied (redirect to login page)
    checkPrivilege(to, router) {
        if (store.state.userInfo.uid != 0) {
            return {ret: true}
        }
        let needPriv = this.getRouterPrivilege(to)
        // Call api to get login status
        api.getLoginStatus(function(res) {
            if (!res.success) {
                console.log(res)
                router.push({name: "error", querys: {msg: res.error}})
                return
            }
            let ls = res.res
            store.commit({
                type: "updateUser",
                uid: ls.uid,
                username: ls.username,
                avatar: ls.avatar,
                mood: ls.mood,
                role: ls.role,
                sex: ls.sex
            })
            if (ls.role >= needPriv) {
                // Nothing
                return
            }
            return router.push({name: "login"})
        })
        // call is a asynchoronize action, so return to the page and
        // redirect if needed
        return {ret: true}
    }
}
