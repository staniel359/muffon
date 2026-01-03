<template>
  <BaseSegmentContainer
    v-if="isAnyTracks || isSelf"
    class="middle-aligned-space-between"
  >
    <div>
      <BaseProfileLibraryTracksPlayButton
        v-if="isAnyTracks"
        :profile-id="profileId"
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
import {
  defineAsyncComponent
} from 'vue'

const BaseSegmentContainer =
  defineAsyncComponent(
    () => import(
      '@/components/containers/segments/BaseSegmentContainer.vue'
    )
  )
const BaseLibraryOptionsPopup =
  defineAsyncComponent(
    () => import(
      '@/components/popups/library/BaseLibraryOptionsPopup.vue'
    )
  )
const BaseProfileLibraryTracksPlayButton =
  defineAsyncComponent(
    () => import(
      '@/components/buttons/play/profile/library/BaseProfileLibraryTracksPlayButton.vue'
    )
  )

export default {
  name: 'ExtraSegment',
  components: {
    BaseSegmentContainer,
    BaseLibraryOptionsPopup,
    BaseProfileLibraryTracksPlayButton
  },
  props: {
    libraryData: {
      type: Object,
      required: true
    },
    profileId: Number,
    isSelf: Boolean
  },
  computed: {
    isAnyTracks () {
      return !!this.libraryData.tracks_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
