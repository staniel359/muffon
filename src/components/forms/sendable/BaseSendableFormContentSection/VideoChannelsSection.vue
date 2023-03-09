<template>
  <BaseVideoChannelsSimpleList
    :channels="videoChannels"
    :is-with-self-icons="false"
    is-with-clear-button
    @link-click="handleLinkClick"
    @clear-button-click="handleClearButtonClick"
  />
</template>

<script>
import BaseVideoChannelsSimpleList
  from '@/components/lists/videoChannels/BaseVideoChannelsSimpleList.vue'

export default {
  name: 'VideoChannelsSection',
  components: {
    BaseVideoChannelsSimpleList
  },
  inject: [
    'deleteCollectionItem'
  ],
  props: {
    videoChannels: Array
  },
  emits: [
    'linkClick'
  ],
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleClearButtonClick (
      {
        uuid
      }
    ) {
      this.deleteCollectionItem(
        {
          collection: 'videoChannels',
          uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
