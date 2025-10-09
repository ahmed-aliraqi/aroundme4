import axios from '@/plugins/axios';

export default {
    namespaced: true,

    state() {
        return {
            authUser: null,
        };
    },

    mutations: {
        SET_AUTH_USER(state, data) {
            state.authUser = data;
            state.error = null;
        },
        CLEAR_AUTH_USER(state) {
            state.authUser = null;
        },
    },

    getters: {
        getAuthUser: (state) => state.authUser,
        getError: (state) => state.error,
    },

    actions: {
        /**
         * Fetch the authenticated user from the API.
         * @param {Object} context - Vuex action context
         * @param {Object} [payload] - Optional payload, e.g. { force: true }
         */
        async fetchAuthUser({ state, commit }, payload = {}) {
            try {
                const { data } = await axios.get('/api/profile');
                commit('SET_AUTH_USER', data.data);
                return data.data;
            } catch (error) {
                commit('SET_AUTH_USER', null);
                throw error;
            }
        },

        async logout({ commit }) {
            await axios.post('/logout');
            commit('CLEAR_AUTH_USER');
        },
    },
};
