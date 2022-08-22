<template>
  <div class="option">
    <BaseIcon
      icon="save"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="savedTracksText"
    />

    <BaseToggle
      store-key="sidebar.isWithSavedTracksItem"
      :is-checked="isWithSavedTracksItem"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '*/components/BaseIcon.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseToggle from '*/components/BaseToggle.vue'

export default {
  name: 'SavedTracksOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'sidebar',
      [
        'isWithSavedTracksItem'
      ]
    ),
    savedTracksText () {
      return this.$t(
        'navigation.savedTracks'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
