<template>
  <div class="content">
    <BaseHeader
      tag="h4"
      :text="percentText"
    />

    <div
      class="ui compact selection dropdown"
      ref="dropdown"
      :class="{
        inverted: isDarkMode,
        disabled: isDisabled
      }"
    >
      <div class="default text"></div>
      <i class="dropdown icon"></i>
      <div class="menu">
        <div
          v-for="scrobblePercentValue in scrobblePercentValuesCollection"
          class="item"
          :key="scrobblePercentValue.key"
          :data-value="scrobblePercentValue.name"
          @click="handleScrobblePercentSelect(scrobblePercentValue.name)"
        >
          {{ `${scrobblePercentValue.name}%` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseHeader from '@/BaseHeader.vue'
import { updateStore } from '#/actions'
import { setDropdown, setDropdownValue } from '#/actions/plugins/semantic'
import { mainDropdownOptions } from '#/data/plugins/semantic'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'ScrobblePercentOption',
  components: {
    BaseHeader
  },
  props: {
    isConnected: Boolean,
    isPlayerWithScrobbling: Boolean
  },
  data () {
    return {
      scrobblePercentValues: [25, 50, 75]
    }
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    ...mapState('player', {
      playerScrobblePercent: 'scrobblePercent'
    }),
    percentText () {
      return this.$t(
        'layout.settings.options.services.lastfm.scrobblePercent'
      )
    },
    scrobblePercentValuesCollection () {
      return formatCollection(
        this.scrobblePercentValues
      )
    },
    isDisabled () {
      return !(
        this.isConnected &&
          this.isPlayerWithScrobbling
      )
    }
  },
  mounted () {
    this.$nextTick(() => {
      setDropdown(
        this.$refs.dropdown,
        mainDropdownOptions()
      )

      this.$nextTick(() => {
        setDropdownValue(
          this.$refs.dropdown,
          this.playerScrobblePercent
        )
      })
    })
  },
  watch: {
    playerScrobblePercent: 'handleScrobblePercentChange'
  },
  methods: {
    handleScrobblePercentSelect (value) {
      updateStore({
        'player.scrobblePercent': value
      })
    },
    handleScrobblePercentChange (value) {
      setDropdownValue(
        this.$refs.dropdown,
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
