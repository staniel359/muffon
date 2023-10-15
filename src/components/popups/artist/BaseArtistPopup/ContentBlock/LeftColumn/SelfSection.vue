<template>
  <div class="main-self-container main-bottom-small-section">
    <BaseSelfIcons
      class="self-icons centered"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
      is-with-library-icon
      is-with-favorite-icon
      is-with-bookmark-icon
    />

    <BaseArtistOptionsPopup
      :key="key"
      :artist-data="artistData"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
      is-with-library-option
      is-with-favorite-option
      is-with-bookmark-option
      is-with-listened-option
      is-with-share-option
      is-with-external-link-option
      @active-change="handleOptionsActiveChange"
    />
  </div>
</template>

<script>
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseArtistOptionsPopup
  from '@/components/popups/artist/BaseArtistOptionsPopup.vue'
import selfMixin from '@/mixins/selfMixin'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'SelfSection',
  components: {
    BaseSelfIcons,
    BaseArtistOptionsPopup
  },
  mixins: [
    selfMixin
  ],
  inject: [
    'setIsOptionsActive'
  ],
  props: {
    artistData: {
      type: Object,
      required: true
    },
    isVisible: Boolean
  },
  data () {
    return {
      key: null
    }
  },
  computed: {
    modelData () {
      return this.artistData
    }
  },
  watch: {
    isVisible: 'handleIsVisibleChange'
  },
  methods: {
    handleOptionsActiveChange (
      value
    ) {
      this.setIsOptionsActive(
        value
      )
    },
    handleIsVisibleChange (
      value
    ) {
      if (value) {
        this.key = generateKey()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.self-icons
  max-width: 50px
</style>
