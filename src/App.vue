<template>
  <div id="app">
    <Header/>
    <b-container fluid>
      <b-row>
        <b-col :sm="isResultVisible ? 8 : 12">
          <Map id="map" :style="styleObj" v-on:result-clicked="showResult"/>
        </b-col>
        <b-col align-self="center">
          <b-collapse id="result"
                      v-model="isResultVisible">
            <Result v-bind:result="result" />
          </b-collapse>
        </b-col>
      </b-row>
    </b-container>
    <footer class="footer">
      <Footer/>
    </footer>
  </div>
</template>

<script>
import Map from './components/Map.vue'
import Result from './components/Result'
import Header from './components/Header.vue'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Footer,
    Header,
    Map,
    Result
  },
  data() {
    return {
      result: undefined,
      isResultVisible: false,
      styleObj: {
        width: '100%',
        height: '90vh'
      }
    }
  },
  methods: {
    showResult: function (feature) {
      this.isResultVisible = true;
      this.result = feature;
      // responsive design for mobile devices
      if (window.matchMedia('(max-width: 600px)').matches)
        this.styleObj.height = '50vh';
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
