new Vue({
    el:".container",
    store:store,
    components:{
        "cart-header":header,
        "cart-wrap":wrap,
        "cart-comp":cart_comp,
        "cart-footer":foot
    },
    created(){
        fetch('../data/data.json').then(res=>{
            return res.json();
        }).then(res=>{
            this.$store.commit('update_hospital_list',res);
        })
    },
    computed:{
        ...mapState({
            hospital_list: 'hospital_list'
        })
    }
})
