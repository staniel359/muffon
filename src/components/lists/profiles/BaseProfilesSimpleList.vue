<template>
  <BaseListContainer
    class="selection"
  >
    <ProfileItem
      v-for="profileData in profilesFormatted"
      :key="profileData.uuid"
      :profileData="profileData"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer from '@/containers/BaseListContainer.vue'
import ProfileItem from './BaseProfilesSimpleList/ProfileItem.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BaseProfilesSimpleList',
  components: {
    BaseListContainer,
    ProfileItem
  },
  props: {
    profiles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    profilesFormatted () {
      return formatCollection(
        this.profiles
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
