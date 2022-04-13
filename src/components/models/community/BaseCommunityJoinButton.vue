<template>
  <BaseCommunityJoinButtonContainer
    :community-data="communityData"
  >
    <template #default="slotProps">
      <BaseButton
        v-bind="$attrs"
        :class="{
          basic: slotProps.isMember,
          primary: !slotProps.isMember,
          loading: slotProps.isLoading,
          disabled: slotProps.isLoading
        }"
        :text="slotProps.text"
        :icon="slotProps.icon"
        @click="slotProps.onClick"
      />
    </template>
  </BaseCommunityJoinButtonContainer>
</template>

<script>
import BaseCommunityJoinButtonContainer
  from '*/components/containers/community/BaseCommunityJoinButtonContainer.vue'
import BaseButton from '*/components/buttons/BaseButton.vue'

export default {
  name: 'BaseCommunityJoinButton',
  components: {
    BaseCommunityJoinButtonContainer,
    BaseButton
  },
  props: {
    communityData: Object
  }
}
</script>

<style lang="sass" scoped></style>
