<template>
  <BaseProfileFollowButtonContainer
    :profileData="profileData"
  >
    <template #default="slotProps">
      <BaseButton
        v-bind="$attrs"
        :class="{
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
  from '@/containers/profile/BaseProfileFollowButtonContainer.vue'
import BaseButton from '@/buttons/BaseButton.vue'

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
