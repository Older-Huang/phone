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
            <template v-for="item in indexList">
              <van-index-anchor :key="item" :index="item" />
              <van-cell @click="selectCity" :title="city.name" v-for="city in cityList[item]" :key="city.id" />
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
        selectCity(ev) {
            let city = ev.currentTarget.children[0].children[0].innerText
            this.$store.commit('changeSelectCity', city);
            this.$router.back();
        }
    },
    computed: {
        currentCity() {
            return this.$store.state.selectCity || '深圳市';
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