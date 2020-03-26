<template>
  <div id="app">
    <Header/>
    <b-container fluid >
      <b-row>
        <b-col :sm="isResultVisible ? 8 : 12">
          <Map id="map" v-on:result-clicked="showResult"/>
        </b-col>
        <b-col>
          <b-collapse id="result"
                      v-model="isResultVisible">
            <Result v-bind:result="result" />
          </b-collapse>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Map from './components/Map.vue'
import Result from './components/Result'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
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
</style>
