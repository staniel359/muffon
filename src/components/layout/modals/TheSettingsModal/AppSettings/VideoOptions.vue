<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="videoText"
      is-horizontal
    />

    <div>
      <AutoplayOption />
    </div>
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import AutoplayOption from './VideoOptions/AutoplayOption.vue'

export default {
  name: 'VideoOptions',
  components: {
    BaseDivider,
    AutoplayOption
  },
  computed: {
    videoText () {
      return this.$t(
        'settings.sections.app.video'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
