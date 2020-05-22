<template>
  <div class="footer muted-text">
    <BIconAlertTriangleFill/><span>   Last updated 05/22/2020</span><br>
    <div>
      <b-button v-b-modal.more-info size="sm" variant="outline-light">More Information</b-button>
      <b-modal id="more-info"
               button-size="sm"
               ok-only ok-variant="danger"
               centered
               hide-footer
               header-close-variant="light"
               modal-class="info-modal muted-text"
               content-class="info-body"
               title="More Information">
        <p >This website was developed by <a href="https://github.com/Jesus-Ayala-Salazar/" target="_blank" class="white-hyperlink">Jesus Ayala Salazar</a>
          and <a href="https://www.linkedin.com/in/michelleoberoi" target="_blank" class="white-hyperlink">Michelle Oberoi</a>
          with database contributions from the COVID-19 Inland Empire Student Task Force and volunteers like you.
        </p>
        <div ><span>Want to contribute or have an issue or question? </span><a href="mailto:covid19foodbanks.org" class="white-hyperlink"> Let us know </a></div>
      </b-modal>
    </div>
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
    height: 65px;
    background-color: #df0232;
    padding-top: 5px;
    margin-top: 3px;
  }

  .white-hyperlink {
    color: white;
  }
</style>

<style>
  .muted-text {
    color: rgba(255, 255, 255, 0.5);
  }
  .info-modal {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: .9em;
  }
  .info-body {
    background-color: rgba(100, 0, 0, 0.9);
  }
</style>