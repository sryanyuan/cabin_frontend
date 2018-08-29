import Vue from 'vue'

let eventBus = new Vue()

export default {
    bus: eventBus,
    eventUpdateCategories: "updateCategories"
}
