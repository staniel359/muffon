# muffon
[![main](https://github.com/staniel359/muffon/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/staniel359/muffon/actions/workflows/main.yml)
[![Discord](https://img.shields.io/discord/1023883455504850974?logo=discord&label=Discord&logoColor=white)](https://discord.gg/kpWsA5NBmJ)

![muffon](https://i.ibb.co/b2fLF6V/2022-05-20-23-12-01.png)

## Description
**muffon** is a music streaming browser for desktop.

It retrieves metadata, audio, and video from various Internet sources, such as:

- <img src="https://www.last.fm/static/images/favicon.702b239b6194.ico" height="16"> **Last.FM**
- <img src="https://vk.com/images/icons/favicons/fav_logo.ico" height="16"> **VK**
- <img src="https://ok.ru/favicon.ico" height="16"> **Odnoklassniki**
- <img src="https://music.yandex.ru/favicon32.png" height="16"> **Yandex Music**
- <img src="https://s4.bcbits.com/img/favicon/favicon-32x32.png" height="16"> **Bandcamp**
- <img src="https://e-cdns-files.dzcdn.net/cache/images/common/favicon/favicon.a6a53d55264841165a904dbea19d5d73.ico" height="16"> **Deezer**
- <img src="https://a-v2.sndcdn.com/assets/images/sc-icons/favicon-2cadd14bdb.ico" height="16"> **SoundCloud**
- <img src="https://open.spotifycdn.com/cdn/images/favicon32.8e66b099.png" height="16"> **Spotify**
- <img src="https://www.youtube.com/s/desktop/18069be1/img/favicon_32x32.png" height="16"> **YouTube**
- <img src="https://st.discogs.com/94414fa553c3f284a04c3da67024dd6574b8ab6f/images/favicon.ico" height="16"> **Discogs**
- <img src="https://assets.genius.com/images/apple-touch-icon.png" height="16"> **Genius**

It has **no ads** and is **absolutely free** to use.

### Features
- listening (artists / albums / tracks) (also offline)
- queue
- music library (and compatibility with others)
- music services integration (Last.FM)
- recommendations (based on your library)
- search (through all of the sources above)
- radio (tags / artists / top)
- scrobbling (Last.FM)
- videos (YouTube) (with channels)
- lyrics (Genius)
- tags (with top artists / albums / tracks)
- top (artists / albums / tracks / tags) (with country select)
- new / upcoming releases
- multitag search
- playlists
- favorites (artists / albums / tracks)
- bookmarks (artists / albums / tracks)
- listened (artists / albums / tracks)
- posting
- following
- messaging
- feed (also global)
- communities
- sharing (artists / albums / tracks / videos / playlists / communities)
- theming (dark mode / background change / transparency change)

### Upcoming features
- add album / queue to playlist
- Yandex Music / Deezer / Spotify integration
- music labels (artists / albums)
- playlists import
- videos favorites / bookmarks / watched
- new messenger
- ??? (your suggestions)

### Languages
- English
- Русский

### Technical stack
- Vue
- Electron

### Available platforms
- Windows
- MacOS
- Linux

## Download
[Latest (v0.3.0)](https://github.com/staniel359/muffon/releases/tag/v0.3.0)

## Build

1. Download source code of the [latest release](#download)
2. Unzip the file: `tar -xzf muffon-{version}.tar.gz` or `unzip muffon-{version}.zip`
3. Go to project folder: `cd muffon-{version}`
4. Install Node.js and Yarn
5. Install dependencies: `yarn`
6. Compile project: `yarn build:all`
7. Go to compiled project folder: `cd build_electron/linux-unpacked`
8. Run application: `./muffon` or double-click `muffon` file in folder

## Support

#### Have a question?
[Join Discord chat](https://discord.gg/kpWsA5NBmJ)

#### Have a suggestion / bug report?
[Create an issue](https://github.com/staniel359/muffon/issues/new)

## Contribute
- Translators wanted for localization
- Python + Ruby developers wanted for [Spotify library](https://github.com/kokarare1212/librespot-python) reverse engineering

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/staniel359)

## Related projects
[muffon-api](https://github.com/staniel359/muffon-api) - REST API for client

[muffon-website](https://github.com/staniel359/muffon-website) - Website
