<template>
    <div id="w_bottom_line" class="container mt-5">
        <form>
            <div class="panel_tagspanel" >
                <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <h3 class="font-weight-light">What's your bottom line?</h3>
                            </div>
                        </div>
                        <input type="text" class="form-control" placeholder="Example:Client Acquisition" @keyup.enter.prevent="input_addtoblDB(B_keyword,selected_Bkeywords)" v-model="B_keyword">
                    </div>
                    <hr />
                <span class="badge badge-pill badge-primary" v-for="(keyword,index) in selected_Bkeywords" :key="keyword + index" :class="colors[index%7]">
                    <div class="d-flex">
                        <i class="material-icons" @click="rm_Bkeyword(keyword)">clear</i>
                        <div class="align-self-center">
                            <b class="Raleway">{{keyword}}</b>
                        </div>
                    </div>
                </span>
                <hr />
                <span class="badge badge-pill badge-primary" v-for="(value,i) in bottom_line_keywords" :key="value + i" :class="colors[i%7]">
                    <div class="d-flex" v-if="notFound(value,selected_Bkeywords)">
                        <i class="material-icons" @click="add_BKeywords(value)">add</i>
                        <div class="align-self-center">
                            <b class="Raleway">{{value}}</b>
                        </div>
                    </div>
                </span>
           </div>
        </form>
        <form>
            <div class="panel_tagspanel mt-5" >
                <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <h3 class="font-weight-light">How are you doing it now?</h3>
                            </div>
                        </div>
                        <input type="text" class="form-control" placeholder="Example:Client Acquisition" @keyup.enter.prevent="input_addtoblDB(B_keyword,selected_Bkeywords)" v-model="B_keyword">
                    </div>
                <span class="badge badge-pill badge-primary" v-for="(keyword,index) in selected_Bkeywords" :key="keyword + index" :class="colors[index%7]">
                    <div class="d-flex">
                        <i class="material-icons" @click="rm_Bkeyword(keyword)">clear</i>
                        <div class="align-self-center">
                            <b class="Raleway">{{keyword}}</b>
                        </div>
                    </div>
                </span>
                <hr />
                <span class="badge badge-pill badge-primary" v-for="(value,i) in bottom_line_keywords" :key="value + i" :class="colors[i%7]">
                    <div class="d-flex" v-if="notFound(value,selected_Bkeywords)">
                        <i class="material-icons" @click="add_BKeywords(value)">add</i>
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
    name: "w_bottom_line",
    data () {
        return {
            B_keyword: null,
            colors: ['pc-green', 'pc-blue', 'pc-yellow', 'pc-orange', 'pc-pink', 'pc-purple','pc-red'],
            keywords: [
                'Drones','Robotics','Data Science','Internet of Things','Sustainability','Space',
                'Artificial Inteligence','Automotive','Bioprinting','Data','Drones','Gaming','Healthcare','Lifestyle'
                ],
            bottom_line_keywords: ['Client Acquisition', 'Use Cases','Building Community','Training Talent',
            'Sales','Marketing','Public Relations','Operational Optimization','Automation',
            'Research & Development','Innovation','Talent Generation','Client Engagement'],
            selected_Bkeywords:[]
        }
    },
    methods:{
        notFound(item,array) {
            return array.indexOf(item)==-1?1:0
        },
        add_BKeywords(item) {
            this.selected_Bkeywords.push(item)
        },
        rm_Bkeyword(item){
            this.selected_Bkeywords.splice(this.selected_Bkeywords.indexOf(item),1)
        },
        add_BktoDB(item) {
            this.bottom_line_keywords.push(item)
        },
        input_addtoblDB(item,array) {
            array.push(item)
            this.B_keyword=null
        }
    },
    computed: {

    }
}
</script>

<style>
.panel_tagspanel{
    border-radius:10px;
    padding: 10px;
    background-color: rgba(235, 235, 235, 0.904);
}
.badge {
    cursor: pointer;
    margin-left: 10px;
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
