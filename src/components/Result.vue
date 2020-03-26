<template>
  <div>
    <b-jumbotron :header="result.name" header-level="5"
                 :lead="`${result.address} ${result.city} ${result.state} ${result.zip}`">
      <p>{{result.hours}}</p>
      <p>{{result.phone}}</p>
      <p>{{result.email}}</p>
      <hr class="my-3">
      <b-button v-if="result['ig-handle'].length !== 0"
                variant="info"
                :href="`https://www.instagram.com/${result['ig-handle'].slice(1)}`" target="_blank">Instagram</b-button>
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
          address: '',
          city: '',
          state: '',
          zip: '',
          hours: '',
          website: '',
          igHandle: '',
          link: '',
          phone: '',
          email: ''
        }
      }
    }
  },
  data() {
    return {
    }
  }
}
</script>