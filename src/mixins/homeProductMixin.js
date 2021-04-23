export default {
    data() {
        return {
            showBackTop: false,
            productList: [],
            currScrollTop: 0,
        }
    },
    methods: {
        backTop() {
            let scrollTop = this.$refs.main.scrollTop;
            let interId = setInterval(() => {
                this.$refs.main.scrollTop -= scrollTop / 50;
                if (this.$refs.main.scrollTop <= 0) {
                    clearInterval(interId);
                }
            }, 10)
        },
        clickItem(id) {
            this.$router.push({
                path: '/detail',
                query: {
                    id
                }
            });
        },
    },
    beforeRouteLeave(to, from, next) {
        this.currScrollTop = this.$refs.main.scrollTop;
        next();
    },
    activated() {
        this.$refs.main.scrollTop = this.currScrollTop;
    },
}