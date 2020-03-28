<template>
  <div id="app" >
    <Header/>
    <b-container fluid >
      <b-row>
        <b-col :sm="isResultVisible ? 8 : 12">
          <Map  v-on:result-clicked="showResult"/>
        </b-col>
        <b-col>
          <b-collapse id="result"
                      v-model="isResultVisible">
            <Result v-bind:result="result" />
          </b-collapse>
        </b-col>
      </b-row>
      <b-row>
        <footer class="footer text-light">
          <div class="container">
            <Footer/>
          </div>
        </footer>
      </b-row>
    </b-container>
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
      isResultVisible: false
    }
  },
  methods: {
    showResult: function (feature) {
      this.isResultVisible = true;
      this.result = feature;
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
/* Sticky footer styles
-------------------------------------------------- */
html {
  position: relative;
  min-height: 100%;
}
body {
  /* Margin bottom by footer height */
  margin-bottom: 60px;
}
.footer {
  background-color: #df0232;
  position: absolute;
  bottom: 0;
  width: 100%;
  /* Set the fixed height of the footer here */
  height: 60px;
  line-height: 60px; /* Vertically center the text there */
}
</style>
