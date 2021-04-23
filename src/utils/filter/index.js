import Vue from 'vue'

Vue.filter('formatPrice', price => {
    if(!price) return;
    price = Number(price);
    return `￥${price.toFixed(2)}`;
})

Vue.filter("formatTitle", title => {
    if(!title) return;
    return title.split(' ')[0];
})