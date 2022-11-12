<template>
  <BaseTrackSearchContainer
    source="youtube"
    :scope="scope"
    :query="query"
  >
    <template
      #default="slotProps"
    >
      <VideoSelect
        :is-loading="slotProps.isLoading"
        :is-error="slotProps.isError"
        :videos="slotProps[scope]"
      />
    </template>
  </BaseTrackSearchContainer>
</template>

<script>
import BaseTrackSearchContainer
  from '@/components/containers/track/BaseTrackSearchContainer.vue'
import VideoSelect from './SelectSection/VideoSelect.vue'

export default {
  name: 'SelectSection',
  components: {
    BaseTrackSearchContainer,
    VideoSelect
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    query: String
  }
}
</script>

<style lang="sass" scoped></style>
