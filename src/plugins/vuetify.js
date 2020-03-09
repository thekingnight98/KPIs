import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(Vuetify);
Vue.use(VueSweetalert2);

export default new Vuetify({
    icons: {
        iconfont: 'md',
    },
});