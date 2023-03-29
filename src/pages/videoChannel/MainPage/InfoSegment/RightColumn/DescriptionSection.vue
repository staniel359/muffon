<template>
  <template
    v-if="description"
  >
    <BaseDivider />

    <BaseVideoChannelDescription
      :channel-data="channelData"
    />
  </template>
</template>

<script>
import BaseDivider from '@/components/BaseDivider.vue'
import BaseVideoChannelDescription
  from '@/components/models/videoChannel/BaseVideoChannelDescription.vue'

export default {
  name: 'DescriptionSection',
  components: {
    BaseDivider,
    BaseVideoChannelDescription
  },
  props: {
    channelData: {
      type: Object,
      required: true
    }
  },
  computed: {
    description () {
      return this.channelData.description
    }
  }
}
</script>

<style lang="sass" scoped></style>
