import { createStore } from 'vuex';
import auth from '@/store/modules/auth';
import map from '@/store/modules/map';

const store = createStore({
    modules: {
        auth,
        map,
    },
});
export default store;
