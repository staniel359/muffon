<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="hideLibraryArtistsText"
    />

    <BaseToggle
      :is-checked="isRecommendationsHideLibraryArtists"
      @on="handleToggleOn"
      @off="handleToggleOff"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseToggle from '*/components/BaseToggle.vue'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default {
  name: 'HideLibraryArtistsOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'recommendations',
      {
        isRecommendationsHideLibraryArtists:
          'isHideLibraryArtists'
      }
    ),
    hideLibraryArtistsText () {
      return this.$t(
        'settings.options.app.recommendations.hideLibraryArtists'
      )
    }
  },
  methods: {
    handleToggleOn () {
      updateGlobalStore(
        {
          'recommendations.isHideLibraryArtists': true
        }
      )
    },
    handleToggleOff () {
      updateGlobalStore(
        {
          'recommendations.isHideLibraryArtists': false
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
