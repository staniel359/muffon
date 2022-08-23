<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="viewText"
      is-horizontal
    />

    <div>
      <LanguageOption />

      <InfiniteScrollOption />
    </div>
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import LanguageOption from './InterfaceOptions/LanguageOption.vue'
import InfiniteScrollOption from './InterfaceOptions/InfiniteScrollOption.vue'

export default {
  name: 'InterfaceOptions',
  components: {
    BaseDivider,
    LanguageOption,
    InfiniteScrollOption
  },
  computed: {
    viewText () {
      return this.$t(
        'settings.sections.app.interface'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
