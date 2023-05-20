import { defineStore } from 'pinia'
import { fetchsCoin } from '../services/api'
import { SearchCoin, Root} from '../types/SearchCoin';
import { DetailCoin } from '../types/DetailCoin';
import { CategoryCoin } from '../types/CategoryCoin';
import { CategoryList } from '../types/CategoryList';
export const useCoinsStore = defineStore("coins-store", {
    state:()=>({
        sCoins: [] as SearchCoin[],
        dCoins: {} as DetailCoin,
        cCoins: [] as CategoryCoin[],
        cList: [] as CategoryList[],
        isLoadingDetail: false,
        isLoadingSearch: false,
        isLoadingCategory: false,
    }),
    actions: {
        fetchSearchCoin(input:string){
            this.isLoadingSearch = true;
           fetchsCoin.fetchSearchCoin(input).then(({data}:{data:Root})=>{
            const coins: SearchCoin[] = data.coins;
            this.sCoins = coins;
            this.isLoadingSearch = false;
           });
        },
        fetchDetailCoin(input:string){
            this.isLoadingDetail = true;
            fetchsCoin.fetchDetailCoin(input).then(({data})=>
            {
                this.dCoins = data;
                this.isLoadingDetail=false;
            })
            
        },
        fetchCategoryCoin(input:string,page:number){
            this.isLoadingCategory = true;
            fetchsCoin.fetchCategoryCoin(input,page).then(({data})=>
            {

                this.cCoins = [...this.cCoins, ...data];
                this.isLoadingCategory=false;
            })
            
        },
        getCategoryList(){
            fetchsCoin.getCategoryList().then(({data})=>
            {
                this.cList = data;
                this.cList.unshift({ category_id: 'None', name: 'None' });
            })
        }
    }
    
})