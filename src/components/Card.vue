<template>
    <div class="flex w-auto flex-wrap justify-center items-center gap-4">
        <div v-for="coin of bagOfCoins"  :key="coin.code"  class="bg-dacxi-blue p-5 mb-2 font-semibold flex w-80 rounded-md border-solid border-2 border-dacxi-purple relative md:hover:scale-105 ease duration-300">
            <img :src="coin.image" alt="coin icon" class="w-16 rounded-full">
            <span class="ml-2 flex text-lg" >

                <h1 class="text-dacxi-purple text-lg">
                    {{coin.name}}
                </h1>
                <p class="text-gray-500 text-xs">({{coin.symbol}})</p>
                <p class="text-dacxi-purple absolute bottom-10" v-if="requestCoin === false">U$ {{coin.current_price.toFixed(4)}}</p>
                <p class="text-dacxi-purple absolute bottom-10" v-else-if="requestCoin === true && coin.name === 'Bitcoin'">U$ {{price_btc.toFixed(2)}}</p>
                <p class="text-dacxi-purple absolute bottom-10" v-else-if="requestCoin === true && coin.name === 'Ethereum'">U$ {{price_eth.toFixed(2)}}</p>
                <p class="text-dacxi-purple absolute bottom-10" v-else-if="requestCoin === true && coin.name === 'Cosmos Hub'">U$ {{price_atom.toFixed(2)}}</p>
                <p class="text-dacxi-purple absolute bottom-10" v-else-if="requestCoin === true && coin.name === 'Terra'">U$ {{price_luna.toFixed(2)}}</p>
                <p class="text-dacxi-purple absolute bottom-10" v-else-if="requestCoin === true && coin.name === 'Dacxi'">U$ {{price_dacxi.toFixed(3)}}</p>

                <span class="flex h-3 w-3 ml-1">
                    <span class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75" v-if="requestCoin === false"></span>
                    <span class=" absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75" v-else-if="requestCoin === true"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500" v-if="requestCoin === false"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500" v-else-if="requestCoin === true"></span>
                </span>

                <p class="text-green-500 text-xs" v-if="requestCoin === false">Live</p>
                <p class="text-red-500 text-xs" v-else-if="requestCoin === true">Off</p>

                <p class="text-dacxi-purple absolute text-xs bottom-7" v-if="requestCoin === false">{{now()}}</p>
                <p class="text-dacxi-purple absolute text-xs bottom-7" v-else-if="requestCoin === true">In the date:</p>

                <input type="date"  v-model="date" class="h-5 w-24 text-xs text-dacxi-blue bg-dacxi-purple rounded absolute bottom-2">
                <input type="time" v-model="time" class="h-5 w-16 text-xs text-dacxi-blue bg-dacxi-purple rounded absolute bottom-2 right-11">

                <button class="text-sx text-dacxi-purple border-2 border-dacxi-purple rounded h-6 w-6 absolute bottom-2 right-2 hover:bg-dacxi-purple hover:text-dacxi-blue duration-500" @click.prevent="timestampConversor()" @click="requestCoin = true" :disabled="isDisable">
                    
                    <svg class="h-5 w-5 text-center flex justify-center" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                    
                </button>
                
            </span>

        </div>
    </div>
            <div class="flex w-auto"><button @click.prevent="resetDateAndTime()" @click="requestCoin = false" class="border-2 border-dacxi-purple bg-dacxi-blue text-dacxi-purple rounded font-bold w-20 m-auto">voltar</button></div>
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


            } catch (err) {
                console.log(err);
            }
        };


        // fetch timer
        setInterval(() => {
            getCoins();
        }, 2500);

        let bagOfCoins = computed(() =>{
            return coins.value
        });
        return {bagOfCoins};


    },
    data() {
        return {
            requestCoin: false,
            cryptoName: ['bitcoin', 'ethereum', 'cosmos', 'terra-luna', 'dacxi'], 
            date: "", 
            time: "", 
            price_btc: 0, 
            price_eth: 0,
            price_atom: 0,
            price_luna: 0,
            price_dacxi: 0,

        };
    },


    


    methods: {
        now() {
            let today  = new Date();
            let now = today.toLocaleString("pt-BR");
            return (now);
        },

        timestampConversor() {
            let date = `${this.date} ${this.time}`
            let dateRequest = new Date(date);
            let Timestamp = Date.parse(dateRequest) / 1000;
            let finalDate = new Date();
            let UnixFinalDate = Date.parse(finalDate) / 1000;
            let cryptoName = this.cryptoName


            
            const searchData = async() => { 
                const priceInDateBitcoin = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoName[0]}/market_chart/range?vs_currency=usd&from=${Timestamp}&to=${UnixFinalDate}`)
                this.price_btc = priceInDateBitcoin.data.prices[0][1];

                const priceInDateEthereum = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoName[1]}/market_chart/range?vs_currency=usd&from=${Timestamp}&to=${UnixFinalDate}`)
                this.price_eth = priceInDateEthereum.data.prices[0][1];

                const priceInDateCosmo = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoName[2]}/market_chart/range?vs_currency=usd&from=${Timestamp}&to=${UnixFinalDate}`)
                this.price_atom = priceInDateCosmo.data.prices[0][1];

                const priceInDateLuna = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoName[3]}/market_chart/range?vs_currency=usd&from=${Timestamp}&to=${UnixFinalDate}`)
                this.price_luna = priceInDateLuna.data.prices[0][1];

                const priceInDateDacxi = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoName[4]}/market_chart/range?vs_currency=usd&from=${Timestamp}&to=${UnixFinalDate}`)
                this.price_dacxi = priceInDateDacxi.data.prices[0][1];
                
            };
            return(searchData())
            
        },

        resetDateAndTime() {
            this.date = "";
            this.time = "";

        },

    },
    computed: {

        isDisable(){
            return this.date === "";
            
        },
    }
    

    }
</script>