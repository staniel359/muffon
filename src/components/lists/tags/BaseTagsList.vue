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
      :tagName="tagData.name"
      @click="handleClick"
    />

    <BaseLabelLinkContainer
      v-if="isMore"
      @click="handleMoreClick"
    >
      <span class="link">
        ...
      </span>
    </BaseLabelLinkContainer>
  </div>
</template>

<script>
import BaseIcon from '@/BaseIcon.vue'
import TagItem from './BaseTagsList/TagItem.vue'
import BaseLabelLinkContainer from '@/containers/BaseLabelLinkContainer.vue'

export default {
  name: 'BaseTagsList',
  components: {
    BaseIcon,
    TagItem,
    BaseLabelLinkContainer
  },
  props: {
    tags: {
      type: Array,
      default () {
        return []
      }
    },
    isWithIcon: {
      type: Boolean,
      default: true
    },
    isMore: Boolean
  },
  emits: [
    'linkClick',
    'moreClick'
  ],
  methods: {
    handleClick () {
      this.$emit('linkClick')
    },
    handleMoreClick () {
      this.$emit('moreClick')
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
