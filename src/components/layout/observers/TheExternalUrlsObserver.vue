<template>
  <div
    id="the-external-links-observer"
  />
</template>

<script>
import {
  ipcRenderer,
  shell
} from 'electron'
import {
  main as formatVideoLink
} from '@/helpers/formatters/links/video'
import {
  main as formatVideoChannelLink
} from '@/helpers/formatters/links/videoChannel'
import newTabMixin from '@/mixins/newTabMixin'

export default {
  name: 'TheExternalUrlsObserver',
  mixins: [
    newTabMixin
  ],
  data () {
    return {
      formatters: [
        {
          id: 'youtube.playlistId',
          regex:
            /https:\/\/www.youtube.com\/watch\?.*v=.+&list=([\w_-]+)/,
          formatPath: id => {
            return null
          }
        },
        {
          id: 'youtube.videoId',
          regex:
            /https:\/\/www.youtube.com\/watch\?.*v=([\w_-]+)/,
          formatPath: id => {
            return formatVideoLink(
              {
                videoId: id
              }
            ).path
          }
        },
        {
          id: 'youtube.channelId',
          regex:
            /https:\/\/www.youtube.com\/channel\/([\w_-]+)/,
          formatPath: id => {
            return formatVideoChannelLink(
              {
                channelId: id
              }
            ).path
          }
        }
      ]
    }
  },
  mounted () {
    ipcRenderer.on(
      'open-external-url',
      this.handleOpenExternalUrl
    )
  },
  methods: {
    handleOpenExternalUrl (
      _,
      {
        url
      }
    ) {
      const path =
        this.formatPath(
          {
            url
          }
        )

      if (path) {
        this.openNewTab(
          {
            path
          }
        )
      } else {
        shell.openExternal(
          url
        )
      }
    },
    formatPath (
      {
        url
      }
    ) {
      const formatterData =
        this.getFormatterData(
          {
            url
          }
        )

      if (formatterData) {
        const {
          regex,
          formatPath
        } = formatterData

        const id =
          this.getMatch(
            {
              url,
              regex
            }
          )

        return formatPath(
          id
        )
      }
    },
    getFormatterData (
      {
        url
      }
    ) {
      const isMatchedFormatter = (
        {
          regex
        }
      ) => {
        return this.getMatch(
          {
            url,
            regex
          }
        )
      }

      return this.formatters.find(
        isMatchedFormatter
      )
    },
    getMatch (
      {
        url,
        regex
      }
    ) {
      return url.match(
        regex
      )?.[1]
    }
  }
}
</script>

<style lang="sass" scoped></style>
