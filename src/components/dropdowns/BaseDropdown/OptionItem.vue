<template>
  <div
    class="item main-dropdown-item"
    :class="{
      disabled: isDisabled,
      actionable: isWithCheckbox
    }"
    :data-value="id"
    @click="handleClick"
  >
    <BaseCheckbox
      v-if="isWithCheckbox"
      ref="checkbox"
      class="main-left-extrasmall-section"
      @is-checked-change="handleIsCheckedChange"
      @click.stop
    />

    <BaseIcon
      v-if="icon"
      class="main-dropdown-icon"
      :class="{
        colored: isIconColored
      }"
      :icon="icon"
      :is-flag="isFlagIcon"
    />

    <span
      v-html="nameSanitized"
    />
  </div>
</template>

<script>
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import {
  sanitizeString
} from '@/helpers/utils'

export default {
  name: 'OptionItem',
  components: {
    BaseCheckbox,
    BaseIcon
  },
  inject: {
    changeCheckableOption: {
      default: () => false
    }
  },
  props: {
    optionData: {
      type: Object,
      required: true
    },
    isIconColored: Boolean,
    isFlagIcon: Boolean
  },
  computed: {
    isDisabled () {
      return this.optionData.isDisabled
    },
    isWithCheckbox () {
      return this.optionData.isWithCheckbox
    },
    id () {
      return this.optionData.id
    },
    icon () {
      return this.optionData.icon
    },
    nameSanitized () {
      return sanitizeString(
        this.name
      )
    },
    name () {
      return this.optionData.name
    }
  },
  methods: {
    handleClick () {
      if (!this.isWithCheckbox) { return }

      this.$refs
        .checkbox
        .toggle()
    },
    handleIsCheckedChange (
      value
    ) {
      if (this.changeCheckableOption) {
        this.changeCheckableOption(
          {
            key: this.id,
            value
          }
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
