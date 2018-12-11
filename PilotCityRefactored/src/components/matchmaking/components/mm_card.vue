<template>
  <div class="card container">
    <div class="one d-flex flex-row h-25">
      <i class="material-icons justify-content-center" id="favorite_border">favorite_border</i>
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
        <h3 class="pc-tag1">Python</h3>
        <h3 class="pc-tag2">Javascript</h3>
        <h3 class="pc-tag3">C++</h3>
        <h3 class="pc-tag4">iOS</h3>
        <h3 class="pc-tag5">Android</h3>
      </span>
    </div>
  </div>
</template>
<script>
export default {
    props:{
        classroom:{
            required:true
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
