<template>
  <BaseProfileFollowButtonContainer
    :profile-data="profileData"
  >
    <template #default="slotProps">
      <BaseOption
        :text="slotProps.text"
        :icon="slotProps.icon"
        :is-loading="slotProps.isLoading"
        @click="slotProps.onClick"
      />
    </template>
  </BaseProfileFollowButtonContainer>
</template>

<script>
import BaseProfileFollowButtonContainer
  from '*/components/containers/profile/BaseProfileFollowButtonContainer.vue'
import BaseOption from '*/components/dropdowns/options/BaseOption.vue'

export default {
  name: 'FollowOption',
  components: {
    BaseProfileFollowButtonContainer,
    BaseOption
  },
  props: {
    profileData: Object
  },
  emits: [
    'click'
  ]
}
</script>

<style lang="sass" scoped></style>
