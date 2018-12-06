<template>
    <div class="container-fluid mt-5 mx-auto Raleway main_div">
        <div class="d-flex flex-row justify-content-left mr-5"> 
            <form>
                    <div>
                        <label for="lunch" class="labels">Birthdate</label> <br/>
                        <input type="text" name="Yes/No" placeholder="Yes/No" class="badge-pill pc-button">

                    </div>
            </form>
            <form>
                    <div class = "badge_wider">
                        <label for="lunch" class="labels">Home Address</label> <br/>
                        <input type="text" name="Yes/No" placeholder="123 Main Rd" class="badge-pill pc-button">

                    </div>

                </form>
        </div>
        <div class="d-flex flex-row justify-content-left mr-5" >
             <form>
                <div>
                        <label for="ethnicity" class = "labels">Ethnicity</label> <br/>
                        <input type="text" name="Ethnicity" placeholder="American" class="badge-pill pc-button">

                </div>

            </form>
            <form>
                <div class = "group labels">
                    <label for="language" class="labels">Family Language</label> <br/>
                    <input type="text" name="Yes/No" placeholder="Spanish" class="badge-pill pc-button">

                </div>

            </form>
             <form>
                <div class = "group labels">
                    <label for="gender" class="labels"> Supergender</label> <br/>
                    <input type="text" name="Yes/No" placeholder="Transgender Female" class="badge-pill pc-button">

                </div>

            </form>
        </div>
        <div class="d-flex flex-row justify-content-left mr-5" >
            <form>
                <div class = "group labels">
                    <label for="lunch" class="labels">Free or Reduced Lunch?</label> <br/>
                    <input type="text" name="Yes/No" placeholder="Yes/No" class="badge-pill pc-button">

                </div>

            </form>


        </div>

    </div>
</template>


<style scoped>
.main_div {
  width: 100%;
  padding-left: 100px;
    
}
.story-title {
    text-align: left;
    font-family: "Raleway";
    font-style: Italic;
    font-weight:700;
    font-size:20px;
    color:#6eba7f;
    margin-bottom:50px;
    margin-top:70px;
}

.pc-button {
    font-family: "Raleway";
    font-weight:300;
    font-style: Italic;
    background-color: #b8b8b8;
    color: white;
    border-radius: 50px;
    font-size:20px;
    height: 50px;
    width: 250px;
    text-align: center;
    padding-left: 30px;
    padding-right:30px;
    margin-left:5px;
    margin-right:5px;
    border-color: transparent;
}
.pc-button::placeholder {
    color:white;
    font-weight:500i;
    font-size:20px;
    text-align: center;

}
.teacher-story{
    color: green;
    font-size: 20px;
}
.text{
    color:#6eba7f;
}
.labels{
    color: green !important;
    font-size: 20px;
}
.badge_wider{
    width: 500px;
}
</style>
