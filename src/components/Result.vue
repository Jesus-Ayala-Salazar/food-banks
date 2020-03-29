<template>
  <div>
    <b-jumbotron :header="result.name" header-level="5"
                 :lead="`${result.street} ${result.city} ${result.state} ${result.zip}`">
      <p>{{result.notes}}</p>
      <p>{{result.hours}}</p>
      <p>{{result.phone}}</p>
      <p>{{result.email}}</p>
      <hr class="my-3">
      <b-button v-if="result['ig-handle'].length !== 0"
                style="background-color: mediumorchid; border-color: mediumorchid"
                :href="`https://www.instagram.com/${result['ig-handle'].slice(1)}`" target="_blank">Instagram</b-button>
      <b-button v-if="result.twitter.length !== 0"
                style="background-color: #12c9ff; border-color: #12c9ff"
                class="ml-3"
                :href="`https://www.twitter.com/${result.twitter.slice(1)}`" target="_blank">Twitter</b-button>
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