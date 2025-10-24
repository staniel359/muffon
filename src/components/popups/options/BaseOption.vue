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

    <template
      v-if="extraText"
    >
      <div
        class="flex-full"
        v-text="text"
      />

      <small
        class="main-right-section description"
        v-text="extraText"
      />
    </template>
    <span
      v-else
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
        >
          <OptionsMenu
            :options="options"
            :is-options-middle-aligned="isOptionsMiddleAligned"
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
  props: {
    text: {
      type: String,
      required: true
    },
    extraText: String,
    icon: String,
    isLoading: Boolean,
    isError: Boolean,
    options: Array,
    isIconRed: Boolean,
    isIconColored: Boolean,
    isDisabled: Boolean,
    isOptionsMiddleAligned: Boolean
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
