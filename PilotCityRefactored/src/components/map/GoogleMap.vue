<template>
  <div class="google-map" :id="mapname"></div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'GoogleMap',
  props: ['name', 'map_data', 'apikey', 'mapcenter'],
  data() {
      return{
          map: null,
          markers: null,
          markers_ref: null,
          last_marker: null
      }
  },
  watch:{
    mapcenter: function(){
      this.map.setCenter(this.mapcenter);
      var key = String(this.mapcenter.lat) + String(this.mapcenter.lng)

      var i = _.findIndex(this.markers_ref, ref => {return ref.key == key});
      if (this.last_marker)
        this.last_marker.setIcon('https://firebasestorage.googleapis.com/v0/b/pilotcity-firestore.appspot.com/o/add-label-button.png?alt=media&token=5f3e240e-1b9d-41dc-92bb-aaf6baac24e2')
      this.markers_ref[i].marker.setIcon('https://firebasestorage.googleapis.com/v0/b/pilotcity-firestore.appspot.com/o/active_marker%20(1).png?alt=media&token=72a11cb1-c853-41d7-bcbe-a9e75aeb8104')
      this.last_marker = this.markers_ref[i].marker;
    }
  },
  mounted: function () {
    this.markers = [];
    for (var i = 0; i < this.map_data.length; i++)
      this.markers.push(this.map_data[i].coordinate);
    const element = document.getElementById(this.mapname)
    const options = {
      zoom: 12,
      center: this.mapcenter,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        rotateControl: false
    }
    this.map = new google.maps.Map(element, options);
    this.pinAllClassroomsOnMap(this.map);
  },
   methods:{
    pinAllClassroomsOnMap(map){
        var ht = {}; // hashtable for lookup
        var pin_promises = [];
        var key;
        this.markers_ref = [];
      
        for (var i = 0; i < this.markers.length; i++)
        {
          key = String(this.markers[i].lat) + String(this.markers[i].lng);
          if(!ht[key])
          {
            var obj = {
              key: key,
              marker: 
              new google.maps.Marker({  position: this.markers[i],
                                        map: map,
                                        label: {text: i + "", color: "white"},
                                        icon: 'https://firebasestorage.googleapis.com/v0/b/pilotcity-firestore.appspot.com/o/add-label-button.png?alt=media&token=5f3e240e-1b9d-41dc-92bb-aaf6baac24e2'
                                      })
            };
            this.markers_ref.push(obj);
            ht[key] = true;
          } else {
            //console.log("same address : ) [" + key + "]");
            //console.log(JSON.stringify(this.map_data[i]))
          }
        }
        //
        // The following code accepts an array of formatted address(with space replaced by '+') and make ajax request to the 
        // google geolocation api and retrieves coordinates, use those coordinates as the position of the markers
        //
        // for (var i = 0; i < this.map_data.length; i++){
        //     pin_promises.push(axios.get(this.getLink(this.map_data[i])).then( response => {
        //         self.markers.push(response.data.results[0].geometry.location);
        //     }));
        // }
        // Promise.all(pin_promises).then(() => {
        //     for (var i = 0; i < self.markers.length; i++){
        //         self.markers_ref[i] = 
        //             new google.maps.Marker({  position: self.markers[i],
        //                                       map: map,
        //                                       label: {text: i + "", color: "white"},
        //                                       icon: 'https://firebasestorage.googleapis.com/v0/b/pilotcity-firestore.appspot.com/o/add-label-button.png?alt=media&token=5f3e240e-1b9d-41dc-92bb-aaf6baac24e2'
        //                                     });
        //     }
        // });
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
      mapname: this.name + "-map",
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