<template>
  <div
    ref="item"
    class="item"
    :class="{
      disabled: isLoading
    }"
    @click="handleClick"
  >
    <BaseIcon
      :class="{
        red: (
          isIconRed || isError
        ),
        colored: isIconColored
      }"
      :icon="icon"
      :is-loading="isLoading"
      :is-error="isError"
    />

    <span
      v-text="text"
    />

    <BaseIcon
      v-if="options"
      class="dropdown-icon"
      icon="dropdown"
    />

    <div
      v-if="options"
      class="main-popup-container"
    >
      <BaseOptionsPopupMenuContainer
        ref="popup"
        @active-change="handleMenuActiveChange"
      >
        <OptionsMenu
          :options="options"
        />
      </BaseOptionsPopupMenuContainer>
    </div>
  </div>
</template>

<script>
import {
  defineAsyncComponent
} from 'vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseOptionsPopupMenuContainer
  from '@/components/containers/popups/BaseOptionsPopupMenuContainer.vue'
import popupMixin from '@/mixins/popupMixin'
import {
  optionsSubmenuPopupOptions
} from '@/helpers/formatters/semantic'

const OptionsMenu =
  defineAsyncComponent(
    () => import(
      './BaseOption/OptionsMenu.vue'
    )
  )

export default {
  name: 'BaseOption',
  components: {
    BaseIcon,
    BaseOptionsPopupMenuContainer,
    OptionsMenu
  },
  mixins: [
    popupMixin
  ],
  inject: [
    'changeSubmenuActive'
  ],
  props: {
    text: {
      type: String,
      required: true
    },
    icon: String,
    isLoading: Boolean,
    isError: Boolean,
    options: Array,
    isIconRed: Boolean,
    isIconColored: Boolean
  },
  emits: [
    'click'
  ],
  computed: {
    element () {
      return this.$refs.item
    },
    popupOptions () {
      return optionsSubmenuPopupOptions(
        {
          html: this.popup
        }
      )
    }
  },
  methods: {
    handleClick () {
      this.$emit(
        'click'
      )
    },
    handleMenuActiveChange (
      value
    ) {
      this.changeSubmenuActive(
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.dropdown-icon
  margin-right: 1em !important
</style>
