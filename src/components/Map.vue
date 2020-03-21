<template>
    <div id="map" style="width: 100%; height: 600px;"></div>
</template>

<script>
  import mapboxgl from 'mapbox-gl';
  import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
  // or "const mapboxgl = require('mapbox-gl');"
    export default {
      name: 'Map',
      data() {return {}},
      mounted() {
        this.createMap();
        this.map.addControl(
          new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
          }))
      },
      methods: {
        createMap: function () {
          mapboxgl.accessToken = 'pk.eyJ1IjoiamFheWFsYSIsImEiOiJjazgxMnIxbTgwNmtsM2xwNG85MXNybTZvIn0.jgVIhoWGvlCIU5TQoEgnvA';
          this.map = new mapboxgl.Map({
            container: 'map',
            bounds: [[-128.8, 23.6], [-65.4, 50.2]],
            style: 'mapbox://styles/mapbox/light-v10'
          });
        }
      }
    }
</script>