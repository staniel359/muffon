<template>
  <template
    v-for="buttonData in buttonsCollection"
    :key="buttonData.uuid"
  >
    <BaseButton
      class="basic compact compatibility-common-button"
      :class="{ disabled: buttonData.isDisabled }"
      :icon="buttonData.icon"
      :text="buttonData.text"
      @click="buttonData.onClick"
    />

    <Component
      :ref="buttonData.modal.ref"
      :is="buttonData.modal.name"
      :profileId="profileId"
    />
  </template>
</template>

<script>
import BaseButton from '@/buttons/BaseButton.vue'
import BaseCommonProfileArtistsModal
  from '@/modals/profile/library/compatibility/BaseCommonProfileArtistsModal.vue'
import BaseCommonProfileAlbumsModal
  from '@/modals/profile/library/compatibility/BaseCommonProfileAlbumsModal.vue'
import BaseCommonProfileTracksModal
  from '@/modals/profile/library/compatibility/BaseCommonProfileTracksModal.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'CommonButtons',
  components: {
    BaseButton,
    BaseCommonProfileArtistsModal,
    BaseCommonProfileAlbumsModal,
    BaseCommonProfileTracksModal
  },
  props: {
    compatibilityData: {
      type: Object,
      required: true
    },
    profileId: String
  },
  data () {
    return {
      scopes: [
        'artists',
        'albums',
        'tracks'
      ],
      icons: {
        artists: 'microphone alternate',
        albums: 'record vinyl',
        tracks: 'music'
      },
      modals: {
        artists: 'BaseCommonProfileArtistsModal',
        albums: 'BaseCommonProfileAlbumsModal',
        tracks: 'BaseCommonProfileTracksModal'
      }
    }
  },
  computed: {
    buttonsCollection () {
      return formatCollection(
        this.buttons
      )
    },
    buttons () {
      return this.scopes.map(
        this.formatButtonData
      )
    }
  },
  methods: {
    handleClick (scope) {
      this.$refs[
        `${scope}Modal`
      ][0].show()
    },
    formatButtonData (scope) {
      const icon = this.icons[scope]
      const text = this.formatText(
        scope
      )
      const isDisabled = !this.formatCount(
        scope
      )

      const onClick = () => {
        this.handleClick(scope)
      }

      const modal = {
        ref: `${scope}Modal`,
        name: this.modals[scope]
      }

      return {
        icon,
        text,
        isDisabled,
        onClick,
        modal
      }
    },
    formatText (scope) {
      return this.$t(
        `pages.profile.compatibility.${scope}`,
        { count: this.formatCount(scope) }
      )
    },
    formatCount (scope) {
      return this.compatibilityData[
        `${scope}_count`
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
.compatibility-common-button
  margin-right: 0.5em !important
  margin-bottom: 0.5em !important
</style>
