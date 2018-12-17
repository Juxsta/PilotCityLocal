<template>
  <div class="google-map" :id="mapname"></div>
</template>

<script>
import * as firebase from 'firebase';
import db from "@/firebase/init";
export default {
  name: 'GoogleMap',
  props: ['name', 'map_data', 'apikey', 'mapcenter'],
  data() {
      return{
          mapname: this.name + "-map",
          map: null,
          markers: null,
          markers_ref: null,
          last_marker: null,
          e_marker: null,
          marker_icons: {
            selected: { url: 'https://firebasestorage.googleapis.com/v0/b/pilotcity-firestore.appspot.com/o/Asset%208%20(1).svg?alt=media&token=17b78b70-ed65-4dc3-8932-6629b7a5b627',
                        labelOrigin: new google.maps.Point(25, 19),
                        scaledSize: new google.maps.Size(50, 50)},
            teacher_home: {  url: 'https://firebasestorage.googleapis.com/v0/b/pilotcity-firestore.appspot.com/o/Asset%2010.svg?alt=media&token=db53f2dd-1f93-4e44-8304-c3d5199f06f1',
                        labelOrigin: new google.maps.Point(25, 19),
                        scaledSize: new google.maps.Size(50, 50)},
            teacher: {  url: 'https://firebasestorage.googleapis.com/v0/b/pilotcity-firestore.appspot.com/o/Asset%2011.svg?alt=media&token=6294fa37-a527-4ff5-a5cb-a73d6f351d41',
                        labelOrigin: new google.maps.Point(25, 19),
                        scaledSize: new google.maps.Size(50, 50)},
            employer: { url: 'https://firebasestorage.googleapis.com/v0/b/pilotcity-firestore.appspot.com/o/Asset%2012.svg?alt=media&token=d0ccdb03-d05e-44c0-83af-d5d7e296048f',
                        labelOrigin: new google.maps.Point(25, 19),
                        scaledSize: new google.maps.Size(50, 50)},
            employer_home: { url: 'https://firebasestorage.googleapis.com/v0/b/pilotcity-firestore.appspot.com/o/Asset%209.svg?alt=media&token=8abd1ed4-5b61-4d2e-8730-47103a472dc3',
                        labelOrigin: new google.maps.Point(25, 19),
                        scaledSize: new google.maps.Size(50, 50)},                                   
          }
      }
  },
  watch:{
    mapcenter: function(){
      this.map.setCenter(this.mapcenter);
      var key = String(this.mapcenter.lat) + String(this.mapcenter.lng)

      var i = _.findIndex(this.markers_ref, ref => {return ref.key == key});
      if (this.last_marker)
        this.last_marker.setIcon(this.marker_icons.teacher);
      this.markers_ref[i].marker.setIcon(this.marker_icons.selected)
      this.last_marker = this.markers_ref[i].marker;
    },
    map_data: function(){
      for (var i = 0; i < this.markers_ref.length; i++)
        this.markers_ref[i].marker.setMap(null)
      this.markers = [];
      for (var i = 0; i < this.map_data.length; i++)
        this.markers.push(this.map_data[i].coordinate);
      this.pinAllClassroomsOnMap(this.map);
      this.map.setCenter(this.markers[0]);
    }
  },
  mounted: function () {
    var self = this;

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
      db.firestore().collection('employers').doc(db.auth().currentUser.uid).get().then(res => {
      //console.log(db.auth().currentUser.uid)
      var coordinate;
      if (res.data())
        coordinate = res.data().coordinate;
      if (coordinate){
        self.e_marker = new google.maps.Marker({  position: coordinate,
                                      map: this.map,
                                      icon: this.marker_icons.employer_home
                                    });
      } else {
        console.log("Looks like you are homeless ; (");
      }
    });
  },
   methods:{
    pinAllClassroomsOnMap(map){
        var ht = {}; // hashtable for lookup
        var pin_promises = [];
        var key;
        this.markers_ref = [];
        var self = this;
        for (var i = 0; i < this.markers.length; i++)
        {
          key = String(this.markers[i].lat) + String(this.markers[i].lng);
          if(!ht[key])
          {
            var obj = {
              index: i,
              key: key,
              marker: 
              new google.maps.Marker({  position: this.markers[i],
                                        map: map,
                                        label: {text: (i + 1) + "", color: "white", fontWeight: 'bold'},
                                        icon: this.marker_icons.teacher
                                      })
            };
            obj.marker.key = key; 
            obj.marker.poi = this.markers[i];
            obj.marker.addListener('click', function() {
              self.$parent.$emit('markerClicked', this.key, this.poi);
            });
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