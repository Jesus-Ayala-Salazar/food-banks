<template>
    <div>
        <b-navbar toggleable="md" class="header" fixed="top" type="dark">
          <b-navbar-brand tag="h1" class="mb-0">
            <BIconAlertTriangleFill />  COVID-19 Food Banks
          </b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item  href="https://forms.gle/LDuqvfEW2i9B5GAh9" target="_blank">Please submit to our database!</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
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
  .header{
    background-color: #df0232;
  }
</style>