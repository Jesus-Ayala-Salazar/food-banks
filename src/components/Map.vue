<template>
  <div>
    <div id="map"></div>
    <div class='map-overlay' id='legend'>
      <div>
        <span class="legend-key" style="background-color: #ff2541;"></span>
        <span>Food Banks</span>
      </div>
      <div>
        <span class="legend-key" style="background-color: #96ff0f;"></span>
        <span>Seniors</span>
      </div>
      <div>
        <span class="legend-key" style="background-color: #b335ff;"></span>
        <span>Students</span>
      </div>
    </div>
  </div>
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
      ZOOM_LEVEL: 13,
      MAIN_SOURCE: 'main',
      SCHOOL_SOURCE: 'schools',
      SENIORS_SOURCE: 'seniors',
      MAIN_LAYER: 'main-layer',
      SCHOOL_LAYER: 'school-layer',
      SENIORS_LAYER: 'seniors-layer',
      map: undefined
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
        bounds: [[-127, 15], [-65, 60]],
        style: 'mapbox://styles/mapbox/dark-v10'
      });
      let nav = new mapboxgl.NavigationControl({showCompass: false});
      this.map.addControl(nav, 'top-left');

      this.map.addControl(new DefaultControl(this.defaultView), 'top-left');
      this.addGeocoder();
      // adds geojson sources to map
      this.map.on('load', this.addSources);
      // event listeners for showing popups when clicking layers
      this.map.on('click', this.MAIN_LAYER, (e) => this.handleClick(e));
      this.map.on('mouseenter', this.MAIN_LAYER, () => {this.map.getCanvas().style.cursor = 'pointer';});
      this.map.on('mouseleave', this.MAIN_LAYER, () => {this.map.getCanvas().style.cursor = '';});
      this.map.on('click', this.SCHOOL_LAYER, (e) => this.handleClick(e));
      this.map.on('mouseenter', this.SCHOOL_LAYER, () => {this.map.getCanvas().style.cursor = 'pointer';});
      this.map.on('mouseleave', this.SCHOOL_LAYER, () => {this.map.getCanvas().style.cursor = '';});
      this.map.on('click', this.SENIORS_LAYER, (e) => this.handleClick(e));
      this.map.on('mouseenter', this.SENIORS_LAYER, () => {this.map.getCanvas().style.cursor = 'pointer';});
      this.map.on('mouseleave', this.SENIORS_LAYER, () => {this.map.getCanvas().style.cursor = '';});
    },
    addSources: function () {
      // add main source
      this.map.addSource(this.MAIN_SOURCE, {
          data: require('../assets/main-geo'),
          type: 'geojson'
        });
      this.map.addLayer({
        id: this.MAIN_LAYER,
        type: 'circle',
        source: this.MAIN_SOURCE,
        paint: {
          'circle-opacity': 0.7,
          'circle-radius': 7,
          'circle-stroke-color': '#fff',
          'circle-stroke-width': 1,
          'circle-color': '#ff2541'
        }
      });
      // add school sources
      this.map.addSource(this.SCHOOL_SOURCE, {
        data: require('../assets/schools-geo'),
        type: 'geojson'
      });
      this.map.addLayer({
        id: this.SCHOOL_LAYER,
        type: 'circle',
        source: this.SCHOOL_SOURCE,
        paint: {
          'circle-opacity': 0.7,
          'circle-radius': 7,
          'circle-stroke-color': '#fff',
          'circle-stroke-width': 1,
          'circle-color': '#b335ff'
        }
      });
      // add senior sources
      this.map.addSource(this.SENIORS_SOURCE, {
        data: require('../assets/seniors-geo'),
        type: 'geojson'
      });
      this.map.addLayer({
        id: this.SENIORS_LAYER,
        type: 'circle',
        source: this.SENIORS_SOURCE,
        paint: {
          'circle-opacity': 0.7,
          'circle-radius': 7,
          'circle-stroke-color': '#fff',
          'circle-stroke-width': 1,
          'circle-color': '#96ff0f'
        }
      });
    },
    addPopup: function (e) {
      let feature = e.features[0];
      let coordinates = feature.geometry.coordinates;
      let name = feature.properties.name;
      let hours = feature.properties.hours;
      let website = feature.properties.website;
      let html = `<strong>${name}</strong><br><span>${hours}</span><br><a href="${website}" target="_blank">${website.slice(0, 25)}</a>`;

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
      this.map.getContainer().style.width = '100%';
      this.map.resize();
    },
    handleClick: function (e) {
      // this.resizeContainer();
      this.addPopup(e);
      let feature = e.features[0];
      this.map.flyTo({center: feature.geometry.coordinates, zoom: this.ZOOM_LEVEL});
      this.map.resize();
      this.$emit('result-clicked', feature.properties);
    },
    handleResult: function (res) {
      // this.resizeContainer();
      this.map.flyTo({center: res.result.center, zoom: this.ZOOM_LEVEL});
    },
    defaultView: function () {
      this.map.fitBounds([[-127, 15], [-65, 60]]);
      this.map.resize();
    }
  }
}
</script>

<style scoped>
  .map-overlay {
    position: absolute;
    bottom: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.8);
    margin-right: 20px;
    font-family: Arial, sans-serif;
    overflow: auto;
    border-radius: 3px;
    z-index: 1;

    padding: 10px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    line-height: 18px;
    height: 80px;
    margin-bottom: 40px;
    width: 100px;
  }

  .legend-key {
    display: inline-block;
    border-radius: 20px;
    width: 10px;
    height: 10px;
    margin-right: 5px;
  }
</style>