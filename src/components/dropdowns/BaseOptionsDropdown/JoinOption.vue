<template>
  <BaseCommunityJoinButtonContainer
    :community-data="communityData"
  >
    <template #default="slotProps">
      <BaseOption
        :text="slotProps.text"
        :icon="slotProps.icon"
        :is-loading="slotProps.isLoading"
        @click="slotProps.onClick"
      />
    </template>
  </BaseCommunityJoinButtonContainer>
</template>

<script>
import BaseCommunityJoinButtonContainer
  from '*/components/containers/community/BaseCommunityJoinButtonContainer.vue'
import BaseOption from './options/BaseOption.vue'

export default {
  name: 'JoinOption',
  components: {
    BaseCommunityJoinButtonContainer,
    BaseOption
  },
  props: {
    communityData: Object
  },
  emits: [
    'click'
  ]
}
</script>

<style lang="sass" scoped></style>
