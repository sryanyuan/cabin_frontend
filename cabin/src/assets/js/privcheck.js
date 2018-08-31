import store from '@/assets/js/store.js'
import privilege from '@/assets/js/privilege.js'

export default {
    isGuest() {
        return this.requireWithPrivilege(privilege.guest)
    },
    isUser() {
        return this.requireWithPrivilege(privilege.user)
    },
    isAdmin() {
        return this.requireWithPrivilege(privilege.admin)
    },
    isSuperAdmin() {
        return this.requireWithPrivilege(privilege.superAdmin)
    },
    requireWithPrivilege(priv) {
        if (store.state.userInfo.role >= priv) {
            return true;
        }
        return false;
    }
}
