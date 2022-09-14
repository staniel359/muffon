<template>
  <div class="main-settings-options-block">
    <LanguageOption />

    <TimezoneOption />

    <InfiniteScrollOption />
  </div>
</template>

<script>
import LanguageOption from './InterfaceOptions/LanguageOption.vue'
import TimezoneOption from './InterfaceOptions/TimezoneOption.vue'
import InfiniteScrollOption from './InterfaceOptions/InfiniteScrollOption.vue'

export default {
  name: 'InterfaceOptions',
  components: {
    LanguageOption,
    TimezoneOption,
    InfiniteScrollOption
  }
}
</script>

<style lang="sass" scoped></style>
