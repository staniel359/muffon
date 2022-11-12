<template>
  <BaseDropdown
    class="floating"
    menu-direction="left"
    :options="optionsFormatted"
    :selected="order"
    :is-selection="false"
    @select="handleSelect"
  />
</template>

<script>
import BaseDropdown from '@/components/dropdowns/BaseDropdown.vue'
import orders from '@/helpers/data/orders'

export default {
  name: 'BaseOrderSelect',
  components: {
    BaseDropdown
  },
  props: {
    order: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    }
  },
  emits: [
    'select'
  ],
  computed: {
    optionsFormatted () {
      return this.modelOrders.map(
        this.formatOption
      )
    },
    modelOrders () {
      return orders[
        this.model
      ]
    },
    options () {
      return [
        {
          id: 'createdDesc',
          name: this.$t(
            'orders.createdDesc'
          ),
          icon: 'calendar outline'
        },
        {
          id: 'createdAsc',
          name: this.$t(
            'orders.createdAsc'
          ),
          icon: 'calendar outline'
        },
        {
          id: 'updatedDesc',
          name: this.$t(
            'orders.updatedDesc'
          ),
          icon: 'edit'
        },
        {
          id: 'updatedAsc',
          name: this.$t(
            'orders.updatedAsc'
          ),
          icon: 'edit'
        },
        {
          id: 'tracksCountDesc',
          name: this.$t(
            'orders.tracksCountDesc'
          ),
          icon: 'music'
        },
        {
          id: 'tracksCountAsc',
          name: this.$t(
            'orders.tracksCountAsc'
          ),
          icon: 'music'
        },
        {
          id: 'libraryArtistsCountDesc',
          name: this.$t(
            'orders.artistsCountDesc'
          ),
          icon: 'microphone alternate'
        },
        {
          id: 'libraryArtistsCountAsc',
          name: this.$t(
            'orders.artistsCountAsc'
          ),
          icon: 'microphone alternate'
        },
        {
          id: 'libraryAlbumsCountDesc',
          name: this.$t(
            'orders.albumsCountDesc'
          ),
          icon: 'record vinyl'
        },
        {
          id: 'libraryAlbumsCountAsc',
          name: this.$t(
            'orders.albumsCountAsc'
          ),
          icon: 'record vinyl'
        },
        {
          id: 'libraryTracksCountDesc',
          name: this.$t(
            'orders.tracksCountDesc'
          ),
          icon: 'music'
        },
        {
          id: 'libraryTracksCountAsc',
          name: this.$t(
            'orders.tracksCountAsc'
          ),
          icon: 'music'
        },
        {
          id: 'followersCountDesc',
          name: this.$t(
            'orders.followersCountDesc'
          ),
          icon: 'user'
        },
        {
          id: 'followersCountAsc',
          name: this.$t(
            'orders.followersCountAsc'
          ),
          icon: 'user'
        },
        {
          id: 'joinedDesc',
          name: this.$t(
            'orders.joinedDesc'
          ),
          icon: 'plus'
        },
        {
          id: 'joinedAsc',
          name: this.$t(
            'orders.joinedAsc'
          ),
          icon: 'plus'
        },
        {
          id: 'membersCountDesc',
          name: this.$t(
            'orders.membersCountDesc'
          ),
          icon: 'user'
        },
        {
          id: 'membersCountAsc',
          name: this.$t(
            'orders.membersCountAsc'
          ),
          icon: 'user'
        }
      ]
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      this.$emit(
        'select',
        value
      )
    },
    formatOption (
      order
    ) {
      function isMatchedOption (
        optionData
      ) {
        return (
          optionData.id === order
        )
      }

      return this.options.find(
        isMatchedOption
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
