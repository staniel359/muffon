<template>
  <BaseDropdown
    class="floating scrolling"
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
          icon: 'date'
        },
        {
          id: 'createdAsc',
          name: this.$t(
            'orders.createdAsc'
          ),
          icon: 'date'
        },
        {
          id: 'updatedDesc',
          name: this.$t(
            'orders.updatedDesc'
          ),
          icon: 'date'
        },
        {
          id: 'updatedAsc',
          name: this.$t(
            'orders.updatedAsc'
          ),
          icon: 'date'
        },
        {
          id: 'tracksCountDesc',
          name: this.$t(
            'orders.tracksCountDesc'
          ),
          icon: 'track'
        },
        {
          id: 'tracksCountAsc',
          name: this.$t(
            'orders.tracksCountAsc'
          ),
          icon: 'track'
        },
        {
          id: 'libraryArtistsCountDesc',
          name: this.$t(
            'orders.artistsCountDesc'
          ),
          icon: 'artist'
        },
        {
          id: 'libraryArtistsCountAsc',
          name: this.$t(
            'orders.artistsCountAsc'
          ),
          icon: 'artist'
        },
        {
          id: 'libraryAlbumsCountDesc',
          name: this.$t(
            'orders.albumsCountDesc'
          ),
          icon: 'album'
        },
        {
          id: 'libraryAlbumsCountAsc',
          name: this.$t(
            'orders.albumsCountAsc'
          ),
          icon: 'album'
        },
        {
          id: 'libraryTracksCountDesc',
          name: this.$t(
            'orders.tracksCountDesc'
          ),
          icon: 'track'
        },
        {
          id: 'libraryTracksCountAsc',
          name: this.$t(
            'orders.tracksCountAsc'
          ),
          icon: 'track'
        },
        {
          id: 'followersCountDesc',
          name: this.$t(
            'orders.followersCountDesc'
          ),
          icon: 'follower'
        },
        {
          id: 'followersCountAsc',
          name: this.$t(
            'orders.followersCountAsc'
          ),
          icon: 'follower'
        },
        {
          id: 'joinedDesc',
          name: this.$t(
            'orders.joinedDesc'
          ),
          icon: 'communityJoin'
        },
        {
          id: 'joinedAsc',
          name: this.$t(
            'orders.joinedAsc'
          ),
          icon: 'communityJoin'
        },
        {
          id: 'membersCountDesc',
          name: this.$t(
            'orders.membersCountDesc'
          ),
          icon: 'member'
        },
        {
          id: 'membersCountAsc',
          name: this.$t(
            'orders.membersCountAsc'
          ),
          icon: 'member'
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
