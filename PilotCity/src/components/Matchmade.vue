<template>
    <div>
        <div class="entire-box d-flex flex-row">
            
            <div class="d-flex  col-7 justify-content-center m-0 p-0">

            <div class="leftside flex-column d-flex col-12 p-0 m-0">

                <div class="filter-bar justify-content-center d-flex flex-row container p-0 m-0">
                    <div class="filter-button">Courses</div>
                    <div class="filter-button">Skills</div>
                    <div class="filter-button">Grades</div>
                    <div class="filter-button">Location</div>
                    <div class="filter-button">Class Size</div>
                </div>

                    <div class="cardstock d-flex row-12 container">

<div class="card container">

    <div class="one h-25">
        <h2 class="card-title">Computer Science AP</h2>
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
        <hr class="card-line"></hr>
        <div class="pc-tag">Text</div>
    </div>

</div>

    </div>

            </div>
            </div>

            <div class="google-maps container col-5 m-0 ml-auto p-0"></div>
                    
        </div>
    </div>
</template>

<script>

</script>


<style>

.pc-tag {
    width: 150px;
    height:31px;
    margin-top:12px;
    margin-bottom:12px;
    margin-left: 12px;
    border-radius:25px;
    text-align: center;
    padding-top:6px;
    font-family: "Raleway";
    font-weight: 700;
    color:#ffffff;
    font-size:12px;
    background-color:#eca0be;
}

.one {
    background-color: transparent;

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
    background-color:#dbdcde;
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
    background-color:#eca0be;
}

.entire-box {
    background-color: #f79960;
    height: 700px;
}

.leftside {
    background-color: #fdd25a;
    height: 700px;

}

.filter-bar{
    background-color: #ffffff;
    height:75px;

}

.filter-button {
    width:125px;
    height:45px;
    border-radius: 50px;
    background-color: #ffffff;
    margin: 15px 10px 15px 10px;
    text-align: center;
    padding-top:10px;
    font-family: "Raleway";
    color:#939597;
    font-weight:700;
    border: solid 1px #dbdcde;
}

.filter-button:hover {
    width:125px;
    height:45px;
    border-radius: 50px;
    background-color: #eca0be;
    margin: 15px 10px 15px 10px;
    text-align: center;
    padding-top:10px;
    font-family: "Raleway";
    color:#ffffff;
    border: solid 1px #eca0be;
    font-weight:700;
    cursor: pointer;
}

.cardstock {
    background-color: #ffffff;
    height:100%
}

.card {
    width:750px;
    height:225px;
    margin: 20px auto 20px auto;
    border: dashed 1px #dbdcde;
    border-radius: 25px;
    padding:0px;

}

.card-line {
    border-style: dashed;
    padding:0px;
    margin:0px;
}

.card-title {
    font-family: "Raleway";
    font-size: 18px;
    font-weight: 700;
    color: #939597;
    width: 500px;
    margin: 14px 0px 14px 100px;

}

.card-subtitle {
    font-family: "Raleway";
    font-size: 12px;
    font-weight: 700;
    text-align: right;
    color: #939597;
    padding:1px 5px 1px 1px;
    margin:0;
}

.card-subtitle-text {
    font-family: "Raleway";
    font-size: 12px;
    font-weight: 300;
    text-align: left;
    color: #939597;
    padding:1px 1px 1px 5px;
    margin:0;

}

.google-maps {
    background-color: #3c9ccc;
    height:100%;
}

</style>
