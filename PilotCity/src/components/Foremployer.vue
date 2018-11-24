<template>
    <div class="body container-fluid p-0 m-0">
        
    <div class="background-video">
        <video autoplay muted loop id="myVideo">
        <source src="@/assets/clip1.mp4" type="video/mp4">
    </video>
    </div>

        <div class="all-body">

            <div class="letter-title">
            Dear Employers,
            </div>

            <div class="letter-body">
           It was excellent to have you hear about us through a source I can't think of right now. Our program is addressing the incredible challenges our employers are facing in the midst of a transformative economy towards the digital age. With the unemployment rate at a low and the growing pains of digitally transformation, we are creating a workforce solution that goes deeper into the rabbit hole than most do not care to enter. That black box is the inevitable rehabilitation and reinvigoration of high school classrooms and their connectedness to the real world. If you must, we invite you to go down the rabbit hole deeper.
            </div>
        
        </div>

        <div>

            <div class="feature-body m-auto">
                <div class="d-flex flex-row">
                    <div class="feature1 d-flex flex-column w-50">
                        <div class="feature-title">CLASSROOM MATCHES</div>
                        <div class="feature-description">View classrooms best fit to tackle your project challenges</div>
                    </div>
                    <img class="image1" src="../assets/foremployer1.jpg" alt="foremployer1"></img>
                </div>
            </div>


            <div class="feature-body m-auto">
                <div class="d-flex flex-row">
                    <img class="image2" src="../assets/foremployer2.jpg" alt="foremployer2"></img>
                    <div class="feature2 flex-column d-flex w-50">
                        <div class="feature-title">CHALLENGE DASHBOARD</div>
                        <div class="feature-description">Keep tabs on student projects as they develop in the classroom</div>
                    </div>
                </div>
            </div>

            <div class="feature-body m-auto">
                <div class="d-flex flex-row">
                    <div class="feature3 d-flex flex-column w-50">
                        <div class="feature-title">CONNECT BAR</div>
                        <div class="feature-description">Advise student teams efficiently and effectivey</div>
                    </div>
                    <img class="image3" src="../assets/foremployer3.jpg" alt="foremployer3"></img>
                </div>
            </div>


            <div class="feature-body m-auto">
                <div class="d-flex flex-row">
                    <img class="image4" src="../assets/foremployer4.jpg" alt="foremployer4"></img>
                    <div class="feature4 d-flex flex-column w-50">
                        <div class="feature-title">PROJECT SCAFFOLD</div>
                        <div class="feature-description">Steer the curriculum framework to meet your organization’s goals</div>
                    </div>
                </div>
            </div>

            <div class="feature-body m-auto">
                <div class="d-flex flex-row">
                    <div class="feature5 d-flex flex-column w-50">
                         <div class="feature-title">OFFER EXPERIENCES</div>
                        <div class="feature-description">Assess talent and offer experiences to your future workforce</div>
                    </div>
                    <img class="image5" src="../assets/foremployer5.jpg" alt="foremployer5"></img>
                </div>
            </div>

        <div class="all-body">
        </div>




        </div>

    </div>

</template>



<script>
export default {
    name:'Foremployer',
    data() {
        return {

        }
    },

}
</script>

<style>

.background-video {
    position: inherit;
    width: 100vh;
    height: 100vh;
    background-color: rgba(1,1,1, .5);
    display: block;
    z-index: 10;

}

#myVideo {
width:100vh;
height: 100%;
z-index: -1;

}

.feature-title {
    font-family: "Raleway";
    color: #ffffff;
    font-size: 15px;
    letter-spacing: 2px;
    font-weight: 800;
    margin-left: 100px;
    margin-top: 100px;
    margin-bottom:20px;
}

.feature-description {
    font-family: "Raleway";
    color: #ffffff;
    font-size: 30px;
    font-weight: 00;
    margin-left: 100px;
    margin-right:100px;
}


.all-body{
    padding-top:75px;
    padding-left:200px;
    padding-right:200px;
    height: 100vh;
}

.body{
    background-color: #404041;
    height: 100vh;
    overflow:scroll;
}

.feature-body{
}

.feature1 {
    background-color: #6eba7f;
}

.feature2 {
    background-color: #3c9ccc;
}

.feature3 {
    background-color: #fdd25a;
}

.feature4 {
    background-color: #f79960;
}

.feature5 {
    background-color: #ae90b0;
}

.image1 {
    height:50%;
    width: 50%;
}

.image2 {
    height:50%;
    width: 50%;
}

.image3 {
    height:50%;
    width: 50%;
}

.image4 {
    height:50%;
    width: 50%;
}

.image5 {
    height:50%;
    width: 50%;
}



.letter-title {
    color: #ae90b0;
    font-family: 'Raleway';
    font-size: 2rem;
    font-weight: 700;
}

.letter-body {
    color: #ae90b0;
    font-family: 'Raleway';
    font-size: 2rem;
    font-weight: 100;
    margin-bottom: 125px;
}

</style>
