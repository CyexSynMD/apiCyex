## Penginstalan
> npm install apiCyex
>
> npm uninstall apiCyex
>

## ```Downloader```
```js
const cx = require('apiCyex');

const url_youtube = 'https://www.youtube.com/watch?v=7bXCNmqSwfs'
const url_tiktok = 'https://vm.tiktok.com/ZMFMun818/'
const url_instagram = 'https://www.instagram.com/p/CNg0PJWHWIU/'
const url_facebook = 'https://fb.watch/gcqqhaEaEP/'
const url_twitter = 'https://twitter.com/i/status/1578737162757242881'
const url_soundcloud = 'https://soundcloud.com/everythinggbc/lil-peep-hate-my-fuccn-life?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
const url_imgur = 'https://imgur.com/gallery/rK8ppvC'
const url_imdb = 'https://www.imdb.com/video/vi146981657?listId=ls053181649'
const url_telesticker = 'https://t.me/addstickers/FG_Stickers1'

// youtube
fg.yta(url_youtube)
    .then(data => {console.log(data)
});

fg.ytv(url_youtube)
    .then(data => {console.log(data)
});

// tiktok
fg.tiktok(url_tiktok)
    .then(data => {console.log(data)
});

// Google drive
fg.GDriveDl(url_gdrive)
    .then(data => {console.log(data)
});

// instagram
fg.igdl(url_instagram)
    .then(data => {console.log(data)
});

// facebook
fg.fbdl(url_facebook)
    .then(data => {console.log(data)
});

// twitter
fg.twitter(url_twitter)
    .then(data => {console.log(data)
});

// soundcloud
fg.SoundCloud(url_soundcloud)
    .then(data => {console.log(data)
});

// imgur
fg.Imgur(url_imgur)
    .then(data => {console.log(data)
});

// imdb
fg.Imdb(url_imdb)
    .then(data => {console.log(data)
});

// telesticker
fg.Telesticker(url_telesticker)
    .then(data => {console.log(data)
});
```
## ```Other```
```js
const cx = require('apiCyex');

const Emoji1 = '😎'
const Emoji2 = '🙂'  



// Emojimix
cx.emojimix(Emoji1, Emoji2)
.then(console.log);
```

## ```Anime```
```js
const cx = require('apiCyex');

const query = 'naruto'


// manga
cx.Manga(query)
    .then(data => {console.log(data)
});

// character
cx.Character(query)
    .then(data => {console.log(data)
});
```

## ```Search```
```js
const cx = require('apiCyex');

const query_pinterest = 'Loli'
const query_film = 'The Last of Us'
const query_wattpad = 'Apa aja'
const query_webtoons = 'ngga biasa baca'
const query_mangatoons = 'the last human'
const query_drakor = 'dr stran'
const query_stickersearch = 'patrick'
const query_resep = 'Mie Goreng'
const query_wall = 'Anime'

// pinterest
cx.Pinterest(query_pinterest)
    .then(data => {console.log(data)
});

// wallpaperHd
cx.WallpaperHd(query_wall)
    .then(data => {console.log(data)
});

// film
cx.Film(query_film)
    .then(data => {console.log(data)
});

// wattpad
cx.Wattpad(query_wattpad)
    .then(data => {console.log(data)
});

// webtoons
cx.Webtoons(query_webtoons)
    .then(data => {console.log(data)
});

// mangatoons
cx.Mangatoons(query_mangatoons)
    .then(data => {console.log(data)
});

// drakor
cx.Drakor(query_drakor)
    .then(data => {console.log(data)
});

// stickersearch
cx.StickerSearch(query_stickersearch)
    .then(data => {console.log(data)
});

// resepsearch
cx.ResepSearch(query_resep)
    .then(data => {console.log(data)
});

```

## ```Islami```
```js
const cx = require('apiCyex');

const query = 'udin'

// listsurah
cx.ListSurah()
    .then(data => {console.log(data)
});

// surah
cx.Surah(query)
    .then(data => {console.log(data)
});

// tafsirsurah
cx.TafsirSurah(query)
    .then(data => {console.log(data)
});
```

## ```Information && News```
```js
const cx = require('apiCyex');

const user_ig = 'davekgw'

// jadwalbola
cx.JadwalBola()
    .then(data => {console.log(data)
});

// jadwaltv
cx.JadwalTv()
    .then(data => {console.log(data)
});

// jadwalsholat
cx.JadwalSholat()
    .then(data => {console.log(data)
});

// kompasnews
cx.KompasNews()
    .then(data => {console.log(data)
});

// inews
cx.Inews()
    .then(data => {console.log(data)
});

// tiktok stalk
cx.ttStalk(user_tiktok)
    .then(data => {console.log(data)
});

// igstalk
cx.igStalk(user_ig)
    .then(data => {console.log(data)
});
```