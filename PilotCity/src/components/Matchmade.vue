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

                <div class="cardstock d-flex row-12 container p-0 m-0">

                    <div class="card d-flex flex-column">
                        <div class="col-2">
                            <div class="d-flex flex-row">
                                <div class="col-2"></div>
                                <div class="col-6">
                                    <div class="col"
                                </div>
                                <div class="col-4"></div>

                            </div>

                        </div>

                        <div class="col-10">

                        </div>




                        <hr class="card-line mt-auto m-0">

                    </div>

                </div>

            </div>
            </div>

            <div class="google-maps container col-5 m-0 ml-auto p-0">Map</div>
                    
        </div>
    </div>
</template>

<script>

</script>


<style>

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
    height:200px;
    margin: 20px auto 20px auto;
    border: dashed 1px #dbdcde;
    border-radius: 25px;
}

.card-line {
    border-style: dashed;
    padding-bottom: 50px;
}

.card-title {
    font-family: "Raleway";
    font-size: 18px;
    font-weight: 700;
    color: #939597;
    margin: 15px 15px 15px 15px;
}

.card-subtitle {
    font-family: "Raleway";
    font-size: 12px;
    font-weight: 700;
}

.google-maps {
    background-color: #3c9ccc;
    height:100%;
}


</style>
