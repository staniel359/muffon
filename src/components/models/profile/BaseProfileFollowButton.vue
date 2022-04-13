<template>
  <BaseProfileFollowButtonContainer
    :profile-data="profileData"
  >
    <template #default="slotProps">
      <BaseButton
        v-bind="$attrs"
        :class="{
          basic: slotProps.isFollowing,
          primary: !slotProps.isFollowing,
          loading: slotProps.isLoading,
          disabled: slotProps.isLoading
        }"
        :text="slotProps.text"
        :icon="slotProps.icon"
        @click="slotProps.onClick"
      />
    </template>
  </BaseProfileFollowButtonContainer>
</template>

<script>
import BaseProfileFollowButtonContainer
  from '*/components/containers/profile/BaseProfileFollowButtonContainer.vue'
import BaseButton from '*/components/buttons/BaseButton.vue'

export default {
  name: 'BaseProfileFollowButton',
  components: {
    BaseProfileFollowButtonContainer,
    BaseButton
  },
  props: {
    profileData: Object
  }
}
</script>

<style lang="sass" scoped></style>
