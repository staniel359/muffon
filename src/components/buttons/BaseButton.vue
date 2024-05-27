<template>
  <div
    ref="button"
    class="ui button main-button"
    :class="[
      buttonColorClass,
      buttonIconClass,
      {
        loading: isLoading,
        disabled: isLoading
      }
    ]"
    @click="handleClick"
  >
    <BaseIcon
      v-if="icon"
      class="main-icon"
      :icon="icon"
      :is-with-rtl="isIconWithRtl"
    />

    <BaseIcon
      v-if="leftIcon"
      class="main-list-left-small-icon"
      :class="{
        colored: isLeftIconColored
      }"
      :icon="leftIconComputed"
      :is-with-rtl="isIconWithRtl"
    />

    <span
      v-if="text"
      v-text="text"
    />

    <BaseIcon
      v-if="rightIcon"
      class="main-list-right-small-icon"
      :icon="rightIcon"
      :is-with-rtl="isIconWithRtl"
    />
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'
import buttonMixin from '@/mixins/buttonMixin'

export default {
  name: 'BaseButton',
  components: {
    BaseIcon
  },
  mixins: [
    buttonMixin
  ],
  props: {
    icon: String,
    leftIcon: String,
    rightIcon: String,
    text: String,
    isIconWithRtl: Boolean,
    isLeftIconColored: Boolean,
    isLoading: Boolean,
    isError: Boolean
  },
  emits: [
    'click'
  ],
  computed: {
    buttonIconClass () {
      if (
        !!this.icon &&
          !this.text
      ) {
        return 'icon'
      } else {
        return null
      }
    },
    leftIconComputed () {
      if (this.isError) {
        return 'error'
      } else {
        return this.leftIcon
      }
    }
  },
  methods: {
    handleClick (
      event
    ) {
      this.$emit(
        'click',
        event
      )
    },
    click () {
      this.$refs
        .button
        .click()
    }
  }
}
</script>

<style lang="sass" scoped></style>
