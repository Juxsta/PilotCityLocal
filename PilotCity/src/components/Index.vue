<template>
    <div>     
        <b-container id="landing-page" class="supreme-container">
            <b-jumbotron  id="landing-jumbo"
                        header="Connecting classrooms to the big bad world."
                        fluid
                        container-fluid
                        style="background-image: url('img/header.jpg'); background-size: cover; height: 100%">


            <div class="spacer"></div>
            <div class="landing-buttons-container">
                <b-btn class=" landing-btn teacher-btn rounded-30" variant="primary" href="https://bootstrap-vue.js.org/">For Teachers</b-btn>
                <b-btn class="landing-btn employer-btn rounded-30" variant="secondary" href="https://bootstrap-vue.js.org/">For Employers</b-btn>
            </div>
            </b-jumbotron>
        </b-container>
    </div>
</template>

<script>
export default {
    data() {
        return{
            
        }
    }
}
</script>
