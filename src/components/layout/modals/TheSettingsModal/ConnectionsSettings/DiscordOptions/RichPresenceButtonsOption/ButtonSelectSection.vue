<template>
  <div class="middle-end-aligned main-list-bottom-section">
    <BaseDropdown
      class="main-select"
      :header="header"
      :options="optionsFiltered"
      :selected="selected"
      @select="handleSelect"
    />

    <BaseClearButton
      v-if="selected"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import discordStore from '@/stores/discord'
import BaseDropdown from '@/components/dropdowns/BaseDropdown.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'

export default {
  name: 'ButtonSelectSection',
  components: {
    BaseDropdown,
    BaseClearButton
  },
  inject: [
    'updateButton'
  ],
  props: {
    options: {
      type: Array,
      required: true
    },
    buttonsTextKey: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    otherSelectIndex: {
      type: Number,
      required: true
    },
    indexText: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(
      discordStore,
      {
        discordRichPresenceButtons:
          'richPresenceButtons'
      }
    ),
    header () {
      return this.$t(
        `${this.buttonsTextKey}.select.${this.indexText}`
      )
    },
    optionsFiltered () {
      return this.options.filter(
        this.isMatchedOption
      )
    },
    selected () {
      return this.discordRichPresenceButtons[
        this.index
      ]
    },
    otherSelectSelected () {
      return this.discordRichPresenceButtons[
        this.otherSelectIndex
      ]
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      this.updateButton(
        this.index,
        value
      )
    },
    handleClearButtonClick () {
      this.updateButton(
        this.index,
        ''
      )
    },
    isMatchedOption (
      optionData
    ) {
      return (
        optionData.id !==
          this.otherSelectSelected
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
