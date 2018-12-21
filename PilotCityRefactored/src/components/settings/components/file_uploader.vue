<template>
    <div>
        <div class="input-group">
            <div class="custom-file">
                <input type="file" class="custom-file-input" :id="id" :accept="accept" @change="select_file">
                <label class="custom-file-label">{{label}}</label>
            </div>
            <button class="btn btn-secondary" @click="upload" :disabled="!selected_file">Upload</button>
            <button class="btn btn-danger" @click="deleteImg">delete(test env only)</button>
        </div>
    </div>
</template>

<script>
import firebase from '@/firebase/init'
export default {
    name: "file_uploader",
    props:{
        id: String,
        accept: String,
        user_uid:{
            type: String,
            require: true
        }
    },
    data(){
        return {
            selected_file: null,
            label: "Choose file",
            profile_image_url: null,
            profile_image_name: null
        }
    },
    methods:{
        deleteImg(){ // this is not needed
            var self = this;
            if (self.profile_image_name || self.$parent.doc.profile.filename)
            {    firebase.storage().ref().child('users/' + self.user_uid + '/user_profile/' + self.profile_image_name ? self.profile_image_name : self.$parent.doc.profile.filename)
                .delete().then(() => {
                    console.log("deleted1!")
                });
                if (self.$parent.doc.profile.filename)
                    firebase.firestore().collection('Users').doc(self.user_uid).update({profile: null}).then(() => {
                        console.log("deleted2! Refresh the page, it will delete")
                    });
            }
        },
        select_file(){
            this.selected_file = document.getElementById(this.id).files[0];
            if (this.selected_file)
                this.label = this.selected_file.name;
        },
        upload(){
            if (!this.user_uid)
                return ;
            var self = this;
            var this_file = this.selected_file;
            var storageRef = firebase.storage().ref();
            storageRef.child('users/' + self.user_uid + '/user_profile/' + this_file.name).put(this_file).then(file => {
                file.ref.getDownloadURL().then((url) => {
                    self.profile_image_url = url;
                    self.profile_image_name = this_file.name;
                    var payload = {
                        filename: this_file.name,
                        url: url
                    }
                    self.$emit('file_uploaded', payload);
                });
            });
        }
    },
    watch:{
        // selected_file: function(){
        //     console.log("hey man u just selected: " + this.selected_file.name);
        // },
         
    },
    mounted(){
    },
    created(){
    }
}
</script>

<style>

</style>
