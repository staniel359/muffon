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
        class="icon"
        :key="index"
        :class="icon"
      />
    </i>

    <div class="content">
      <div class="header">
        {{ header }}
      </div>

      <p v-if="content">
        {{ content }}
      </p>

      <ul
        v-if="listItems"
        class="list"
      >
        <li
          v-for="listItemData in listItems"
          :key="listItemData.key"
        >
          {{ listItemData.text }}
        </li>
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
import { mapState } from 'vuex'
import BaseButton from '@/BaseButton.vue'

export default {
  name: 'BaseMessage',
  components: {
    BaseButton
  },
  props: {
    icons: Array,
    buttonData: Object,
    header: String,
    content: String,
    listItems: Array
  },
  emits: [
    'buttonClick'
  ],
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  },
  methods: {
    handleClick () {
      this.$emit('buttonClick')
    }
  }
}
</script>

<style lang="sass" scoped>
.icon-group
  font-size: 3em
  margin-right: 0.5em
</style>
