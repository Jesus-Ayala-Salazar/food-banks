<template>
    <div id="map" style="width: 100%; height: 600px;"></div>
</template>

<script>
  import mapboxgl from 'mapbox-gl';
  import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

  export default {
    name: 'Map',
    data() {return {}},
    mounted() {
      this.createMap();
    },
    methods: {
      /* initializes Map bounded to US */
      createMap: function () {
        mapboxgl.accessToken = 'pk.eyJ1IjoiamFheWFsYSIsImEiOiJjazgxMnIxbTgwNmtsM2xwNG85MXNybTZvIn0.jgVIhoWGvlCIU5TQoEgnvA';
        this.map = new mapboxgl.Map({
          container: 'map',
          bounds: [[-128.8, 23.6], [-65.4, 50.2]],
          style: 'mapbox://styles/mapbox/dark-v10'
        });
        /* initializes Geocoder Search box*/
        this.map.addControl(
          new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            countries: 'us',
            mapboxgl: mapboxgl
          }));
        /* adds geojson sources to map */
        this.map.on('load', this.addLayer);
      },
      addLayer: function () {
        this.map.addLayer({
          id: 'main-layer',
          paint: {
            'circle-opacity': 0.5,
            'circle-radius': 7,
            'circle-stroke-color': '#fff',
            'circle-stroke-width': 1,
            'circle-color': '#f683fc'
          },
          source: {
            data: require('../assets/sample'),
            type: 'geojson',
          },
          type: 'circle',
        });
      }
    }
  }
</script>