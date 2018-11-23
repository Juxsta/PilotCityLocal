<template>
    <div class="component">
        <form class=" justify-content-center" >
            <div class="pc-panel-tagspanel" >
                <div class="d-flex flex-row mb-2">
                        <div>
                                <h3 class="pc-keyword-title">{{name}}</h3>
                        </div>
                        <input type="text" class="pc-input-box" :placeholder="placeholder" @keypress.enter.prevent="input_addtoIDB(keyword,selected_keywords)" v-model="keyword">
                    </div>
        <hr class="frame-line-break" />
            <div class="ml-4">
                <span class="badge badge-pill badge-primary tag-capitalize pr-3 ml-1 mr-1 mb-1 mt-1" 
                v-for="(keyword,index) in selected_keywords" :key="keyword + index" :class="colors[index%7]">
                
                    <div class="d-flex">
                        <a href="" @click.prevent>
                            <i class="material-icons icon-clear" @click="rm_Keyword(keyword)">clear</i>
                        </a>
                        <div class="align-self-center">
                            <b class="Raleway">{{keyword}}</b>
                        </div>
                    </div>
                </span>
            </div>

        <hr class="frame-line-break" />
            <div class="ml-4 mr-4">
                <span class="badge badge-pill badge-primary ml-1 mb-1 mt-1 mr-1 pr-3" v-for="(value,i) in keywords" :key="value + i" :class="colors[i%7]">
                    <div class="d-flex" v-if="notFound(value,selected_keywords)">
                        <a href="" @click.prevent>
                            <i class="material-icons icon-add" @click="add_Keywords(value)">add</i>
                        </a>
                        <div class="align-self-center">
                            <b class="Raleway">{{value}}</b>
                        </div>
                    </div>
                </span>
            </div>
           </div>
        </form>
    </div>
</template>

<script>

export default {
    props:{
        name: {
            type: String,
            default:"title"
        }, 
        placeholder: {
            type: String,
            default: "placeholder"
        },
        keywords: {
            type: Array
        },
        selected_keywords: {
            type:Array            
        }
        },
    
    data () {
        return {
            keyword: null,
            colors: ['pc-green', 'pc-blue', 'pc-yellow', 'pc-orange', 'pc-pink', 'pc-purple','pc-red'],
        };
    },
    methods:{
        notFound(item,array) {
            return array.indexOf(item)==-1?1:0
        },
        add_Keywords(item) {
            this.selected_keywords.push(item)
        },
        rm_Keyword(item){
            this.selected_keywords.splice(this.selected_keywords.indexOf(item),1)
        },
        add_IKtoDB(item) {
            this.keywords.push(item)
        },
        input_addtoIDB(item,array) {
            if(this.notFound(item,this.selected_keywords)) {
            array.push(item)
            }
            this.keyword=null
        }
    },
}
</script>
<style scoped>
.pc-tag {
    margin: 5px;
    font-size: 12px;
    padding-right:30px;
    padding-left:0px;

}
.tag-capitalize {
    text-transform: capitalize;
}
.icon-clear {
    font-size:15px;
    color:white;
    padding: 5px;
    font-weight:100;
}

.icon-add {
    font-size:15px;
    padding:5px;
    color:white;
}

.Raleway {
    font-weight:700;
    letter-spacing: 1px;

}

.pc-panel-tagspanel {
    border: dashed 1px #dbdcde;
    border-radius:50px;
    width: 1000px;
    padding-top:15px;
    padding-bottom:15px;
}

.pc-keyword-title {
    font-family: Raleway;
    font-size:20px;
    font-weight: 700;
    color:#939597;
    padding-top:9px;
    margin-left:30px;
    margin-right:30px;
}

.pc-input-box {
    border:solid 0px #ffffff;
    font-family: "Raleway";
    color:#dbdcde;
    font-style: italic;
    font-size:20px;
    width:750px;
}

.pc-input-box::placeholder{
    color:#dbdcde;
    font-weight:300;
}

.frame-line-break {
    border-style: dashed;
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
.pc-red {
    background-color: #ea6763
}

</style>
