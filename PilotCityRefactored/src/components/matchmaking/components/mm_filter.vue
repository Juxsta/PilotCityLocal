<template>
  <div>
    <b-btn class="filter__button" :id="'PopoverFilter' + name">{{name}}</b-btn>
    <b-popover :target="'PopoverFilter' + name" placement="bottom" triggers="focus">
      <div class="container">
        <b-form-group label>
          <b-form-checkbox-group
            stacked
            v-model="local_selected"
            @input="updateSelected"
            name="filter"
            :options="options"
            :style="{'overflow-x':'hidden'}"
          ></b-form-checkbox-group>
        </b-form-group>
      </div>
    </b-popover>
  </div>
</template>

<script>
import "@/assets/SASS/pages/_matchmaking.scss";
import "@/assets/SASS/components/_mm_filter_bar.scss";
import _ from "lodash";
export default {
  data() {
    return {
      local_selected: []
    };
  },
  props: {
    name: {
      default: "Filter",
      type: String
    },
    options: {
      required: true,
      type: Array
    },
    selected_options: {
      required: true,
      type: Array
    }
  },
  methods: {
    updateSelected() {
      var self = this;
      // if there is something in local_selected that is not in selected_options then add it
      var toadd = [];
      toadd = _.filter(self.local_selected, option => {
        // console.log(self.selected_options.indexOf(option) < 0);
        return self.selected_options.indexOf(option) < 0;
      });

      for (let element of toadd) {
        self.selected_options.push(element);
      }
      // console.log(self.selected_options);
      //if there is something in selected options that is not in local_selected then remove it
      var toremove = [];
      toremove = self.selected_options.filter(option => {
        return self.local_selected.indexOf(option) < 0;
      });
      for (let element of toremove) {
        self.selected_options.splice(self.selected_options.indexOf(element), 1);
      }
    }
  }
};
</script>

<style>

</style>
