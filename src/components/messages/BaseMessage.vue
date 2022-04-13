<template>
  <div
    class="ui message main-message"
    :class="{
      inverted: isDarkMode,
      icon: icons
    }"
  >
    <i
      v-if="icons"
      class="icons icon-group"
    >
      <i
        v-for="(icon, index) in icons"
        :key="index"
        class="icon"
        :class="icon"
      />
    </i>

    <div class="content">
      <div
        class="header"
        v-text="header"
      />

      <p v-if="content">
        <BaseLink
          v-if="isContentLink"
          :link="link"
          :text="content"
          @click="handleLinkClick"
        />
        <template v-else>
          {{ content }}
        </template>
      </p>

      <ul
        v-if="listItems"
        class="list"
      >
        <li
          v-for="listItemData in listItems"
          :key="listItemData.key"
          v-text="listItemData.text"
        />
      </ul>
    </div>

    <BaseButton
      v-if="buttonData"
      :class="buttonData.class"
      :icon="buttonData.icon"
      @click="handleClick"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseButton from '*/components/buttons/BaseButton.vue'
import BaseLink from '*/components/links/BaseLink.vue'

export default {
  name: 'BaseMessage',
  components: {
    BaseButton,
    BaseLink
  },
  props: {
    icons: Array,
    buttonData: Object,
    header: String,
    content: String,
    listItems: Array,
    isContentLink: Boolean,
    link: Object
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
    handleClick () {
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

<style lang="sass" scoped>
.icon-group
  font-size: 3em
  margin-right: 0.5em
</style>
