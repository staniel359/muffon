<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="mainText"
      isHorizontal
    />

    <LanguageOption />
  </div>
</template>

<script>
import BaseDivider from '@/BaseDivider.vue'
import LanguageOption from './MainOptions/LanguageOption.vue'

export default {
  name: 'MainOptions',
  components: {
    BaseDivider,
    LanguageOption
  },
  computed: {
    mainText () {
      return this.$t(
        'layout.settings.sections.app.main'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
