<template>
  <BaseListContainer
    class="selection"
  >
    <ProfileItem
      v-for="profileData in profilesCollection"
      :key="profileData.uuid"
      :profileData="profileData"
      @linkClick="handleLinkClick"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '*/components/containers/lists/BaseListContainer.vue'
import ProfileItem from './BaseProfilesSimpleList/ProfileItem.vue'
import { collection as formatCollection } from '*/helpers/formatters'

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
  emits: [
    'linkClick'
  ],
  computed: {
    profilesCollection () {
      return formatCollection(
        this.profiles
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    }
  }
}
</script>

<style lang="sass" scoped></style>
