<template>
  <div
    class="ui message base-message no-margin"
    :class="[
      messageClassName,
      {
        inverted: isDarkMode,
        icon: (
          iconComputed || icons
        )
      }
    ]"
  >
    <IconBlock
      v-if="iconComputed"
      :icon="iconComputed"
    />
    <IconsBlock
      v-else-if="icons"
      :class="{
        large: isIconSmall
      }"
      :icons="icons"
    />

    <div class="content">
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
    isIconSmall: Boolean,
    isSuccess: Boolean,
    isError: Boolean,
    isInfo: Boolean,
    isWarning: Boolean
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
    ),
    iconComputed () {
      if (this.isSuccess) {
        return 'success'
      } else if (this.isError) {
        return 'error'
      } else if (this.isInfo) {
        return 'infoCircle'
      } else if (this.isWarning) {
        return 'warning'
      } else {
        return this.icon
      }
    },
    messageClassName () {
      if (this.isSuccess) {
        return 'success'
      } else if (this.isError) {
        return 'error'
      } else if (this.isWarning) {
        return 'warning'
      } else {
        return null
      }
    }
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
