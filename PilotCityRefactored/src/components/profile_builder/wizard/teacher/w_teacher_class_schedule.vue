<template>
  <div class="container container-fluid justify-content-center mr-auto ml-auto">
    <form class="mt-5">
      <div class="form-row mt-auto" v-for="(period,index) in Periods" :key="period.uid">
        <i
          class="material-icons font-weight-bold mr-2"
          id="delete_class"
          :class="[{first_trash:Periods.indexOf(period)==0},{white:getuid(index)+'0'==period.uid}]"
          @click="rmThisClass(period.uid)"
        >clear</i>
        <!-- <span>{{(db_classes[index])}}</span> -->
        <div class="form-group-period">
          <label v-if="Periods.indexOf(period)==0">Period</label>
          <select class="custom-select" v-model="period.period">
            <option selected>Select Period</option>
            <option v-if="pool[0].status" value="0">P0</option>
            <option v-if="pool[1].status" value="1">P1</option>
            <option v-if="pool[2].status" value="2">P2</option>
            <option v-if="pool[3].status" value="3">P3</option>
            <option v-if="pool[4].status" value="4">P4</option>
            <option v-if="pool[5].status" value="5">P5</option>
            <option v-if="pool[6].status" value="6">P6</option>
            <option v-if="pool[7].status" value="7">P7</option>
          </select>
        </div>
        <div class="form-group-days">
          <label v-if="Periods.indexOf(period)==0">Days</label>
          <div>
            <button
              class="btn btn-secondary dropdown-toggle align-items-end btn-block dropdown-class select-class-placeholder"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <!-- <span :id="period.uid">Select </span> -->
              <span v-if="!period.days.length">Select</span>
              <span v-if="period.days.length">
                <span>Selected:</span>
                <span v-for="(day,index) in period.days" :key="index">
                  {{day}}
                  <span v-if="period.days.indexOf(day) != period.days.length-1">,</span>
                </span>
              </span>
            </button>
            <div class="dropdown-menu mr-auto ml-auto" aria-labelledby="dropdownMenuButton">
              <div class="checkbox dropdown-item checkbox-container mr-auto ml-auto">
                <input type="checkbox" value="M" v-model="period.days">
                <label class="checkbox-label">Monday</label>
              </div>
              <div class="checkbox dropdown-item checkbox-container mr-auto ml-auto">
                <input type="checkbox" value="T" v-model="period.days">
                <label class="checkbox-label">Tuesday</label>
              </div>
              <div class="checkbox dropdown-item checkbox-container mr-auto ml-auto">
                <input type="checkbox" value="W" v-model="period.days">
                <label class="checkbox-label">Wednesday</label>
              </div>
              <div class="checkbox dropdown-item checkbox-container mr-auto ml-auto">
                <input type="checkbox" value="Th" v-model="period.days">
                <label class="checkbox-label">Thursday</label>
              </div>
              <div class="checkbox dropdown-item checkbox-container mr-auto ml-auto">
                <input type="checkbox" value="F" v-model="period.days">
                <label class="checkbox-label">Friday</label>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group-starttime">
          <label v-if="Periods.indexOf(period)==0">Start Time</label>
          <input type="time" class="form-control" v-model="period.start_time">
        </div>
        <div class="form-group-endtime dropdown">
          <label v-if="Periods.indexOf(period)==0">End Time</label>
          <input type="time" class="form-control" v-model="period.end_time">
        </div>
      </div>
    </form>
    <button
      id="btn-class-add"
      type="button"
      class="btn btn-primary btn-lg btn-block"
      @click="pushPeriod()"
    >
      <i class="material-icons font-weight-bold add-button">add</i>
    </button>
    <!-- <button class="btn-lg" @click="view(Class)"></button> -->
      <div @click="submit">
            <next_button
                route ='w_teacher_industry_keywords'
                :conditions ="teacher_data"
                :collection = collection
                :pass = pass
                :errormsg = "errormsg"
                />
        </div>
    <router-link :to="{ name: 'w_teacher_class' }" class="prev_button btn btn-secondary btn-lg">Back</router-link>
  </div>
