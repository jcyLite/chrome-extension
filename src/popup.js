import Vue,{ createApp} from "vue";
import App from "./App.vue";
import './popup.css'
import router from "./router/index.js";
import store from "./store/index.js";

import Ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
app.use(Ant)
app.use(router).use(store).mount("#app");
