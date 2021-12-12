<template>
  <BaseListContainer
    class="selection"
  >
    <ProfileItem
      v-for="profileData in profilesCollection"
      :key="profileData.uuid"
      :profileData="profileData"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer from '@/containers/lists/BaseListContainer.vue'
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
    profilesCollection () {
      return formatCollection(
        this.profiles
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
