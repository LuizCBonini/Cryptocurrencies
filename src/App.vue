<template>
<h1>Hello World!</h1>

<table>

  <thead>
    <tr>
      <th>Coin</th>
    </tr>
  </thead>

  <tbody>
    <tr v-for="coin in bagOfCoins" :key="coin.code">
      <td class="bg-dacxi-blue text-dacxi-purple font-bold mb-8">
        <img :src="coin.image" alt="coin icon" class="w-10">
        {{coin.name}}
      </td>
    </tr>
  </tbody>

</table>

</template>

<script>

export default {
  name: 'App',

  data(){
    return{
      bagOfCoins: [],
    };
  },

  async mounted(){
    const answer = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cdacxi%2Cethereum%2Cterra-luna%2Ccosmos&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=7d%2C14d%2C30d%2C200d%2C1y"
      )
      const data = await answer.json()
      console.log(data)
      this.bagOfCoins = data
  }
}
</script>

<style>
</style>