</template>
<script>
import { bus } from "@/main";
import firebase from "@/firebase/init";
import { Prompter } from "@/main";
import button from "@/components/profile_builder/wizard/components/button";
import _ from "lodash";
export default {
  name: "w_teacher_class_schedule",
  data() {
    return {
      Periods: [
        {
          uid: new Date().getTime(),
          period: null,
          days: [],
          start_time: null,
          end_time: null
        }
      ],
      pval: [0, 1, 2, 3, 4, 5, 6, 7],
      selectpval: [],
      pool: [
        { status: true },
        { status: true },
        { status: true },
        { status: true },
        { status: true },
        { status: true },
        { status: true },
        { status: true }
      ],
      errormsg: null,
      collection: ["teachers"],
      db_classes: [],
      data_from_prev_page: [],
    };
  },
  components: {
    next_button: button
  },
  computed: {
    filled() {
      let Periods = this.Periods;
      let arr = [];
      return Periods.every(period => {
        return Object.values(period).every(field => {
          return field != null;
        });
      });
    },
    schedules() {
      var self = this;
      let schedule = [];
      var arr = [];
      for (let period = 0; period < self.Periods.length; period++) {
        /* return self.Periods[period].days[0] */
        for (let i = 0; i < self.Periods[period].days.length; i++) {
          schedule.push({
            [self.Periods[period].days[i]]: {
              start_time: self.Periods[period].start_time,
              end_time: self.Periods[period].end_time
            }
          });
        }
        arr.push({ Period: self.Periods[period].period, schedule });
        schedule = [];
      }
      return arr;
    },
    merged_schedules() {
      let merged = [];
      for (let i in this.schedules) {
        for (let j = 1; j < this.schedules.length; j++) {
          if (i != j && this.schedules[i].Period == this.schedules[j].Period) {
            let obj = {};
            let new_schedule = {};
            obj.Period = this.schedules[i].Period;
            new_schedule = _.merge({}, [
              this.schedules[i].schedule,
              this.schedules[j].schedule
            ]);
            new_schedule = _.flatMap(new_schedule, day => {
              return day;
            });
            obj.schedule = new_schedule;
            merged.push(obj);
          }
        }
        if (
          merged.every(obj => {
            return obj.Period != this.schedules[i].Period;
          })
        ) {
          merged.push(this.schedules[i]);
        }
      }
      return merged;
    },
    pass() {
      return this.filled && !this.errormsg;
    },
    format_schedule() {
      var arr = [];
      var obj = {};
      obj["classes"] = [];
      var schedules = this.merged_schedules;
      for (let schedule in schedules) {
        var class_obj = this.Periods.filter(period => {
          return period.period == schedules[schedule].Period;
        });
        arr.push(schedules[schedule]);
      }
      return arr;
    },
    teacher_data() {
      var classes = [];
      for (let clas in this.db_classes) classes.push(this.db_classes[clas]);
      let new_format = Object.assign({}, this.format_schedule);
      _.map(classes, function(obj) {
        // add the properties from second array matching the userID
        // to the object from first array and return the updated object
        return _.assign(obj, _.find(new_format, { Period: obj.Period }));
      });
      return [{ classes }];
    }
  },
  created() {
    var self = this;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var new_periods = [];
        const db = firebase.firestore();
        db.collection("teachers")
          .doc(user.uid)
          .get()
          .then(doc => {
            let obj = doc.data();
            //console.log(obj) // the obj data
            let hasData = false;
            //create a local copy of class data in order to push to the database
            this.db_classes = Object.assign({}, obj.classes);
            for (let temp in obj.classes) {
              //check if we had submit before
              if (obj.classes[parseInt(temp)].schedule) hasData = true;
            }
            if (hasData) {
              // if we had submmitted data before, parse it back and just self.Periods.push accordingly
              // which will be rendered to the view
              for (let temp in obj.classes) {
                let clas = obj.classes[temp];
                if (clas.schedule) {
                  for (
                    let day_temp = 0;
                    day_temp < clas.schedule.length;
                    day_temp++
                  ) {
                    var new_period = {
                      uid: clas.uid + day_temp,
                      period: obj.classes[parseInt(temp)].Period,
                      days: [],
                      start_time: null,
                      end_time: null
                    };
                    let day = clas.schedule[day_temp];
                    //create an array of days with the same start and end times to merge
                    //console.log(day)
                    day = day[Object.keys(day)[0]];
                    let to_merge = _.filter(clas.schedule, day_obj => {
                      let days = day_obj[Object.keys(day_obj)[0]];
                      return (
                        days.start_time == day.start_time &&
                        days.end_time == day.end_time
                      );
                    });
                    //remove those days from the array
                    clas.schedule = _.filter(clas.schedule, day_obj => {
                      let days = day_obj[Object.keys(day_obj)[0]];
                      return (
                        days.start_time != day.start_time ||
                        days.end_time != day.end_time
                      );
                    });
                    //merge array of objects in to_merge
                    new_period.days = _.flatMapDeep(to_merge, days => {
                      return Object.keys(days);
                    });
                    let first_obj = to_merge[Object.keys(to_merge)[0]];
                    new_period.start_time =
                      first_obj[Object.keys(first_obj)[0]].start_time;
                    new_period.end_time =
                      first_obj[Object.keys(first_obj)[0]].end_time;
                    self.Periods.push(new_period);
                  }
                }
                else {
                    var new_period = {
                      uid: clas.uid,
                      period: obj.classes[parseInt(temp)].Period,
                      days: [],
                      start_time: null,
                      end_time: null
                    };
                    self.Periods.push(new_period)
                }
              }
              //check if we had submit before
            } else {
              // if we havent submit any data before, then we just pull it from last page
              for (let temp in obj.classes) {
                var uid = obj.classes[temp].uid;
                self.Periods.push({
                  uid: uid,
                  period: obj.classes[parseInt(temp)].Period,
                  days: [],
                  start_time: null,
                  end_time: null
                });
                self.data_from_prev_page.push(uid);
              }
            }
            self.Periods.shift();
          });
      }
    });
  },
  methods: {
    getuid(index){
      if(this.db_classes[index])
        return this.db_classes[index]["uid"]
    },
    submit(){
      for (let i in this.teacher_data[0].classes)
      {
          this.teacher_data[0].classes[i].teacher_uid = firebase.auth().currentUser.uid;
          firebase.firestore().collection("classroom").doc(this.teacher_data[0].classes[i].uid).set(
              this.teacher_data[0].classes[i]
          );
      }
    },
    parseDBSchedule(scheudle) {
      return;
    },
    variableSelect(event, Obj) {
      switch (event.target.value) {
        case "0":
          Obj.min = 0;
          Obj.max = 10;
          break;
        case "1":
          Obj.min = 11;
          Obj.max = 15;
          break;
        case "2":
          Obj.min = 16;
          Obj.max = 20;
          break;
        case "3":
          Obj.min = 21;
          Obj.max = 25;
          break;
        case "4":
          Obj.min = 26;
          Obj.max = 30;
          break;
        case "5":
          Obj.min = 30;
          Obj.max = null;
          break;
      }
    },
    pushPeriod() {
      this.Periods.push({
        uid: new Date().getTime(),
        period: null,
        days: [],
        start_time: null,
        end_time: null
      });
    },
    checkbox_changed: function(e, id, arr) {
      document.getElementById(id).innerText = "Selected: " + arr;
    },
    rmThisClass: function(uid) {
      if (this.data_from_prev_page.includes(uid)) {
        Prompter().failed("This period can't be removed.", "Hey there,");
        return ;
      }
      // console.log(uid);
      // firebase.firestore().collection("classroom").doc(uid).delete().then(function() {
      //   Prompter().success("This period has been delete.", "Hey there,");
      // }).catch(err => {
      //     Prompter().failed("This period can't be removed. ( " + err.msg + ")", "Hey there,");
      // });
      this.Periods = this.Periods.filter(object => {
        return object.uid != uid;
      });
      // console.log(this.Periods);
      // console.log(this.teacher_data);
    },
    popVal: function(val, event) {
      this.pool[val] = false;
    },
    selected: function(val) {
      return this.pval.indexOf(val) > -1 || this.selectpval.indexOf(val) > -1;
    }
  }
};
</script>
<style scoped>
#delete_class {
  cursor: pointer;
  color: lightgray;
  margin-top: 22px;
  font-size: 100%;
  margin-left: 42px;
}
.white{
  background-color: white !important;
  color: white !important;
  cursor:default !important;
}
.first_trash {
  padding-top: 31px;
}
label {
  color: #eca0be;
  font-weight: bold;
  font-size: 15px;
  margin-left: 15px;
}
input,
input:focus,
select,
select:focus {
  border-radius: 50px;
  font-size: 18px;
  padding-left: 20px;
  font-style: Italic;
  font-family: "Raleway";
  background-color: rgb(222, 223, 224);
  color: white;
  outline: none !important;
  font-weight: 300;
  height: 50px;
  border-color: #dbdcde;
  box-shadow: none !important;
}
.dropdown-class,
.dropdown-class:focus {
  border-radius: 50px;
  font-size: 18px;
  font-style: Italic;
  font-family: "Raleway";
  background-color: rgb(222, 223, 224) !important;
  color: white;
  outline: none !important;
  font-weight: 300;
  height: 50px;
  border-color: #dbdcde;
  box-shadow: none !important;
}
input:focus,
select:focus,
.dropdown-class:focus {
  border-color: #939597 !important;
}
input::placeholder {
  color: white;
}
.dropdown-item {
  cursor: pointer;
}
input[type="checkbox"] {
  height: 25px;
}
.checkbox-label {
  padding-left: 10px;
}
#btn-class-add {
  border: dashed 1px #dbdcde;
  background: white;
  color: #eca0be;
  border-radius: 50px;
  height: 50px;
  width: 682px;
  margin-left: 220px;
  margin-top: 10px;
}
#btn-class-add:hover {
  border: solid 1px #dbdcde;
}
#btn-class-add:focus {
  border: dashed 1px #dbdcde;
  background: white;
  color: white;
  border-radius: 50px;
}
.add-button {
  margin-top: 4px;
  color: #eca0be;
}
.select-class-placeholder {
  font-size: 18px;
  text-align: left;
  padding-left: 20px;
}
.custom-select {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='white' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E");
}
.form-row {
  margin-left: 150px;
  margin-right: 125px;
}
.form-group-period {
  width: 100px;
  margin: 5px;
}
.form-group-days {
  width: 250px;
  margin: 5px;
}
.form-group-starttime {
  width: 150px;
  margin: 5px;
}
.form-group-endtime {
  width: 150px;
  margin: 5px;
}
.dropdown-item:focus,
.dropdown-item:active,
.dropdown-item:checked {
  background-color: white !important;
}
.select-class-placeholder {
  border: none;
}
</style>