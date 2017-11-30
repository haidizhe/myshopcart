let store = new Vuex.Store({
    state: {
        hospital_list: [],
        total_price:0
    },
    mutations: {
        update_hospital_list(state, data) {
            state.hospital_list = data;
            console.log(data)
        },
        change_hostipal_list(state, data) {
            //console.log(data)
            // 全选/全不选
            state.hospital_list.forEach((item, index) => {
                if (index == data.index) {
                    item.select_all = data.select_all;
                    item.content.forEach((value) => {
                        value.checked = data.select_all;
                    })
                }
            })
        },
        change_content_check(state, data) {
            console.log(data)
            // 改变checked的选中与非选中状态
            state.hospital_list[data.hostipal_index].content[data.content_index].checked = data.checked;

            // 每次切换checked状态的时候，遍历所有的checked,只要都是选中状态，把全选置为true.
            var flag = true;//全选
            state.hospital_list.forEach((item, index) => {
                if (index == data.hostipal_index) {
                    item.content.forEach((v, i) => {
                        if (!v.checked) {
                            flag = false;
                        }
                    })
                }
            })

            state.hospital_list.forEach((item, index) => {
                if (index == data.hostipal_index) {
                    item.select_all = flag;
                }
            })

        },
        change_content_count(state,data){
            state.hospital_list[data.hostipal_index].content[data.content_index].count = data.count;    
        },
        summrise_content_price(state){
            let sum=0;
            state.hospital_list.forEach((item) => {
                item.content.forEach((v)=>{
                    if(v.checked){
                        sum+=v.price*v.count;
                        console.log(sum)
                    }
                   
                })
            })
            state.total_price=sum;
        }
    }
})
store.subscribe(function (data) {
    //console.log(data)
})