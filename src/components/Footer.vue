<template>
  <div class="footer">
    <BIconAlertTriangleFill/><span>   Last updated 04/03/2020</span><br>
    <div><span>Have an issue or question? </span><a href="mailto:covid19foodbanks.org" style="color: white"> Let us know </a></div>
  </div>
</template>

<script>
  import {BIconAlertTriangleFill} from 'bootstrap-vue';
  export default {
    components: {
      BIconAlertTriangleFill
    }
  }
</script>

<style scoped>
.footer {
  font-size: small;
  display: block;
  width: 100%;
  height: 10vh;
  color: rgba(255, 255, 255, 0.5);
  background-color: #df0232;
  padding-top: 15px;
  margin-top: 3px;
}
</style>