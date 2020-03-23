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
        // adds geojson sources to map
        this.map.on('load', this.addLayer);
        /* initializes Geocoder Search box*/
        this.map.addControl(
          new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            countries: 'us',
            mapboxgl: mapboxgl
          }));
        // event listeners for showing popups when clicking main layer
        this.map.on('click', 'main-layer',  (e) => this.addPopup(e));
        this.map.on('click', 'main-layer',  (e) => this.map.flyTo({
          center: e.features[0].geometry.coordinates,
          zoom: 12
        }));
        this.map.on('mouseenter', 'main-layer', () => {this.map.getCanvas().style.cursor = 'pointer';});
        this.map.on('mouseleave', 'main-layer', () => {this.map.getCanvas().style.cursor = '';});


      },
      addLayer: function () {
        this.map.addLayer({
          id: 'main-layer',
          type: 'circle',
          source: {
            data: require('../assets/sample'),
            type: 'geojson',
          },
          paint: {
            'circle-opacity': 0.5,
            'circle-radius': 7,
            'circle-stroke-color': '#fff',
            'circle-stroke-width': 1,
            'circle-color': '#f683fc'
          }
        });
      },
      addPopup: function (e) {
        let coordinates = e.features[0].geometry.coordinates.slice();
        let name = e.features[0].properties.name;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setText(name)
          .addTo(this.map);
      }
    }
  }
</script>