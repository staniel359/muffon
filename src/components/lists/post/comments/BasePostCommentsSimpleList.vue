<template>
  <BaseDivider
    v-if="isRenderTopDivider"
    class="large"
  />

  <div
    class="ui comments no-margin"
    :class="{
      inverted: isDarkMode
    }"
  >
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
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseDivider from '@/components/BaseDivider.vue'
import CommentItem from './BasePostCommentsSimpleList/CommentItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BasePostCommentsSimpleList',
  components: {
    BaseDivider,
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
    isCommunityCreator: Boolean,
    isWithTopDivider: Boolean
  },
  data () {
    return {
      commentsCollection: null
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    isRenderTopDivider () {
      return (
        this.isWithTopDivider &&
          this.commentsCollection.length
      )
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
    },
    addCommentToComments (
      value
    ) {
      const commentDataFormatted = {
        uuid: generateKey(),
        ...value
      }

      this.commentsCollection = [
        ...this.commentsCollection,
        commentDataFormatted
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
