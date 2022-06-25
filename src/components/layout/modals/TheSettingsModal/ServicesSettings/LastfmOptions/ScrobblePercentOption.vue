<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="percentText"
    />

    <div
      ref="dropdown"
      class="ui compact selection dropdown"
      :class="{
        inverted: isDarkMode,
        disabled: isDisabled
      }"
    >
      <div
        class="default text"
      />

      <BaseIcon
        icon="dropdown"
      />

      <div class="menu">
        <div
          v-for="scrobblePercentValue in scrobblePercentValuesCollection"
          :key="scrobblePercentValue.key"
          class="item"
          :data-value="scrobblePercentValue.name"
          @click="handleScrobblePercentSelect(scrobblePercentValue.name)"
          v-text="`${scrobblePercentValue.name}%`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseIcon from '*/components/BaseIcon.vue'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'
import {
  setDropdown,
  setDropdownValue
} from '*/helpers/actions/plugins/semantic'
import {
  mainDropdownOptions
} from '*/helpers/data/plugins/semantic'
import {
  collection as formatCollection
} from '*/helpers/formatters'

export default {
  name: 'ScrobblePercentOption',
  components: {
    BaseHeader,
    BaseIcon
  },
  props: {
    isConnected: Boolean,
    isPlayerWithScrobbling: Boolean
  },
  data () {
    return {
      scrobblePercentValues: [
        25,
        50,
        75
      ]
    }
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    ...mapState(
      'player',
      {
        playerScrobblePercent: 'scrobblePercent'
      }
    ),
    percentText () {
      return this.$t(
        'settings.options.services.lastfm.scrobblePercent'
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
  watch: {
    playerScrobblePercent: 'handleScrobblePercentChange'
  },
  async mounted () {
    await this.$nextTick()

    setDropdown(
      this.$refs.dropdown,
      mainDropdownOptions()
    )

    await this.$nextTick()

    setDropdownValue(
      this.$refs.dropdown,
      this.playerScrobblePercent
    )
  },
  methods: {
    handleScrobblePercentSelect (
      value
    ) {
      updateGlobalStore(
        {
          'player.scrobblePercent': value
        }
      )
    },
    handleScrobblePercentChange (
      value
    ) {
      setDropdownValue(
        this.$refs.dropdown,
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
