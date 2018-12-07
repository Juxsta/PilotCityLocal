<template>
  <div>
    <div class="entire-box d-flex flex-row">
      <div class="d-flex col-7 justify-content-center m-0 p-0">
        <div class="leftside justify-content-center flex-column d-flex col-12 p-0 m-0">
          <div class="filter-bar justify-content-center d-flex flex-row container">
            <b-btn class="filter-button">Courses</b-btn>

            <b-btn class="filter-button" id="PopoverSkils">Skills</b-btn>

            <b-popover target="PopoverSkills" placement="auto">
                <div class="container">
                    <b-btn variant="primary">Stuff</b-btn>
                </div>
            </b-popover>
            <div class="filter-button">Grades</div>
            <div class="filter-button">Location</div>
            <div class="filter-button">Class Size</div>
          </div>

          <div class="cardstock d-flex flex-column row-12 container">
            <h2 class="text-classroom-matches">100+ Classrooms Recommended</h2>

            <div class="card container">
              <div class="one d-flex flex-row h-25">
                <i
                  class="material-icons justify-content-center"
                  id="favorite_border"
                >favorite_border</i>
                <h2 class="card-title">Computer Science AP</h2>
                <i class="material-icons justify-content-center" id="email">email</i>
                <button class="action-button mt-3">Accept</button>
                <i class="material-icons action-button-decline">clear</i>
              </div>

              <div class="two d-flex flex-row h-50">
                <div class="four w-25">
                  <h4 class="card-subtitle">Teacher</h4>
                  <h4 class="card-subtitle">Grades</h4>
                  <h4 class="card-subtitle">Class Size</h4>
                  <h4 class="card-subtitle">District</h4>
                  <h4 class="card-subtitle">School</h4>
                  <h4 class="card-subtitle">Address</h4>
                </div>
                <div class="five w-75">
                  <h4 class="card-subtitle-text">Anthony Keithley</h4>
                  <h4 class="card-subtitle-text">9th, 10th, 11th</h4>
                  <h4 class="card-subtitle-text">20-25</h4>
                  <h4 class="card-subtitle-text">San Leandro Unified</h4>
                  <h4 class="card-subtitle-text">San Leandro High School</h4>
                  <h4 class="card-subtitle-text">2250 Bancroft Avenue, San Leandro, CA 94577</h4>
                </div>
              </div>

              <div class="three h-25">
                <hr class="card-line">

                <span class="d-flex mr-2 ml-2">
                  <h3 class="btn btn-red">Python</h3>
                  <h3 class="pc-tag2">Javascript</h3>
                  <h3 class="pc-tag3">C++</h3>
                  <h3 class="pc-tag4">iOS</h3>
                  <h3 class="pc-tag5">Android</h3>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="google-maps container col-5 m-0 p-0">
        <google-map/>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "matchmade",
  data() {
      return {
          
      }
  }
};
</script>


<style lang="scss" scoped>

$white: #fff;
$black: #000;
$green: #6eba7f;
$blue: #3c9ccc;
$orange: #f79960;
$yellow: #fdd25a;
$red: #ea6763;
$purple:#ae90b0;
$pink: #eca0be;

$popover-max-width:1000px;
.text-classroom-matches {
  font-family: "Raleway";
  font-size: 20px;
  color: #939597;
  font-weight: 700;
  margin: 30px auto 15px auto;
}

.pc-tag1 {
  width: 150px;
  height: 31px;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 6px;
  margin-right: 6px;
  border-radius: 25px;
  text-align: center;
  padding-top: 8px;
  font-family: "Raleway";
  font-weight: 700;
  color: #ffffff;
  font-size: 12px;
  background-color: #6eba7f;
}

.pc-tag2 {
  width: 150px;
  height: 31px;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 6px;
  margin-right: 6px;
  border-radius: 25px;
  text-align: center;
  padding-top: 8px;
  font-family: "Raleway";
  font-weight: 700;
  color: #ffffff;
  font-size: 12px;
  background-color: #3c9ccc;
}

.pc-tag3 {
  width: 150px;
  height: 31px;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 6px;
  margin-right: 6px;
  border-radius: 25px;
  text-align: center;
  padding-top: 8px;
  font-family: "Raleway";
  font-weight: 700;
  color: #ffffff;
  font-size: 12px;
  background-color: #ea6763;
}

.pc-tag4 {
  width: 150px;
  height: 31px;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 6px;
  margin-right: 6px;
  border-radius: 25px;
  text-align: center;
  padding-top: 8px;
  font-family: "Raleway";
  font-weight: 700;
  color: #ffffff;
  font-size: 12px;
  background-color: #fdd25a;
}

.pc-tag5 {
  width: 150px;
  height: 31px;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 6px;
  margin-right: 6px;
  border-radius: 25px;
  text-align: center;
  padding-top: 8px;
  font-family: "Raleway";
  font-weight: 700;
  color: #ffffff;
  font-size: 12px;
  background-color: #f79960;
}

