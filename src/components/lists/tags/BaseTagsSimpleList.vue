<template>
  <div
    v-if="tags?.length"
    class="ui labels"
  >
    <BaseIcon
      v-if="isWithIcon"
      class="main-left-small-icon"
      icon="tags"
    />

    <TagItem
      v-for="(tagData, index) in tags"
      :key="index"
      :tag-data="tagData"
      :is-link-to-library="isLinkToLibrary"
      :profile-id="profileId"
      :size="size"
      :is-with-artists-count="isWithArtistsCount"
      @click="handleClick"
    />

    <BaseLabel
      v-if="isMore"
      class="basic circular"
      icon="dotsHorizontal"
      :class="size"
      is-clickable
      @click="handleMoreClick"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import TagItem from './BaseTagsSimpleList/TagItem.vue'
import BaseLabel from '@/components/labels/BaseLabel.vue'

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
    size: {
      type: String,
      default: 'large'
    },
    isWithIcon: Boolean,
    isMore: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithArtistsCount: Boolean
  },
  emits: [
    'linkClick',
    'moreClick'
  ],
  computed: {
    ...mapState(
      layoutStore,
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

<style lang="sass" scoped></style>
