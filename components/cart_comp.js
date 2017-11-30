Vue.directive('swipe',{
    bind(el,binging,vnode){
        let start, end, {value, arg} = binging,stime, etime;
        let isMove = false;
        el.addEventListener('touchstart',function(e){
            start = e.touches[0].pageX;
            stime = new Date().getTime();
        })
        el.addEventListener('touchmove',function(e){
            isMove = true;
            end = e.touches[0].pageX;
        })
        el.addEventListener('touchend',function(e){
            if(!isMove) return;
            etime = new Date().getTime();
            if(arg=='left' && end-start<0 && Math.abs(end-start)>20 && etime-stime < 500){
                console.log('swipe',arg)
                value()
            }
            if(arg=='right' && end-start>0 && Math.abs(end-start)>20 && etime-stime < 500){
                console.log('swipe',arg)
                value()
            }
            isMove = false;
        })
    }
})
let cart_comp = {
    template: `
    <main class="main">
        <div class="main-head">
            <label @click="is_selectall"><span v-if="data.select_all"></span></label>
            <span>{{data.title}}</span>    
        </div>  
        <cart-item v-for="(x,i) in data.content" :x="x" :key="i" :hostipal_index="index" :content_index="i"></cart-item>  
        <div class="order">
            <span>订单留言</span>
            <i class="iconfont icon-youjiantou-01"></i>
        </div>
    </main>
    `,
    props:{
        data:{},
        index:{}
    },
    components: {
        "cart-item": {
            template: `
            <div class="cart_content" v-swipe:left="cb_left" v-swipe:right="cb_right">
                <div class="cart-left">
                    <ul>
                        <li>
                            <label @click="select_check"><span v-if="x.checked">✔</span></label>
                            <span>{{x.type}}</span>
                        </li>
                        <li class="ul_two">
                            <em>￥{{x.price}}</em>
                            <p>
                                <span @click="reduce">-</span>
                                <span>{{x.count}}</span>
                                <span @click="odd">+</span>
                            </p>
                        </li>
                    </ul>
                </div>
                <div class="cart-right" :class="{'active':active}">
                    <span>删<br/>除</span>
                    <small>x</small>
                </div>
                
            </div>
            `,
            data(){
                return{
                    active:false
                }
            },
            props:{
                x:{},
                hostipal_index:{},
                content_index:{}
            },
            methods:{
                ...mapMutations(['summrise_content_price']),
                cb_left(){
                    this.active = true;
                },
                cb_right(){
                    this.active = false;
                },
                select_check(){
                    this.$store.commit('change_content_check',{
                        hostipal_index:this.hostipal_index,
                        content_index:this.content_index,
                        checked:!this.x.checked
                    })
                    this.summrise_content_price()
                },
                reduce(){
                    this.$store.commit('change_content_count',{
                        count:--this.x.count,
                        hostipal_index:this.hostipal_index,
                        content_index:this.content_index
                    })
                    this.summrise_content_price()
                },
                odd(){
                    this.$store.commit('change_content_count',{
                        count:++this.x.count,
                        hostipal_index:this.hostipal_index,
                        content_index:this.content_index
                    })
                    this.summrise_content_price()
                }
            }
        }
    },
    methods:{
        ...mapMutations(['summrise_content_price']),
        is_selectall(){
            //this.data.select_all = !this.data.select_all;
            this.$store.commit('change_hostipal_list',{
                index:this.index,
                select_all:!this.data.select_all
            })
            this.summrise_content_price()
        }
    }

}