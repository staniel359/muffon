<template>
  <div class="ui large labels tags-list">
    <BaseIcon
      v-if="isWithIcon"
      class="tags-icon"
      icon="tags"
    />

    <TagItem
      v-for="(tagData, index) in tags"
      :key="index"
      :tagData="tagData"
      :isLinkToLibrary="isLinkToLibrary"
      :profileId="profileId"
      @click="handleClick"
    />

    <div
      v-if="isMore"
      class="ui basic label main-link-container"
      :class="{ inverted: isDarkMode }"
      @click.prevent="handleMoreClick"
    >
      <span class="link">
        ...
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseIcon from '@/BaseIcon.vue'
import TagItem from './BaseTagsList/TagItem.vue'

export default {
  name: 'BaseTagsList',
  components: {
    BaseIcon,
    TagItem
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
    ...mapState('layout', [
      'isDarkMode'
    ])
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
  margin-right: 0.5em

.tags-list
  @extend .d-inline
</style>
