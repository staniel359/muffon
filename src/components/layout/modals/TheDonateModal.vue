<template>
  <BaseModalContainer
    ref="modal"
    size="tiny"
  >
    <template
      #default="slotProps"
    >
      <div
        class="header section medium-padded"
        :class="[
          slotProps.class
        ]"
        v-text="headerText"
      />

      <ContentSection
        class="section medium-padded"
        :class="[
          slotProps.class
        ]"
      />

      <div
        class="actions main-buttons-container section medium-padded"
        :class="[
          slotProps.class
        ]"
      >
        <DeclineButton />

        <LaterButton />

        <AcceptButton />
      </div>
    </template>
  </BaseModalContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import ContentSection from './TheDonateModal/ContentSection.vue'
import DeclineButton from './TheDonateModal/DeclineButton.vue'
import LaterButton from './TheDonateModal/LaterButton.vue'
import AcceptButton from './TheDonateModal/AcceptButton.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'TheDonateModal',
  components: {
    BaseModalContainer,
    ContentSection,
    DeclineButton,
    LaterButton,
    AcceptButton
  },
  provide () {
    return {
      setModalHidden:
        this.setModalHidden
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isShowDonateModal'
      ]
    ),
    headerText () {
      return this.$t(
        'donate.header'
      )
    }
  },
  mounted () {
    if (this.isShowDonateModal) {
      this.show()
    }
  },
  methods: {
    show () {
      this.$refs
        .modal
        .show()
    },
    setModalHidden (
      {
        isShowLater = false
      } = {}
    ) {
      updateGlobalStore(
        {
          'layout.isShowDonateModal': false,
          'layout.isShowDonateModalLater': isShowLater
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
