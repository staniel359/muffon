<template>
  <BaseListContainer class="selection">
    <CommunityItem
      v-for="communityData in communitiesCollection"
      :key="communityData.uuid"
      :community-data="communityData"
      :is-with-created="isWithCreated"
      :is-with-join-option="isWithJoinOption"
      :is-with-share-option="isWithShareOption"
      :is-with-clear-button="isWithClearButton"
      @link-click="handleLinkClick"
      @clear-button-click="handleClearButtonClick"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import CommunityItem from './BaseCommunitiesSimpleList/CommunityItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'BaseCommunitiesSimpleList',
  components: {
    BaseListContainer,
    CommunityItem
  },
  props: {
    communities: {
      type: Array,
      default () {
        return []
      }
    },
    isWithCreated: Boolean,
    isWithJoinOption: Boolean,
    isWithShareOption: Boolean,
    isWithClearButton: Boolean
  },
  emits: [
    'linkClick',
    'clearButtonClick'
  ],
  computed: {
    communitiesCollection () {
      return formatCollection(
        this.communities
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleClearButtonClick (
      {
        uuid
      }
    ) {
      this.$emit(
        'clearButtonClick',
        {
          uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
