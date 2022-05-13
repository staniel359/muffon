<template>
  <BaseListContainer class="selection">
    <CommunityItem
      v-for="communityData in communitiesCollection"
      :key="communityData.uuid"
      :community-data="communityData"
      :is-with-join-option="isWithJoinOption"
      :is-with-share-option="isWithShareOption"
      :is-with-delete-option="isWithDeleteOption"
      :is-clearable="isClearable"
      @link-click="handleLinkClick"
      @delete-option-click="handleDeleteOptionClick"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '*/components/containers/lists/BaseListContainer.vue'
import CommunityItem from './BaseCommunitiesSimpleList/CommunityItem.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

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
    isWithJoinOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean,
    isClearable: Boolean
  },
  emits: [
    'linkClick',
    'deleteOptionClick'
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
    handleDeleteOptionClick (
      {
        uuid
      }
    ) {
      this.$emit(
        'deleteOptionClick',
        {
          uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
