<template>
  <div>
    <b-btn class="filter__button" id="PopoverSkills">Skills</b-btn>

    <b-popover target="PopoverSkills" placement="bottom">
      <div class="container-fluid row">
        <b-btn class="col-12" 
        :class="colors[Math.floor(Math.random()*7)]" >stuff</b-btn>
        <b-btn class="col-12" 
        :class="colors[Math.floor(Math.random()*7)]" >stuff</b-btn>
        <b-btn class="" 
        :class="colors[Math.floor(Math.random()*7)]" >stuff</b-btn>
        <b-btn class="" 
        :class="colors[Math.floor(Math.random()*7)]" >stuff</b-btn>
        <b-btn class="" 
        :class="colors[Math.floor(Math.random()*7)]" >stuff</b-btn>
      </div>
    </b-popover>
  </div>
</template>

<script>
import "@/assets/SASS/pages/_matchmaking.scss";
import "@/assets/SASS/components/_filter_skills.scss";
export default {
  data() {
    return {
      colors: [
        "selected_tag--green",
        "selected_tag--purple",
        "selected_tag--orange",
        "selected_tag--blue",
        "selected_tag--yellow",
        "selected_tag--pink",
        "selected_tag--red"
      ]
    };
  },
  props: {
    skills: {
      required: true,
      type: Array
    },
    selected_skills: {
      required: true,
      type: Array
    }
  }
};
</script>

