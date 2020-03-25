<template>
  <div id="app">
    <Header/>
    <b-container fluid>
        <b-row>
            <b-col><Map/></b-col><b-col v-show="false"><Results /></b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import Map from './components/Map.vue'
import Results from './components/Results'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
    Map,
    Results
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
