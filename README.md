# react-simple-soundcloud-widget

Basically this is a rewrite of the simple https://github.com/troybetz/react-soundcloud-widget, which was unfortunately not being maintained any more.

### dependencies

This library assumes you are using React and manage the React dependency by yourself.

### use

install:

```javascript
npm i react-simple-soundcloud-widget
```

using:

```javascript
import SoundCloudWidget from 'react-simple-soundcloud-widget'

<SoundCloudWidget
    url="https://soundcloud.com/timo-vaerigjarson/i-searched-myself"
/>
```

This is all that is truly necessary. Everything else is optional. Here is an example with all possible props for reference:

```javascript
<SoundCloud
    url="https://soundcloud.com/timo-vaerigjarson/i-searched-myself"
    config={{
        auto_play: true // default
        visual: false // default
        buying: true // default
        liking: true // default
        download: true // default
        sharing: true // default
        show_artwork: true // default
        show_comments: true // default
        show_playcount: true // default
        show_user: true // default
        show_reposts: false // default
        hide_related: false // default
    }}
    onPlay={() => console.log('on play called')}
    onPause={() => console.log('on pause called')}
    onEnd={() => console.log('on end called')}
/>
```

### develop

```javascript
npm i
npm run start
```
