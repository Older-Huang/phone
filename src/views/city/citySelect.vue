<template>
  <div class="city-select">
      <van-nav-bar
        title="选择城市"
        :left-text="currentCity"
        left-arrow
        @click-left="$router.back()"
        class="b-border"
        fixed
        />
        <van-index-bar :index-list="indexList" sticky :sticky-offset-top="46" highlight-color="rgb(4, 252, 128)">
            <template v-for="(value, key) in cityList">
              <van-index-anchor :key="key" :index="key" />
              <van-cell @click="selectCity(city.name)" :title="city.name" v-for="city in value" :key="city.id" />
            </template>
        </van-index-bar>
  </div>
</template>

<script>
import { reqCityData } from 'network/api'
export default {
    data() {
        return {
            cityList: [],
            indexList: []
        };
    },
    methods: {
        async getCityData() {
            const { data } = await reqCityData();
            this.cityList = data.cities;
            this.indexList = Object.keys(data.cities);
        },
        selectCity(city) {
            this.$store.commit('changeSelectCity', city);
            this.$router.back();
        }
    },
    computed: {
        currentCity() {
            return this.$store.state.selectCity;
        }
    },
    created() {
        this.getCityData();
    }
}
</script>

<style lang="less" scoped>
.city-select {
    .van-index-bar {
        margin-top: 46px;
    }
}
</style>