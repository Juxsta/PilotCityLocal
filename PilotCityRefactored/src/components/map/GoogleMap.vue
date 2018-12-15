<template>
  <div class="google-map" :id="mapName"></div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'GoogleMap',
  props: ['name', 'addresses', 'apikey'],
    data() {
        return{
            markers: null,
            markers_ref: null,
        }
    },
  mounted: function () {
    const element = document.getElementById(this.mapName)
    const options = {
      zoom: 12,
      center: new google.maps.LatLng(37.7249, -122.156),
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        rotateControl: false
    }
    const map = new google.maps.Map(element, options);
    this.pinAllClassroomsOnMap(map);
  },
   methods:{
    pinAllClassroomsOnMap(map){
        var self = this;
        var pin_promises = [];
        this.markers = [];
        this.markers_ref = [];
        for (var i = 0; i < this.addresses.length; i++){
            pin_promises.push(axios.get(this.getLink(this.addresses[i])).then( response => {
                self.markers.push(response.data.results[0].geometry.location);
            }));
        }
        Promise.all(pin_promises).then(() => {
            for (var i = 0; i < self.markers.length; i++){
                self.markers_ref[i] = 
                    new google.maps.Marker({position: self.markers[i],
                                            map: map,
                                            label: {text: i + "", color: "white"},
                                            icon: 'https://firebasestorage.googleapis.com/v0/b/pilotcity-firestore.appspot.com/o/add-label-button.png?alt=media&token=5f3e240e-1b9d-41dc-92bb-aaf6baac24e2'
                                            });
            }
        });
    },
    getLink(address){
      var api_link = "https://maps.googleapis.com/maps/api/geocode/json?address=";
      var key = "&key=" + this.apikey;
      return (api_link + address + key);
    },
    pinMarkerWithLink(link){
      axios.get(link).then( response => {
          self.markers.push(response.data.results[0].geometry.location);
      }).catch( error => {
          console.log(error.message);
      });
    }
   }
  ,
  data: function () {
    return {
      mapName: this.name + "-map",
    }
  }
};
</script>
<style scoped>
.google-map {
  height:100%;
  width:100%;
  margin: 0 auto;
  background-color:  grey;
}
</style>