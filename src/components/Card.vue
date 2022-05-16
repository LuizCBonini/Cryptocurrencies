<template>
    <div class="flex w-auto flex-wrap justify-center items-center gap-4">
        <div v-for="coin of bagOfCoins" :key="coin.code" class="bg-dacxi-blue p-5 mb-2 font-semibold flex w-80 rounded-md border-solid border-2 border-[#AA69FF] relative cursor-pointer hover:scale-105 ease duration-300">
            <img :src="coin.image" alt="coin icon" class="w-20 rounded-full">
            <span class="ml-2 flex text-lg">
                <h1 class="text-dacxi-purple">
                    {{coin.name}}
                </h1>
                <p class="text-gray-500 text-sm">({{coin.symbol}})</p>
                <p class="text-dacxi-purple absolute bottom-12">U$ {{coin.current_price}}</p>
                <span class="flex h-3 w-3 ml-1">
                    <span class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <p class="text-green-500 text-sm">Live</p>
                <p class="text-dacxi-purple absolute text-sm bottom-3">{{coin.last_updated}}</p>
            </span>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'

export default {
    name: 'CoinCard',

    setup() {
        const coins = ref([])
        //api call
        const getCoins = async () => {
            try {
                const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cdacxi%2Cethereum%2Cterra-luna%2Ccosmos&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=7d%2C14d%2C30d%2C200d%2C1y");
                coins.value = res.data;
                console.log(res.data)
            } catch (err) {
                console.log(err);
            }
        };

        // fetch timer
        setInterval(() => {
            getCoins();
        }, 1200);

        const bagOfCoins = computed(() =>{
            return coins.value
        });
        return {bagOfCoins};

    },
    

    // data(){
    //     return{
    //         bagOfCoins: [],
    //     };
    // },

    // // api call
    // async mounted(){
    //     const answer = await fetch(
    //     "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cdacxi%2Cethereum%2Cterra-luna%2Ccosmos&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=7d%2C14d%2C30d%2C200d%2C1y"
    //     )
    //     const data = await answer.json()
    //     console.log(data)
    //     this.bagOfCoins = data

    // },



        
    }
</script>