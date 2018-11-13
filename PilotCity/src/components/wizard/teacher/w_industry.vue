<template>
    <div id="w_industry" class="container mt-5">
        <form>
            <div class="panel_tagspanel" >
                <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <h3 class="font-weight-light">Industries</h3>
                            </div>
                        </div>
                        <input type="text" class="form-control" placeholder="What industries would your classrooms be excited about?" @keyup.enter.prevent="input_addtoIDB(i_keyword,selected_ikeywords)" v-model="i_keyword">
                    </div>
                    <hr />
                <span class="badge badge-pill badge-primary pc-tag" v-for="(keyword,index) in selected_ikeywords" :key="keyword + index" :class="colors[index%7]">
                    <div class="d-flex">
                        <a href="" @click.prevent>
                            <i class="material-icons icon-clear" @click="rm_IKeyword(keyword)">clear</i>
                        </a>
                        <div class="align-self-center">
                            <b class="Raleway">{{keyword}}</b>
                        </div>
                    </div>
                </span>
                <hr />
                <span class="badge badge-pill badge-primary pc-tag" v-for="(value,i) in industry_keywords" :key="value + i" :class="colors[i%7]">
                    <div class="d-flex" v-if="notFound(value,selected_ikeywords)">
                        <a href="" @click.prevent>
                            <i class="material-icons icon-add" @click="add_IKeywords(value)">add</i>
                        </a>
                        <div class="align-self-center">
                            <b class="Raleway">{{value}}</b>
                        </div>
                    </div>
                </span>
           </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "w_industry",
    data () {
        return {
            i_keyword: null,
            colors: ['pc-green', 'pc-blue', 'pc-yellow', 'pc-orange', 'pc-pink', 'pc-purple','pc-red'],
            industry_keywords: [
                'Drones','Robotics','Data Science','Internet of Things','Sustainability','Space',
                'Artificial Inteligence','Automotive','Bioprinting','Data','Drones','Gaming','Healthcare','Lifestyle'
                ],
            selected_ikeywords:[]
        }
    },
    methods:{
        notFound(item,array) {
            return array.indexOf(item)==-1?1:0
        },
        add_IKeywords(item) {
            this.selected_ikeywords.push(item)
        },
        rm_IKeyword(item){
            this.selected_ikeywords.splice(this.selected_ikeywords.indexOf(item),1)
        },
        add_IKtoDB(item) {
            this.industry_keywords.push(item)
        },
        input_addtoIDB(item,array) {
            array.push(item)
            this.i_keyword=null
        }
    },
    computed: {

    }
}
</script>
<style>
.pc-tag {
    margin: 5px;
    font-family:"Raleway-ExtraBold";
    font-size: 12px;
    padding-right:20px;
}

.icon-clear {
    font-size:15px;
    color:white;
    padding: 5px;
}

.icon-add {
    font-size:15px;
    padding:5px;
    color:white;
}

.pc-purple {
    background-color: #ae90b0;
}
.pc-pink {
    background-color: #eca0be;
}
.pc-green {
    background-color: #6eba7f
}
.pc-blue {
    background-color: #3c9ccc
}
.pc-orange {
    background-color: #f79960
}
.pc-yellow {
    background-color: #fdd25a
}


</style>
