<script>
import { mapState } from 'vuex'
import { updateTitle as updatePlayerTitle } from '#/actions/player'

export default {
  name: 'TheTitleObserver',
  computed: {
    ...mapState('audio', {
      audioStatus: 'status'
    })
  },
  watch: {
    playerPlaying: 'handlePlayerPlayingChange',
    audioStatus: 'handleAudioStatusChange'
  },
  methods: {
    handleAudioStatusChange () {
      updatePlayerTitle()
    },
    handlePlayerPlayingChange () {
      updatePlayerTitle()
    }
  }
}
</script>

<style lang="sass" scoped></style>
