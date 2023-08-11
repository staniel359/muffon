<template>
  <BaseModalContainer
    ref="modal"
  >
    <div class="content full-height">
      <BaseImportConnectSection
        v-if="isRenderLastfmConnectSection"
        source="lastfm"
        scope="favoriteTracks"
      />

      <BaseDivider />

      <ImportSection
        v-if="isImport"
        :source="source"
        :scope="scope"
        :limit="limit"
        :total-count="totalCount"
      />
      <SaveSection
        v-if="isSave"
        :scope="scope"
        :collection="collection"
      />
    </div>
  </BaseModalContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import BaseImportConnectSection
  from '@/components/sections/import/BaseImportConnectSection.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import ImportSection from './BaseFavoritesAccountImportModal/ImportSection.vue'
import SaveSection from './BaseFavoritesAccountImportModal/SaveSection.vue'

export default {
  name: 'BaseFavoritesAccountImportModal',
  components: {
    BaseModalContainer,
    BaseImportConnectSection,
    BaseDivider,
    ImportSection,
    SaveSection
  },
  provide () {
    return {
      import: this.import,
      save: this.save,
      retry: this.retry,
      reset: this.reset,
      hideModal: this.hide
    }
  },
  props: {
    scope: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      status: null,
      source: null,
      userData: null,
      collection: [],
      limitsData: {
        lastfm: 500
      }
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileConnections: 'connections'
      }
    ),
    isImport () {
      return (
        this.status === 'import'
      )
    },
    isSave () {
      return (
        this.status === 'save'
      )
    },
    totalCount () {
      return this.userData?.[
        `favorite_${this.scope}_count`
      ]
    },
    isRenderLastfmConnectSection () {
      return (
        !!this.lastfmConnection && (
          !this.source ||
            this.isLastfmSource
        )
      )
    },
    lastfmConnection () {
      return this.profileConnections.lastfm
    },
    isLastfmSource () {
      return (
        this.source === 'lastfm'
      )
    },
    limit () {
      return this.limitsData[
        this.source
      ]
    }
  },
  methods: {
    import (
      {
        userData,
        source
      } = {}
    ) {
      if (userData) {
        this.status = 'import'

        this.userData = userData
        this.source = source
      }
    },
    save (
      value
    ) {
      this.status = 'save'

      this.collection = [
        ...value
      ]
    },
    retry (
      value
    ) {
      this.collection = [
        ...value
      ]
    },
    reset () {
      this.status = null
      this.source = null
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>
