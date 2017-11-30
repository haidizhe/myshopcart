let foot = {
    template:`
        <footer class="footer">
            <span>总金额：￥<em>{{total_price}}</em></span>
            <span>申请分期</span>
        </footer>
    `,
    computed:{
        ...mapState({
            total_price:'total_price'
        })
        
    }
}