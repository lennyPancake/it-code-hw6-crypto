import {RouteRecordRaw} from 'vue-router'
import ItemList from '../pages/ItemList.vue'
import ItemDetail from '../pages/ItemDetail.vue'
const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/coins' },
    { path: '/coins', component: ItemList },
    { path: '/coins/:id', component: ItemDetail },
  ];
export default routes