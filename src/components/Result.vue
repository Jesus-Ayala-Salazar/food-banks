<template>
  <div>
    <b-jumbotron   :header="result.name" header-level="5"
                 :lead="`${result.street} ${result.city} ${result.state} ${result.zip}`">
      <p>{{result.notes}}</p>
      <p>{{result.hours}}</p>
      <p>{{result.phone}}</p>
      <p>{{result.email}}</p>
      <hr class="my-3">
      <b-button v-if="result['ig-handle'].length !== 0"
                id="insta-btn"
                style="background-color: mediumorchid; border-color: mediumorchid"
                :href="`https://www.instagram.com/${result['ig-handle'].slice(1)}`" target="_blank">Instagram</b-button>
      <b-button v-if="result.twitter.length !== 0"
                id="twitter-btn"
                style="background-color: deepskyblue; border-color: #12c9ff"
                class="ml-3"
                :href="`https://www.twitter.com/${result.twitter.slice(1)}`" target="_blank">Twitter</b-button>
      <b-button v-if="typeof(result.facebook) !== 'undefined' && result.facebook.length !== 0"
                class="ml-3"
                variant="primary"
                :href="result.facebook" target="_blank">Facebook</b-button>
      <b-button v-if="result.website.length !== 0"
                class="ml-3"
                variant="primary"
                :href="result.website" target="_blank">Website</b-button>
    </b-jumbotron>
  </div>

</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      default: function () {
        return {
          name: '',
          notes: '',
          district: '',
          street: '',
          city: '',
          state: '',
          zip: '',
          hours: '',
          website: '',
          igHandle: '',
          twitter: '',
          facebook: '',
          link: '',
          phone: '',
          email: ''
        }
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    styleObj: function () {
      // responsive design for mobile devices
      let mqList = window.matchMedia('(min-width: 600px)');
      if (mqList.matches)
        return {height: '69vh'};
      return {}
    }
  }
}
</script>

<style scoped>
  #insta-btn:hover {
    color: #fff;
    background-color: darkorchid !important;
    border-color: darkorchid !important;
  }
  #twitter-btn:hover {
    color: #fff;
    background-color: dodgerblue !important;
    border-color: dodgerblue !important;
  }
</style>