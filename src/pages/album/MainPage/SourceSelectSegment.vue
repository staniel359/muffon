<template>
  <BaseSegmentContainer>
    <BaseSearchButton
      scope="sources"
      :is-active="isShowSourceSelect"
      @click="handleSearchButtonClick"
    />

    <div
      v-if="isSourceSelectCalled"
      v-show="isShowSourceSelect"
      class="main-bottom-section"
    >
      <BaseAlbumSourceSelect
        :album-data="albumData"
      />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseSearchButton from '@/components/buttons/BaseSearchButton.vue'
import BaseAlbumSourceSelect
  from '@/components/models/album/BaseAlbumSourceSelect.vue'

export default {
  name: 'SourceSelectSegment',
  components: {
    BaseSegmentContainer,
    BaseSearchButton,
    BaseAlbumSourceSelect
  },
  props: {
    albumData: Object
  },
  data () {
    return {
      isSourceSelectCalled: false,
      isShowSourceSelect: false
    }
  },
  methods: {
    handleSearchButtonClick () {
      this.isSourceSelectCalled = true

      this.isShowSourceSelect =
        !this.isShowSourceSelect
    }
  }
}
</script>

<style lang="sass" scoped></style>
