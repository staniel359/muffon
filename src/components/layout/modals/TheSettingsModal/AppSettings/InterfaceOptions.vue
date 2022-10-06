<template>
  <div class="main-settings-options-block">
    <LanguageOption />

    <TimezoneOption />

    <InfiniteScrollOption />

    <ArtistPopupOption />

    <CachePagesOption />
  </div>
</template>

<script>
import LanguageOption from './InterfaceOptions/LanguageOption.vue'
import TimezoneOption from './InterfaceOptions/TimezoneOption.vue'
import InfiniteScrollOption from './InterfaceOptions/InfiniteScrollOption.vue'
import ArtistPopupOption from './InterfaceOptions/ArtistPopupOption.vue'
import CachePagesOption from './InterfaceOptions/CachePagesOption.vue'

export default {
  name: 'InterfaceOptions',
  components: {
    LanguageOption,
    TimezoneOption,
    InfiniteScrollOption,
    ArtistPopupOption,
    CachePagesOption
  }
}
</script>

<style lang="sass" scoped></style>
