<template>
    <div>
        <b-navbar id="header" fixed="top"  type="dark">
            <b-navbar-brand tag="h1" class="mb-0">
              <BIconAlertTriangleFill/>  COVID-19 Food Banks
            </b-navbar-brand>
        </b-navbar>
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
  #header{
    background-color: #df0232;
  }
</style>