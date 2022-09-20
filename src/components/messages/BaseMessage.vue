<template>
  <div
    class="ui message main-message"
    :class="{
      inverted: isDarkMode,
      icon: icons
    }"
  >
    <IconsBlock
      v-if="icons"
      :icons="icons"
    />

    <div class="content">
      <div
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
      v-if="buttonData"
      :class="buttonData.class"
      :icon="buttonData.icon"
      @click="handleButtonClick"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import IconsBlock from './BaseMessage/IconsBlock.vue'
import ContentBlock from './BaseMessage/ContentBlock.vue'
import ListBlock from './BaseMessage/ListBlock.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'BaseMessage',
  components: {
    IconsBlock,
    ContentBlock,
    ListBlock,
    BaseButton
  },
  props: {
    icons: Array,
    header: String,
    content: String,
    isContentLink: Boolean,
    link: Object,
    listItems: Array,
    buttonData: Object
  },
  emits: [
    'buttonClick',
    'linkClick'
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
    handleButtonClick () {
      this.$emit(
        'buttonClick'
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
