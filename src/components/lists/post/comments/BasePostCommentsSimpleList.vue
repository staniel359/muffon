<template>
  <div class="ui comments base-comments-list">
    <CommentItem
      v-for="commentData in commentsCollection"
      :key="commentData.uuid"
      :comment-data="commentData"
      :is-community-creator="isCommunityCreator"
      :is-paginated="isPaginated"
    />
  </div>
</template>

<script>
import CommentItem from './BasePostCommentsSimpleList/CommentItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'BasePostCommentsSimpleList',
  components: {
    CommentItem
  },
  provide () {
    return {
      updateListItem:
        this.updateListItem,
      findListItem:
        this.findListItem
    }
  },
  props: {
    comments: {
      type: Array,
      default () {
        return []
      }
    },
    isPaginated: {
      type: Boolean,
      default: true
    },
    isCommunityCreator: Boolean
  },
  data () {
    return {
      commentsCollection: null
    }
  },
  watch: {
    comments: 'handleCommentsChange'
  },
  beforeMount () {
    this.setCommentsCollection()
  },
  methods: {
    handleCommentsChange () {
      this.setCommentsCollection()
    },
    setCommentsCollection () {
      this.commentsCollection =
        formatCollection(
          this.comments
        )
    },
    updateListItem (
      {
        uuid,
        value
      }
    ) {
      function isMatchedItem (
        itemData
      ) {
        return (
          itemData.uuid === uuid
        )
      }

      const index =
        this.commentsCollection
          .findIndex(
            isMatchedItem
          )

      this.commentsCollection[
        index
      ] = value
    },
    findListItem (
      {
        uuid
      }
    ) {
      function isMatchedItem (
        itemData
      ) {
        return (
          itemData.uuid === uuid
        )
      }

      const item =
        this.commentsCollection
          .find(
            isMatchedItem
          )

      return item
    }
  }
}
</script>

<style lang="sass" scoped>
.base-comments-list
  @extend .no-margin
</style>
