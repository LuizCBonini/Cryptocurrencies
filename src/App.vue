<template>

<CryptoHeader/>
<CoinCard/>
<CryptoFooter/>


</template>

<script>
import CoinCard from "./components/Card.vue";
import CryptoHeader from "./components/Header.vue"
import CryptoFooter from "./components/Footer.vue"

export default {
  name: 'App',

  components: {
    CryptoHeader,
    CoinCard,
    CryptoFooter
}
}
</script>

<style>
</style>
