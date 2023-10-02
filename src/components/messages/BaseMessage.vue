<template>
  <div
    class="ui message base-message no-margin background-transparent"
    :class="{
      inverted: isDarkMode,
      icon: icon || icons
    }"
  >
    <IconBlock
      v-if="icon"
      :class="{
        large: isIconSmall
      }"
      :icon="icon"
    />
    <IconsBlock
      v-else-if="icons"
      :class="{
        large: isIconSmall
      }"
      :icons="icons"
    />

    <div class="content main-list-right-small-section">
      <div
        v-if="header"
        class="header"
        v-text="header"
      />

      <ContentBlock
        v-if="content"
        :content="content"
        :is-content-link="isContentLink"
        :link="link"
        @link-click="handleLinkClick"
      />

      <ListBlock
        v-if="listItems"
        :list-items="listItems"
      />
    </div>

    <BaseButton
      v-if="isWithRefreshButton"
      class="circular basic"
      icon="refresh"
      @click="handleRefreshButtonClick"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import IconBlock from './BaseMessage/IconBlock.vue'
import IconsBlock from './BaseMessage/IconsBlock.vue'
import ContentBlock from './BaseMessage/ContentBlock.vue'
import ListBlock from './BaseMessage/ListBlock.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'BaseMessage',
  components: {
    IconBlock,
    IconsBlock,
    ContentBlock,
    ListBlock,
    BaseButton
  },
  props: {
    icon: String,
    icons: Array,
    header: String,
    content: String,
    isContentLink: Boolean,
    link: Object,
    listItems: Array,
    isWithRefreshButton: Boolean,
    isIconSmall: Boolean
  },
  emits: [
    'refreshButtonClick',
    'linkClick'
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
    handleRefreshButtonClick () {
      this.$emit(
        'refreshButtonClick'
      )
    },
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
