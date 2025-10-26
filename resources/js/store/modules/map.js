export default {
    namespaced: true,
    state: () => ({
        map: null
    }),
    mutations: {
        setMap(state, map) {
            state.map = map
        },
        clearMap(state) {
            state.map = null
        }
    },
    getters: {
        getMap: (state) => state.map
    }
}
