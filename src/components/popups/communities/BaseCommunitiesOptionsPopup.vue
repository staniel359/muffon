<template>
  <BaseOptionsPopupContainer
    v-if="isRender"
  >
    <CreateOption
      v-if="isRenderCreateOption"
    />
  </BaseOptionsPopupContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseOptionsPopupContainer
  from '@/components/containers/popups/BaseOptionsPopupContainer.vue'
import CreateOption from './BaseCommunitiesOptionsPopup/CreateOption.vue'

export default {
  name: 'BaseCommunitiesOptionsPopup',
  components: {
    BaseOptionsPopupContainer,
    CreateOption
  },
  props: {
    isWithCreateOption: Boolean
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    isRender () {
      return (
        this.isRenderCreateOption
      )
    },
    isRenderCreateOption () {
      return (
        this.profileId &&
          this.isWithCreateOption
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
