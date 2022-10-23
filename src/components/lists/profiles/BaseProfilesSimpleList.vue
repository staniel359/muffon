<template>
  <BaseListContainer
    class="selection"
  >
    <Component
      :is="component"
      v-for="profileData in profilesCollection"
      :key="profileData.uuid"
      :profile-data="profileData"
      :is-with-created="isWithCreated"
      @link-click="handleLinkClick"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import ProfileItem from './BaseProfilesSimpleList/ProfileItem.vue'
import ProfileMinimalItem
  from './BaseProfilesSimpleList/ProfileMinimalItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'BaseProfilesSimpleList',
  components: {
    BaseListContainer,
    ProfileItem,
    ProfileMinimalItem
  },
  props: {
    profiles: {
      type: Array,
      default () {
        return []
      }
    },
    isMinimal: Boolean,
    isWithCreated: Boolean
  },
  emits: [
    'linkClick'
  ],
  computed: {
    profilesCollection () {
      return formatCollection(
        this.profiles
      )
    },
    component () {
      if (this.isMinimal) {
        return 'ProfileMinimalItem'
      } else {
        return 'ProfileItem'
      }
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