#favorite_border {
  color: #dbdcde;
  margin: auto 0px auto 35px;
}

#favorite_border:hover {
  color: #eca0be;
  margin: auto 0px auto 35px;
  cursor: pointer;
}

#favorite_border:active {
  color: #c47e9b;
  margin: auto 0px auto 35px;
  cursor: pointer;
}

.one {
  background-color: transparent;
}

.action-button {
  width: 125px;
  height: 25px;
  border-radius: 50px;
  background-color: #ffffff;
  border: solid 2px #6eba7f;
  color: #6eba7f;
  font-family: "Raleway";
  font-weight: 700;
  font-size: 11px;
  margin: auto;
  padding-top: 3px;
}

.action-button:hover {
  width: 125px;
  height: 25px;
  border-radius: 50px;
  background-color: #6eba7f;
  border: 0px;
  color: #ffffff;
  font-family: "Raleway";
  font-weight: 700;
  font-size: 11px;
  margin: auto;
  padding-top: 3px;
}

.action-button:active {
  width: 125px;
  height: 25px;
  border-radius: 50px;
  background-color: #408b54;
  border: 0px;
  color: #ffffff;
  font-family: "Raleway";
  font-weight: 700;
  font-size: 11px;
  margin: auto;
  padding-top: 3px;
}

.action-button-decline {
  border-radius: 5px;
  width: 17px;
  height: 17px;
  background-color: #ea6763;
  border: 0px;
  margin: auto 20px auto auto;
  color: #ffffff;
  font-size: 80%;
  text-align: center;
  padding-top: 3px;
  font-weight: 700;
  cursor: pointer;
}

.action-button-decline:hover {
  border-radius: 5px;
  width: 17px;
  height: 17px;
  background-color: #bb3e40;
  border: 0px;
  margin: auto 20px auto auto;
}

.action-button-decline:active {
  border-radius: 5px;
  width: 17px;
  height: 17px;
  background-color: #ea6763;
  border: 0px;
  margin: auto 20px auto auto;
}

#email {
  font-size: 22px;
  color: #c6c8ca;
  margin: auto;
}

#email:hover {
  font-size: 22px;
  color: #939597;
  margin: auto;
  cursor: pointer;
}

#email:active {
  font-size: 22px;
  color: #c6c8ca;
  margin: auto;
  cursor: pointer;
}

.two {
  background-color: transparent;
}

.three {
  background-color: transparent;
}

.four {
  background-color: transparent;
}

.five {
  background-color: transparent;
}

.six {
  background-color: #dbdcde;
}

.seven {
  background-color: #3c9ccc;
}

.eight {
  background-color: #f79960;
}

.nine {
  background-color: #fdd25a;
}

.ten {
  background-color: #eca0be;
}

.entire-box {
  background-color: #f79960;
}

.leftside {
  background-color: #fdd25a;
  height: 100vh;
  overflow: scroll;
}

.filter-bar {
  background-color: #ffffff;
  height: 75px;
}

.filter-button {
  width: 125px;
  height: 45px;
  border-radius: 50px;
  background-color: #ffffff;
  margin: 15px 10px 15px 10px;
  text-align: center;
  padding-top: 10px;
  font-family: "Raleway";
  color: #939597;
  font-weight: 700;
  border: solid 1px #dbdcde;
}

.filter-button:hover {
  width: 125px;
  height: 45px;
  border-radius: 50px;
  background-color: #eca0be;
  margin: 15px 10px 15px 10px;
  text-align: center;
  padding-top: 10px;
  font-family: "Raleway";
  color: #ffffff;
  border: solid 1px #eca0be;
  font-weight: 700;
  cursor: pointer;
}

.cardstock {
  background-color: #ffffff;
  height: 100%;
  overflow: scroll;
}

.card {
  width: 750px;
  height: 225px;
  margin: 20px auto 20px auto;
  border: dashed 1px #dbdcde;
  border-radius: 25px;
  padding: 0px;
}

.card-line {
  border-style: dashed;
  padding: 0px;
  margin: 0px;
}

.card-title {
  font-family: "Raleway";
  font-size: 18px;
  font-weight: 700;
  color: #939597;
  width: 400px;
  margin: 14px 0px 14px 35px;
  padding-top: 3px;
}

.card-subtitle {
  font-family: "Raleway";
  font-size: 12px;
  font-weight: 700;
  text-align: right;
  color: #939597;
  padding: 1px 5px 1px 1px;
  margin: 0;
}

.card-subtitle-text {
  font-family: "Raleway";
  font-size: 12px;
  font-weight: 300;
  text-align: left;
  color: #939597;
  padding: 1px 1px 1px 5px;
  margin: 0;
}

.google-maps {
  background-color: #3c9ccc;
}

//bootstrap imports

</style>
