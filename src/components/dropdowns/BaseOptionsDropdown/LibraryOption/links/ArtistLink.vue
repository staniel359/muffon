<template>
  <BaseLibraryOption
    action="show"
    :link="link"
    @click="handleClick"
  />
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BaseLibraryOption from '../../options/BaseLibraryOption.vue'
import {
  main as formatProfileLibraryArtistMainLink
} from '*/helpers/formatters/links/profile/library/artist'

export default {
  name: 'ArtistLink',
  components: {
    BaseLibraryOption
  },
  props: {
    modelId: {
      type: String,
      required: true
    }
  },
  emits: [
    'click'
  ],
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    ),
    link () {
      return formatProfileLibraryArtistMainLink(
        {
          profileId: this.profileId,
          artistId: this.modelId
        }
      )
    }
  },
  methods: {
    handleClick () {
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
