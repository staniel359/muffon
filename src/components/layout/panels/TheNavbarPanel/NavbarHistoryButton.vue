<template>
  <div class="fitted item">
    <BaseButton
      class="basic large main-navbar-button"
      :icon="icon"
      @click="handleClick"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'NavbarHistoryButton',
  components: {
    BaseButton
  },
  props: {
    direction: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      directionIcons: {
        back: 'arrowLeft',
        forward: 'arrowRight'
      }
    }
  },
  computed: {
    icon () {
      return this.directionIcons[
        this.direction
      ]
    }
  },
  methods: {
    handleClick () {
      this.$router[
        this.direction
      ]()
    }
  }
}
</script>

<style lang="sass" scoped></style>
