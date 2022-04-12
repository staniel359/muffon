<template>
  <BaseProfileFollowButtonContainer
    :profileData="profileData"
  >
    <template #default="slotProps">
      <div
        class="item"
        :class="{
          disabled: slotProps.isLoading
        }"
        @click.prevent="slotProps.onClick"
      >
        <i
          v-if="slotProps.isLoading"
          class="icon"
        >
          <div
            class="ui mini active inline loader"
          ></div>
        </i>
        <i
          v-else
          class="icon"
          :class="slotProps.icon"
        ></i>

        {{ slotProps.text }}
      </div>
    </template>
  </BaseProfileFollowButtonContainer>
</template>

<script>
import BaseProfileFollowButtonContainer
  from '*/components/containers/profile/BaseProfileFollowButtonContainer.vue'

export default {
  name: 'FollowOption',
  components: {
    BaseProfileFollowButtonContainer
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
