<template>
  <div class="main-settings-options-block">
    <LanguageOption />

    <TimezoneOption />

    <InfiniteScrollOption />

    <ArtistPopupOption />
  </div>
</template>

<script>
import LanguageOption from './InterfaceOptions/LanguageOption.vue'
import TimezoneOption from './InterfaceOptions/TimezoneOption.vue'
import InfiniteScrollOption from './InterfaceOptions/InfiniteScrollOption.vue'
import ArtistPopupOption from './InterfaceOptions/ArtistPopupOption.vue'

export default {
  name: 'InterfaceOptions',
  components: {
    LanguageOption,
    TimezoneOption,
    InfiniteScrollOption,
    ArtistPopupOption
  }
}
</script>

<style lang="sass" scoped></style>
