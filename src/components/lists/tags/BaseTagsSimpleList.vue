<template>
  <div
    v-if="tags?.length"
    class="ui labels"
  >
    <BaseIcon
      v-if="isWithIcon"
      class="tags-icon"
      icon="tags"
    />

    <TagItem
      v-for="(tagData, index) in tags"
      :key="index"
      :tag-data="tagData"
      :is-link-to-library="isLinkToLibrary"
      :profile-id="profileId"
      @click="handleClick"
    />

    <BaseLabel
      v-if="isMore"
      class="basic circular large"
      icon="ellipsis horizontal"
      is-clickable
      @click="handleMoreClick"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '*/components/BaseIcon.vue'
import TagItem from './BaseTagsSimpleList/TagItem.vue'
import BaseLabel from '*/components/BaseLabel.vue'

export default {
  name: 'BaseTagsSimpleList',
  components: {
    BaseIcon,
    TagItem,
    BaseLabel
  },
  props: {
    tags: {
      type: Array,
      default () {
        return []
      }
    },
    isWithIcon: Boolean,
    isMore: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String
  },
  emits: [
    'linkClick',
    'moreClick'
  ],
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    )
  },
  methods: {
    handleClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleMoreClick () {
      this.$emit(
        'moreClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.tags-icon
  margin-right: 0.75em
</style>
