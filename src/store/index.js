import Vue from 'vue';
import Vuex from 'vuex';

import { authuser } from './authuser.js';
import { shop } from './shop.js';
import { shopclient } from './shop-client.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        authuser,
        shop,
        shopclient
    }
});
