<template>
    <div id="w_industry" class="container mt-5">
        <form>
            <div class="panel_tagspanel" >
                <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <h3 class="font-weight-light">Skills</h3>
                            </div>
                        </div>
                        <input type="text" class="form-control" placeholder="What tools, technologies, and skills are you currrently teaching?" 
                        @keyup.enter.prevent="input_addtoIDB(i_keyword,selected_skeywords)" v-model="i_keyword">
                    </div>
                    <hr />
                <span class="badge badge-pill badge-primary" v-for="(keyword,index) in selected_skeywords" :key="keyword + index" :class="colors[index%7]">
                    <div class="d-flex">
                        <i class="material-icons" @click="rm_SKeyword(keyword)">clear</i>
                        <div class="align-self-center">
                            <b class="Raleway">{{keyword}}</b>
                        </div>
                    </div>
                </span>
                <hr />
                <span class="badge badge-pill badge-primary" v-for="(value,i) in industry_keywords" :key="value + i" :class="colors[i%7]">
                    <div class="d-flex" v-if="notFound(value,selected_skeywords)">
                        <i class="material-icons" @click="add_SKeywords(value)">add</i>
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
    name: "w_skills",
    data () {
        return {
            i_keyword: null,
            colors: ['pc-green', 'pc-blue', 'pc-yellow', 'pc-orange', 'pc-pink', 'pc-purple','pc-red'],
            industry_keywords: [
                'Drones','Robotics','Data Science','Internet of Things','Sustainability','Space',
                'Artificial Inteligence','Automotive','Bioprinting','Data','Drones','Gaming','Healthcare','Lifestyle'
                ],
            selected_skeywords:[]
        }
    },
    methods:{
        notFound(item,array) {
            return array.indexOf(item)==-1?1:0
        },
        add_SKeywords(item) {
            this.selected_skeywords.push(item)
        },
        rm_SKeyword(item){
            this.selected_skeywords.splice(this.selected_skeywords.indexOf(item),1)
        },
        add_SKtoDB(item) {
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
