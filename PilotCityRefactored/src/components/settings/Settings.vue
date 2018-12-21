<template>
    <div style="display:inline-block; width: 100%;">
        <div >
            <div style="text-align: center; background-color: white;">
                <p> {{doc}} </p>
            </div>
            <div style="">
                <!-- accept="file_extension|audio/*|video/*|image/*|media_type" -->
                <div style="width: 50%; margin:auto;">
                    <file_uploader :accept="'image/*'" :id="'settings_uploader'" :user_uid="uid" v-if="uid"
                    @file_uploaded="update_user_info"/>
                </div>
                <div style="width: 300px; margin:20px auto; border: solid 1px lightgrey">
                    <img :src="profile_image_url ? profile_image_url
                    : profile_iamge_default" :alt="profile_image_name" class="img-thumbnail settings__image--profile" >
                </div>
            </div>
            <div style="width: 300px; margin:20px auto;">
                <input type="password" class="form-control" placeholder="Old Password" v-model="old_password">
                <input type="password" class="form-control mt-1" placeholder="New Password" v-model="new_password"
                :style="{borderColor: (new_password == null || is_password_valid)  ? 'rgb(222, 223, 224)' : 'red'}">
                <input type="password" class="form-control mt-1" placeholder="Confirm New Password" v-model="new_password2"
                :style="{borderColor: (new_password2 == null || password_matched)  ? 'rgb(222, 223, 224)' : 'red'}">
                <b-btn class="_main__button mt-1" style="width: 200px; font-style:italic; font-weight: 400; color: white; "
                @click="reset_password">reset password</b-btn>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '@/firebase/init'
import *  as fb from 'firebase' 
import file_uploader from '@/components/settings/components/file_uploader'
export default {
    name: "Settings",
    components:{
        file_uploader
    },
    data(){
        return {
            doc: null,
            first_name: null,
            last_name: null,
            email: null,
            role: null,
            uid: null,
            profile_iamge_default: "https://paraklesiscounselling.com/wp-content/uploads/2017/04/My-Account-Icon.jpg", 
            profile_image_url: null,
            profile_image_name: null,
            old_password: null,
            new_password: null,
            new_password2: null
        }
    },
    computed:{
        is_password_valid(){
            return (this.new_password && this.new_password.length >= 6);
        },
        password_matched(){
            return (this.new_password == this.new_password2);
        }
    },
    methods:{
        reset_password(){
            var self = this;
            console.log(self.old_password != null && self.is_password_valid && self.password_matched)
            if (self.old_password && self.is_password_valid && self.password_matched)
                firebase.auth().currentUser.reauthenticateWithCredential(
                    fb.auth.EmailAuthProvider.credential(
                        firebase.auth().currentUser.email, 
                        self.old_password )
                ).then(() => {
                    firebase.auth().currentUser.updatePassword(self.new_password).then(() => {
                        alert("good job my boy it's working!");
                        self.new_password = null;
                        self.new_password2 = null;
                        self.old_password = null;
                    });
                }).catch(err => alert(err.message));
        },
        pullData(){
            var self = this;
            firebase.auth().onAuthStateChanged((user) => { 
                if (user)
                {
                    self.uid = user.uid;
                    const db = firebase.firestore();
                    db.collection('Users').doc(user.uid).get().then(doc => {
                        let user_data = doc.data();
                        if (user_data) {
                            self.email = user_data.email;
                            self.first_name = user_data.first_name;
                            self.last_name = user_data.last_name;
                            self.phone = user_data.phone;
                            self.role = 
                                (user_data.isTeacher ? 'teacher' : "") ||
                                (user_data.isEmployer ? 'employer' : "") ||
                                (user_data.isStudent ? 'student' : "");
                            self.profile_image_url = user_data.profile ? user_data.profile.url: null;
                            self.profile_image_name = user_data.profile ? user_data.profile.filename: null;
                            self.doc = user_data;
                        }
                    });
                }
            });
        },
        update_user_info(payload){
            // if case of user update his profile (he alreay has one, u have to delete the old one)
            // because the old one will be loaded in the created hook, if he has one 
            // the profile_image_name will be his old one
            if (this.profile_image_name != payload.filename)
                firebase.storage().ref().child('users/' + firebase.auth().currentUser.uid + '/user_profile/' + this.profile_image_name)
                .delete().then(() => { console.log("deleted!") });
            this.profile_image_url = payload.url;
            this.profile_image_name = payload.filename;
            db.collection('Users').doc(firebase.auth().currentUser.uid).update({ profile: payload }).then(()=> {
                console.log("u just got ur beautiful profile image!");
            });

            this.pullData(); // test only
        }
    },
    created(){
        var self = this;
        firebase.auth().onAuthStateChanged((user) => { 
            if (user)
            {
                self.uid = user.uid;
                const db = firebase.firestore();
                db.collection('Users').doc(user.uid).get().then(doc => {
                    let user_data = doc.data();
                    if (user_data) {
                        self.email = user_data.email;
                        self.first_name = user_data.first_name;
                        self.last_name = user_data.last_name;
                        self.phone = user_data.phone;
                        self.role = 
                            (user_data.isTeacher ? 'teacher' : "") ||
                            (user_data.isEmployer ? 'employer' : "") ||
                            (user_data.isStudent ? 'student' : "");
                        self.profile_image_url = user_data.profile ? user_data.profile.url: null;
                        self.profile_image_name = user_data.profile ? user_data.profile.filename: null;
                        self.doc = user_data;
                    }
                });
            }
        });
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/SASS/components/_button.scss";
</style>

<style scoped>
.settings__image--profile{
    background-color: lightgrey;
    padding: 50px;
    height: 300px;
    width: 300px;
}
</style>
