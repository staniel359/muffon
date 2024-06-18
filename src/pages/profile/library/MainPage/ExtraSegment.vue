<template>
  <BaseSegmentContainer
    class="middle-aligned-space-between"
  >
    <div>
      <PlayButton
        v-if="tracksCount"
        :profile-id="profileId"
        :library-data="libraryData"
      />
    </div>

    <div>
      <BaseLibraryOptionsPopup
        v-if="isSelf"
        is-with-add-option
        is-with-import-option
      />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseLibraryOptionsPopup
  from '@/components/popups/library/BaseLibraryOptionsPopup.vue'
import PlayButton from './ExtraSegment/PlayButton.vue'

export default {
  name: 'ExtraSegment',
  components: {
    BaseSegmentContainer,
    BaseLibraryOptionsPopup,
    PlayButton
  },
  props: {
    libraryData: {
      type: Object,
      required: true
    },
    profileId: String,
    isSelf: Boolean
  },
  computed: {
    tracksCount () {
      return this.libraryData.tracks_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
