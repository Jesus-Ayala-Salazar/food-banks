<template>
        <div id="map" v-bind:style="styleObj"></div>
</template>

<style>
</style>

<script>
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {DefaultControl} from '../assets/DefaultControl';

export default {
  name: 'Map',
  components: {
  },
  data() {
    return {
      map: undefined,
      styleObj: {
        width: '100%',
        height: '600px'
      }
    }
  },
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
      let nav = new mapboxgl.NavigationControl({showCompass: false});
      this.map.addControl(nav, 'top-left');

      this.map.addControl(new DefaultControl(this.defaultView), 'top-left');
      this.addGeocoder();
      // adds geojson sources to map
      this.map.on('load', this.addSources);
      // event listeners for showing popups when clicking main layer
      this.map.on('click', 'main-layer', (e) => this.handleClick(e));
      this.map.on('mouseenter', 'main-layer', () => {this.map.getCanvas().style.cursor = 'pointer';});
      this.map.on('mouseleave', 'main-layer', () => {this.map.getCanvas().style.cursor = '';});
    },
    addSources: function () {
      this.map.addSource('food-banks', {
          data: require('../assets/sample'),
          type: 'geojson'
        });
      this.map.addLayer({
        id: 'main-layer',
        type: 'circle',
        source: 'food-banks',
        paint: {
          'circle-opacity': 0.5,
          'circle-radius': 5,
          'circle-stroke-color': '#fff',
          'circle-stroke-width': 1,
          'circle-color': '#7bfc37'
        }
      });
    },
    addPopup: function (e) {
      let feature = e.features[0];
      let coordinates = feature.geometry.coordinates;
      let name = feature.properties.name;
      let hours = feature.properties.hours;
      let website = feature.properties.website;
      let html = `<strong>${name}</strong><br><span>${hours}</span><br><a href="${website}">${website}</a>`;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(html)
        .addTo(this.map);
    },
    addGeocoder: function () {
      /* initializes Geocoder Search box*/
      let geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        countries: 'us',
        mapboxgl: mapboxgl,
        marker: false,
      });
      // add result event listener
      geocoder.on('result', (result) => this.handleResult(result));
      this.map.addControl(geocoder);      // add geocoder to map
    },
    resizeContainer: function () {
      this.styleObj.width = '100%';
      this.map.getContainer().style.width = '100%';
      this.map.resize();
    },
    handleClick: function (e) {
      // this.resizeContainer();
      this.addPopup(e);
      let feature = e.features[0];
      this.map.flyTo({center: feature.geometry.coordinates, zoom: 10});
      this.$emit('result-clicked', feature.properties);
    },
    handleResult: function (res) {
      // this.resizeContainer();
      this.map.flyTo({center: res.result.center, zoom: 10});
    },
    defaultView: function () {
      this.styleObj.width = '100%';
      this.map.getContainer().style.width = '100%';
      this.map.resize();
      this.map.fitBounds([[-128.8, 23.6], [-65.4, 50.2]]);
    }
  }
}
</script>