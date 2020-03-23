<template>
        <div fluid="sm" id="map" v-bind:style="styleObj"></div>
</template>

<style>

</style>

<script>
  import mapboxgl from 'mapbox-gl';
  import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

  export default {
    name: 'Map',
    data() {
      return {
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
        // default control for showing full width of map
        class DefaultControl {
          constructor(handleFunc) {
            this.eventListener = handleFunc;
          }
          onAdd(map) {
            this._map = map;
            this._container = document.createElement('button');
            this._container.className = 'mapboxgl-ctrl';
            this._container.textContent = 'Default';
            this._container.addEventListener('click', this.eventListener);
            return this._container;
          }
          onRemove() {
            this._container.parentNode.removeChild(this._container);
            this._map = undefined;
          }
        }
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
        this.map.on('load', this.addLayer);
        // event listeners for showing popups when clicking main layer
        this.map.on('click', 'main-layer', (e) => this.handleClick(e));
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
            'circle-radius': 5,
            'circle-stroke-color': '#fff',
            'circle-stroke-width': 1,
            'circle-color': '#7bfc37'
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
        this.styleObj.width = '50%';
        this.map.getContainer().style.width = '50%';
        this.map.resize();
      },
      handleClick: function (e) {
        this.resizeContainer();
        this.addPopup(e);
        this.map.flyTo({center: e.features[0].geometry.coordinates, zoom: 10});
      },
      handleResult: function (res) {
        this.resizeContainer();
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