<template>
  <div class="main-settings-options-block">
    <LanguageOption />

    <TimezoneOption />

    <InfiniteScrollOption />

    <ArtistPopupOption />

    <InnerCountersOption />

    <CachePagesOption />

    <ScaleOption />
  </div>
</template>

<script>
import LanguageOption from './InterfaceOptions/LanguageOption.vue'
import TimezoneOption from './InterfaceOptions/TimezoneOption.vue'
import InfiniteScrollOption from './InterfaceOptions/InfiniteScrollOption.vue'
import ArtistPopupOption from './InterfaceOptions/ArtistPopupOption.vue'
import InnerCountersOption from './InterfaceOptions/InnerCountersOption.vue'
import CachePagesOption from './InterfaceOptions/CachePagesOption.vue'
import ScaleOption from './InterfaceOptions/ScaleOption.vue'

export default {
  name: 'InterfaceOptions',
  components: {
    LanguageOption,
    TimezoneOption,
    InfiniteScrollOption,
    ArtistPopupOption,
    InnerCountersOption,
    CachePagesOption,
    ScaleOption
  }
}
</script>

<style lang="sass" scoped></style>
