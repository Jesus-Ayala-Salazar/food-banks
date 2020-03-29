<template>
  <div id="map"  v-bind:class="{clicked: isClicked, notClicked: !isClicked}" ></div>
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
      MAIN_SOURCE: 'main',
      SCHOOL_SOURCE: 'schools',
      RESTAURANT_SOURCE: 'restaurants',
      MAIN_LAYER: 'main-layer',
      SCHOOL_LAYER: 'school-layer',
      RESTAURANT_LAYER: 'restaurant-layer',
      map: undefined,
      isClicked: false,
      styleObj: {
        width: '100%',
        height: '95vh'
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
      this.map.on('click', this.RESTAURANT_LAYER, (e) => this.handleClick(e));
      this.map.on('mouseenter', this.RESTAURANT_LAYER, () => {this.map.getCanvas().style.cursor = 'pointer';});
      this.map.on('mouseleave', this.RESTAURANT_LAYER, () => {this.map.getCanvas().style.cursor = '';});
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
      // add restaurant sources
      this.map.addSource(this.RESTAURANT_SOURCE, {
        data: require('../assets/restaurants-geo'),
        type: 'geojson'
      });
      this.map.addLayer({
        id: this.RESTAURANT_LAYER,
        type: 'circle',
        source: this.RESTAURANT_SOURCE,
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
      let html = `<strong>${name}</strong><br><span>${hours}</span><br><a href="${website}">${website.slice(0, 25)}</a>`;

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
      // this.styleObj.height = '50vh';
      this.map.getContainer().style.height = '50vh';
      this.map.resize();
    },
    handleClick: function (e) {
      // this.resizeContainer();
      this.addPopup(e);
      let feature = e.features[0];
      this.map.flyTo({center: feature.geometry.coordinates, zoom: 10});
      this.isClicked = true;
      window.setTimeout(()=>this.map.resize(), 500);
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

<style scoped>
  @media screen and (max-width: 600px) {
    #map.clicked {
      width: 100%;
      height: 50vh;
    }
    #map.notClicked {
      width: 100%;
      height: 92vh;
    }
  }
  @media screen and (min-width: 601px) {
    #map.clicked {
      width: 100%;
      height: 92vh;
    }
    #map.notClicked {
      width: 100%;
      height: 92vh;
    }
  }
</style>