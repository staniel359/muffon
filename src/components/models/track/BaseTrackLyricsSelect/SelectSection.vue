<template>
  <BaseTrackSearchContainer
    source="genius"
    :scope="scope"
    :query="query"
  >
    <template #default="slotProps">
      <LyricsSelect
        :is-loading="slotProps.isLoading"
        :is-error="slotProps.isError"
        :tracks="slotProps[scope]"
      />
    </template>
  </BaseTrackSearchContainer>
</template>

<script>
import BaseTrackSearchContainer
  from '@/components/containers/track/BaseTrackSearchContainer.vue'
import LyricsSelect from './SelectSection/LyricsSelect.vue'

export default {
  name: 'SelectSection',
  components: {
    BaseTrackSearchContainer,
    LyricsSelect
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
