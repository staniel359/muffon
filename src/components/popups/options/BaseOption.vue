<template>
  <div
    ref="item"
    class="item main-options-option"
    :class="{
      disabled: (
        isDisabled || isLoading
      )
    }"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
  >
    <BaseIcon
      v-if="icon"
      class="main-options-option-icon"
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

    <template
      v-if="options"
    >
      <BaseIcon
        class="main-left-small-icon"
        icon="dropdown"
      />

      <div class="main-popup-container">
        <BaseOptionsPopupMenuContainer
          ref="popup"
          @active-change="handleSubmenuActiveChange"
        >
          <OptionsMenu
            :options="options"
          />
        </BaseOptionsPopupMenuContainer>
      </div>
    </template>
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
import optionsSubmenuPopupOptions
  from '@/helpers/formatters/plugins/semantic/options/popup/optionsSubmenu'

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
    isIconColored: Boolean,
    isDisabled: Boolean
  },
  emits: [
    'click',
    'activate'
  ],
  data () {
    return {
      isActivated: false
    }
  },
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
  watch: {
    isActivated: 'handleIsActivatedChange'
  },
  methods: {
    handleClick () {
      this.$emit(
        'click'
      )
    },
    handleSubmenuActiveChange (
      value
    ) {
      this.changeSubmenuActive(
        value
      )
    },
    handleMouseEnter () {
      this.isActivated = true
    },
    handleIsActivatedChange (
      value
    ) {
      if (value) {
        this.$emit(
          'activate'
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
