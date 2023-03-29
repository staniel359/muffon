<template>
  <BaseSegmentContainer>
    <BaseSearchButton
      scope="sources"
      :is-active="isShowSourceSelect"
      @click="handleSearchButtonClick"
    />

    <BaseAlbumSourceSelect
      v-if="isSourceSelectCalled"
      v-show="isShowSourceSelect"
      class="source-select"
      :album-data="albumData"
    />
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

<style lang="sass" scoped>
.source-select
  margin-top: 1em
</style>
