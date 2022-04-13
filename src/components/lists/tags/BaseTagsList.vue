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
      :tag-data="tagData"
      :is-link-to-library="isLinkToLibrary"
      :profile-id="profileId"
      @click="handleClick"
    />

    <BaseLabelLinkContainer
      v-if="isMore"
      class="more-container"
      @click.prevent="handleMoreClick"
    >
      <template #default>
        <i
          class="ellipsis horizontal small icon link"
        />
      </template>
    </BaseLabelLinkContainer>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '*/components/BaseIcon.vue'
import TagItem from './BaseTagsList/TagItem.vue'
import BaseLabelLinkContainer
  from '*/components/containers/links/BaseLabelLinkContainer.vue'

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
  margin-right: 0.5em

.tags-list
  @extend .d-inline

.more-container
  & > .icon
    @extend .no-margin
</style>
