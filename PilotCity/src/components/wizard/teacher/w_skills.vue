<template>
   <div>
        <div id="w_industry" class="mt-5 d-flex justify-content-center">
        <form>
            <div class="pc-panel-tagspanel" >
                <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="pc-input-group-text">
                                <h3 class="pc-keyword-title" @click="skip">Skills</h3>
                            </div>
                        </div>
                        <input type="text" class="pc-input-box" placeholder="What tools, technologies, and skills are you currently teaching?" @keypress.enter.prevent="input_addtoIDB(s_keyword,selected_skeywords)" v-model="s_keyword">
                </div>
        <hr class="frame-line-break" />
            <div class="ml-3">
                <span class="badge badge-pill badge-primary tag-capitalize pr-3 ml-1 mr-1 mb-1 mt-1" v-for="(keyword,index) in selected_skeywords" :key="keyword + index" :class="colors[index%7]">
                    <div class="d-flex">
                        <a href="" @click.prevent>
                            <i class="material-icons icon-clear" @click="rm_IKeyword(keyword)">clear</i>
                        </a>
                        <div class="align-self-center">
                            <b class="Raleway">{{keyword}}</b>
                        </div>
                    </div>
                </span>
            </div>

        <hr class="frame-line-break" />
            <div class="ml-3">
                <span class="badge badge-pill badge-primary ml-1 mb-1 mt-1 mr-1 pr-3" v-for="(value,i) in skill_keywords" :key="value + i" :class="colors[i%7]">
                    <div class="d-flex" v-if="notFound(value,selected_skeywords)">
                        <a href="" @click.prevent>
                            <i class="material-icons icon-add" @click="add_IKeywords(value)">add</i>
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
   </div>
</template>

<script>

import { bus } from '../../../main'

import { Prompter } from '../../../main'
export default {
    name: "w_industry",
    data () {
        return {
            s_keyword: null,
            colors: ['pc-green', 'pc-blue', 'pc-yellow', 'pc-orange', 'pc-pink', 'pc-purple','pc-red'],
            skill_keywords: [
                '3D Printing','Electronics','Virtual Reality','Robotics','Mixed Reality','Space','Autonomous Technology','Drones','Cloud Networking','Warehousing','Metal Fabrication','Game Design','Vinyl Cutting','Energy Management','Data Software','Sensors','Internet of Things','Economic Development'
                ],
            selected_skeywords:[]
        }
    },
    methods:{
        notFound(item,array) {
            return array.indexOf(item)==-1?1:0
        },
        add_IKeywords(item) {
            this.selected_skeywords.push(item)
        },
        rm_IKeyword(item){
            this.selected_skeywords.splice(this.selected_skeywords.indexOf(item),1)
        },
        add_IKtoDB(item) {
            this.skill_keywords.push(item)
        },
        input_addtoIDB(item,array) {
            if(this.notFound(item,this.selected_skeywords)) {
            array.push(item)
            }
            this.s_keyword=null
        },
        skip: function(){
            bus.$emit('validated');
        } 
    },
    computed: {

    },created(){
        var self = this;
        bus.$on('grab_data', obj =>{ 
            if (obj.step != 'teacher_skills')
                return ;
            if (self.selected_skeywords.length >= 1){
                var obj = {};
                obj['teacher_skills'] = self.selected_skeywords;
                bus.$emit('form_completed', obj);
                bus.$emit('validated'); 
            } else { 
                Prompter().failed("missing field(s)!", "Hey there!");
            }
        });
    }
}
</script>
<style scoped>
.pc-tag {
    margin: 5px;
    font-size: 12px;
    padding-right:20px;
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
    padding-top:20px;
    padding-bottom:40px;
}

.pc-keyword-title {
    font-family: Raleway;
    font-size:20px;
    font-weight: 700;
    color:#939597;
    padding-top:9px;
    margin-left:30px;
    width:100px;
}

.pc-input-box {
    border:solid 0px #ffffff;
    font-family: "Raleway";
    color:#dbdcde;
    font-style: italic;
    font-size:20px;
    padding-left:0px;
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
