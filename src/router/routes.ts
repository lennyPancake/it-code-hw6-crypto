import {RouteRecordRaw} from 'vue-router'
import ItemList from '../pages/ItemList.vue'
import ItemDetail from '../pages/ItemDetail.vue'
import ItemCategories from '../pages/ItemCategories.vue';
const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/coins' },
    { path: '/coins', component: ItemList },
    { path: '/coins/:id', component: ItemDetail },
    { path: '/coins/categories', component: ItemCategories }
  ];
export default routes