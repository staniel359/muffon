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
      <p>
        {{ content }}
      </p>
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
    content: String
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
