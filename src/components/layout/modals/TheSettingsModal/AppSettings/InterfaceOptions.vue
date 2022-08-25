<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="viewText"
      is-horizontal
    />

    <div>
      <LanguageOption />

      <TimezoneOption />

      <InfiniteScrollOption />
    </div>
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import LanguageOption from './InterfaceOptions/LanguageOption.vue'
import TimezoneOption from './InterfaceOptions/TimezoneOption.vue'
import InfiniteScrollOption from './InterfaceOptions/InfiniteScrollOption.vue'

export default {
  name: 'InterfaceOptions',
  components: {
    BaseDivider,
    LanguageOption,
    TimezoneOption,
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
