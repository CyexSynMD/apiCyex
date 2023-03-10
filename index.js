const axios = require('axios')
const cheerio = require('cheerio')
const request = require('request')
const qs = require('qs')
const cookie = require('cookie')
const FormData = require('form-data')
const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')
const yts = require('yt-search')
const ytdl = require("ytdl-core")
const { sizeFormatter } = require("human-readable")
const util = require("./util")
const author = "@FG98"

//---
let formatSize = sizeFormatter({
	std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B`
})

//--
const film = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://167.99.31.48/?s=${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                $('#content > div > div.los').each(function (a, b) {
                    $(b).find('article').each(function (c, d) {
                        const judul = $(d).find('div > a > div.addinfox > header > h2').text()
                        const quality = $(d).find('div > a > div > div > span').text()
                        const type = $(d).find('div > a > div.addinfox > div > i.type').text()
                        const upload = $(d).find('div > a > div.addinfox > div > span').text()
                        const link = $(d).find('div > a').attr('href');
                        const thumb = $(d).find('div > a > div > img').attr('src');
                        const result = {
                            status: 200,
                            author: author,
                            judul: judul,
                            quality: quality,
                            type: type,
                            upload: upload,
                            link: link,
                            thumb: thumb,
                        };
                        hasil.push(result);
                    });
                });
                resolve(hasil)
            })
            .catch(reject)
    })
}
const anime = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.anime-planet.com/anime/all?name=${query}`)
            .then(({
                data
            }) => {
                const hasil = []
                const $ = cheerio.load(data)
                $('#siteContainer > ul.cardDeck.cardGrid > li ').each(function (a, b) {
                        result = {
                            status: 200,
                            author: author,
                            judul: $(b).find('> a > h3').text(),
                            link: 'https://www.anime-planet.com' + $(b).find('> a').attr('href'),
                            thumbnail: 'https://www.anime-planet.com' + $(b).find('> a > div.crop > img').attr('src')
                        };
                        hasil.push(result);
                    });
                resolve(hasil)
            })
            .catch(reject)
    })
}
const manga = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.anime-planet.com/manga/all?name=${query}`)
            .then(({
                data
            }) => {
                const hasil = []
                const $ = cheerio.load(data)
                $('#siteContainer > ul.cardDeck.cardGrid > li ').each(function (a, b) {
                        result = {
                            status: 200,
                            author: author,
                            judul: $(b).find('> a > h3').text(),
                            link: 'https://www.anime-planet.com' + $(b).find('> a').attr('href'),
                            thumbnail: 'https://www.anime-planet.com' + $(b).find('> a > div.crop > img').attr('src')
                        };
                        hasil.push(result);
                    });
                resolve(hasil)
            })
            .catch(reject)
    })
}
const character = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.anime-planet.com/characters/all?name=${query}`)
            .then(({
                data
            }) => {
                const hasil = []
                const $ = cheerio.load(data)
                $('#siteContainer > table > tbody > tr').each(function (a, b) {
                        result = {
                            status: 200,
                            author: author,
                            character: $(b).find('> td.tableCharInfo > a').text(),
                            link: 'https://www.anime-planet.com' + $(b).find('> td.tableCharInfo > a').attr('href'),
                            thumbnail: $(b).find('> td.tableAvatar > a > img').attr('src').startsWith('https://') ? $(b).find('> td.tableAvatar > a > img').attr('src') : 'https://www.anime.planet.com' + $(b).find('> td.tableAvatar > a > img').attr('src')
                        };
                        hasil.push(result);
                    });
                resolve(hasil)
            })
            .catch(reject)
    })
}
const jadwalbola = () => {
    return new Promise((resolve, reject) => {
        axios.get('https://m.bola.net/jadwal_televisi/')
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                $('#main_mid_headline_sub_topic').each(function(a, b) {
                    result = {
                    status: 200,
                    author: author,
                    jadwal: $(b).find(' > div.main_mid_headline_topic > div > a').text(),
                    tanggal: $(b).find(' > div.main_mid_headline_topic_grouped_time_list').text().split('\n')[1].split('                            ')[1],
                    jam: $(b).find(' > div.main_mid_headline_topic > span').text(),
                    url: $(b).find(' > div.main_mid_headline_topic > div > a').attr('href'),
                    thumb: $(b).find(' > div.main_mid_headline_topic > img').attr('src')
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}
const jadwaltv = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://www.dokitv.com/jadwal-acara-tv')
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                $('#tabeljadwaltv > tbody > tr ').each(function(a, b) {
                    result = {
                    status: 200,
                    author: author,
                    acara: $(b).find('> td:nth-child(2)').text(),
                    channel: $(b).find('> td > a').text(),
                    jam: $(b).find('> td.jfx').text(),
                    source: $(b).find('> td > a').attr('href')
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}
const jadwalsholat = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://umrotix.com/jadwal-sholat/${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                $('body > div > div.main-wrapper.scrollspy-action > div:nth-child(3) ').each(function(a, b) {   
                    result = {
                    status: 200,
                    author: author,
                    tanggal: $(b).find('> div:nth-child(2)').text(),
                    imsyak: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(1) > p:nth-child(2)').text(),
                    subuh: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(2) > p:nth-child(2)').text(),
                    dzuhur: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(3) > p:nth-child(2)').text(),
                    ashar: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(4) > p:nth-child(2)').text(),
                    maghrib: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(5) > p:nth-child(2)').text(),
                    isya: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(6) > p:nth-child(2)').text()
                }
                resolve(result)
                })
            })
            .catch(reject)
    })
}
const wattpad = (query) => {
    return new Promise((resolve, reject) => {
        axios.get('https://www.wattpad.com/search/' + query)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const result = [];
                const linkk = [];
                const judull = [];
                const thumb = [];
                const dibaca = [];
                const vote = [];
                const bab = [];
                $('ul.list-group > li.list-group-item').each(function(a, b) {
                    linkk.push('https://www.wattpad.com' + $(b).find('a').attr('href'))
                    thumb.push($(b).find('img').attr('src'))
                })
                $('div.story-card-data.hidden-xxs > div.story-info > ul > li:nth-child(1) > div.icon-container > div > span.stats-value').each(function(e, f) {
                    baca = $(f).text();
                    dibaca.push(baca)
                })
                $('div.story-card-data.hidden-xxs > div.story-info > ul > li:nth-child(2) > div.icon-container > div > span.stats-value').each(function(g, h) {
                    vot = $(h).text();
                    vote.push(vot)
                })
                $('div.story-card-data.hidden-xxs > div.story-info > ul > li:nth-child(3) > div.icon-container > div > span.stats-value').each(function(i, j) {
                    bb = $(j).text();
                    bab.push(bb)
                })
                $('div.story-card-data.hidden-xxs > div.story-info > div.title').each(function(c, d) {
                    titel = $(d).text();
                    judull.push(titel)
                })
                for (let i = 0; i < linkk.length; i++) {
                    if (!judull[i] == '') {
                        result.push({
                            judul: judull[i],
                            dibaca: dibaca[i],
                            divote: vote[i],
                            thumb: thumb[i],
                            link: linkk[i]
                        })
                    }
                }
                resolve(result)
            })
            .catch(reject)
    })
}

const wattpaduser = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.wattpad.com/user/${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                $('#app-container > div > header ').each(function(a, b) {
                    $('#profile-about > div > div ').each(function(c, d) {
                    result = {
                    status: 200,
                    author: author,
                    username: $(b).find('> div.badges > h1').text().trim(),
                    works: $(b).find('> div.row.header-metadata > div:nth-child(1) > p:nth-child(1)').text(),
                    reading_list: $(b).find('> div.row.header-metadata > div.col-xs-4.scroll-to-element > p:nth-child(1)').text(),
                    followers: $(b).find('> div.row.header-metadata > div.col-xs-4.on-followers > p.followers-count').text(),
                    joined: $(d).find('> ul > li.date.col-xs-12.col-sm-12 > span').text().trim().replace('Joined',''),
                    pp_picture: `https://img.wattpad.com/useravatar/${query}.128.851744.jpg`,
                    about: $(d).find('> div.description > pre').text() ? $(d).find('> div.description > pre').text() : 'Not found'
                }
                resolve(result)
                })
                })
            })
            .catch(reject)
    })
}
const mangatoons = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://mangatoon.mobi/en/search?word=${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                 $('#page-content > div.search-page > div > div.comics-result > div.recommended-wrap > div > div ').each(function(a, b) {
                    result = {
                    status: 200,
                    author: author,
                    judul: $(b).find('> div.recommend-comics-title > span').text(),
                    genre: $(b).find('> div.comics-type > span').text().trim(),
                    link: 'https://mangatoon.mobi' + $(b).find('> a').attr('href'),
                    thumbnail: $(b).find('> a > div > img').attr('src')
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}
const webtoons = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.webtoons.com/es/search?keyword=${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                 $('#content > div.card_wrap.search._searchResult > ul > li ').each(function(a, b) {
                    result = {
                    status: 200,
                    author: author,
                    judul: $(b).find('> a > div > p.subj').text(),
                    like: $(b).find('> a > div > p.grade_area > em').text(),
                    creator: $(b).find('> a > div > p.author').text(),
                    genre: $(b).find('> a > span').text(),
                    thumbnail: $(b).find('> a > img').attr('src'),
                    url: 'https://www.webtoons.com' + $(b).find('> a').attr('href')
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}
const drakor = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://drakorasia.blog//?s=${query}&post_type=post`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                 $('#post > div ').each(function(a, b) {
                    result = {
                    status: 200,
                    author: author,
                    judul: $(b).find('> div.title.text-center.absolute.bottom-0.w-full.py-2.pb-4.px-3 > a > h2').text().trim(),
                    years: $(b).find('> div.title.text-center.absolute.bottom-0.w-full.py-2.pb-4.px-3 > div.category.text-gray.font-normal.text-white.text-xs.truncate > a').text(),
                    genre: $(b).find('> div.title.text-center.absolute.bottom-0.w-full.py-2.pb-4.px-3 > div.genrenya.text-center.text-white.text-opacity-75.text-xs.mt-1').text().trim(),
                    thumbnail: $(b).find('> div.thumbnail > a > img').attr('src'),
                    url: $(b).find('> div.title.text-center.absolute.bottom-0.w-full.py-2.pb-4.px-3 > a').attr('href')
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}
exports.telesticker = async (url) => {
    return new Promise(async (resolve, reject) => {
        packName = url.replace("https://t.me/addstickers/", "")
        data = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`, {method: "GET",headers: {"User-Agent": "GoogleBot"}})
        const hasil = []
        for (let i = 0; i < data.data.result.stickers.length; i++) {
            fileId = data.data.result.stickers[i].thumb.file_id
            data2 = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
            result = {
            status: 200,
            author: author,
            url: "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + data2.data.result.file_path
            }
            hasil.push(result)
        }
    resolve(hasil)
    })
}
const stickersearch = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://getstickerpack.com/stickers?query=${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const source = [];
                const link = [];
                $('#stickerPacks > div > div:nth-child(3) > div > a').each(function(a, b) {
                    source.push($(b).attr('href'))
                })
                axios.get(source[Math.floor(Math.random() * source.length)])
                    .then(({
                        data
                    }) => {
                        const $$ = cheerio.load(data)
                        $$('#stickerPack > div > div.row > div > img').each(function(c, d) {
                            link.push($$(d).attr('src').replace(/&d=200x200/g,''))
                        })
                        result = {
                            status: 200,
                            author: author,
                            title: $$('#intro > div > div > h1').text(),
                            sticker_url: link
                        }
                        resolve(result)
                    })
            }).catch(reject)
    })
}


const listsurah = () => {
            return new Promise((resolve, reject) => {
                  axios.get('https://litequran.net/')
                  .then(({ data }) => {
                       const $ = cheerio.load(data)
                       let listsurah = []
                       $('body > main > section > ol > li > a').each(function(a, b) {
                    listsurah.push($(b).text())
                })
                       result = {
                        status: 200,
                        author: author,
                        listsurah: listsurah
                       }
                       resolve(result)
                  }).catch(reject)
             })
        }
const surah = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://litequran.net/${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = []
                $('body > main > article > ol > li').each(function(a, b) {
                    result = {
                    status: 200,
                    author: author,
                    arab: $(b).find('> span.ayat').text(),
                    latin: $(b).find('> span.bacaan').text(),
                    translate: $(b).find('> span.arti').text()
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}
const tafsirsurah = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://tafsirq.com/topik/${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = []
                $('body > div:nth-child(4) > div > div.col-md-6 > div ').each(function(a, b) {
                    result = {
                    status: 200,
                    author: author,
                    surah: $(b).find('> div.panel-heading.panel-choco > div > div > a').text(),
                    tafsir: $(b).find('> div.panel-body.excerpt').text().trim(),
                    type: $(b).find('> div.panel-heading.panel-choco > div > div > span').text(),
                    source: $(b).find('> div.panel-heading.panel-choco > div > div > a').attr('href')
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}
const downloader = async (url) => {
    return new Promise((resolve, reject) => {
        axios({url: 'https://aiovideodl.ml/',method: 'GET',headers: {"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36","cookie": "PHPSESSID=3893d5f173e91261118a1d8b2dc985c3; _ga=GA1.2.792478743.1635388171;"}}).then((data) => {
            let a = cheerio.load(data.data)
            let token = a('#token').attr('value')
            const options = {
                method: 'POST',
                url: `https://aiovideodl.ml/wp-json/aio-dl/video-data/`,
                headers: {"content-type": "application/x-www-form-urlencoded; charset=UTF-8","user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36","cookie": "PHPSESSID=3893d5f173e91261118a1d8b2dc985c3; _ga=GA1.2.792478743.1635388171;"
                },
                formData: {url: url,token: token}
            };
            request(options, async function(error, response, body) {
                if (error) throw new Error(error)
                res = JSON.parse(body)
                res.status = 200
                res.author = author
                resolve(res);
            });
        })
    })
}
const pinterest = (query) => {
    return new Promise((resolve, reject) => {
         axios(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`).then((data) => {
                const random = data.data.resource_response.data.results[Math.floor(Math.random() * (data.data.resource_response.data.results.length))]
                var result = [];
                result = {
                        status: 200,
                        author: author,
                        url: random.images.orig.url
                }
                resolve(result)
            }).catch(reject)
        })
    }
const kompasnews = () => {
    return new Promise((resolve, reject) => {
        axios.get(`https://news.kompas.com/`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                 $('body > div > div.container.clearfix > div:nth-child(3) > div.col-bs10-7 > div:nth-child(3) > div.latest.ga--latest.mt2.clearfix > div > div ').each(function(a, b) {
                    result = {
                    status: 200,
                    author: author,
                    berita: $(b).find('> div > div.article__box > h3').text(),
                    upload_time: $(b).find('> div > div.article__box > div.article__date').text(),
                    type_berita: $(b).find('> div > div.article__boxsubtitle > h2').text(),
                    link: $(b).find('> div > div.article__box > h3 > a').attr('href'),
                    thumbnail: $(b).find('> div > div.article__asset > a > img').attr('data-src'),
                    info_berita: $(b).find('> div > div.article__box > div.article__lead').text()
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}


const covid = async (negara) => {
const res = await axios.get(`https://www.worldometers.info/coronavirus/country/${negara}/`) 
const $ = cheerio.load(res.data)
hasil = {}
a = $('div#maincounter-wrap')
hasil.author = author
hasil.status = res.status
hasil.kasus = $(a).find('div > span').eq(0).text()
hasil.kematian = $(a).find('div > span').eq(1).text() 
hasil.sembuh = $(a).find('div > span').eq(2).text() 
return hasil
}



exports.MangaToon = async (judul) => {
    try {
        const link = await axios.get(`https://mangatoon.mobi/es/search?word=${judul}`) 
        const c = cheerio.load(link.data)
        let id = c('#page-content').find('div.search-page > div > div.comics-result > div.recommended-wrap > div > div > a').attr('href') || 'undefined'
        if(id === 'undefined') {
            const link2 = await axios.get(`https://mangatoon.mobi/en/search?word=${judul}`)
            const C = cheerio.load(link2.data)
            let id2 = C('#page-content').find('div.search-page > div > div.comics-result > div.recommended-wrap > div > div:nth-child(1) > a').attr('href')
            const data = await axios.get(`https://mangatoon.mobi${id2}`)
            const $ = cheerio.load(data.data)
            var judul = $('#page-content').find('div.detail-wrap > div.detail-top-info > div.detail-info > div.detail-title-bg > span').text().trim()
            var genre = $('#page-content').find('div.detail-wrap > div.detail-top-info > div.detail-info > div.detail-tags-info > span').text().trim()
            var author = $('#page-content').find('div.detail-wrap > div.detail-top-info > div.detail-info > div.detail-author-name > span').text().trim()
            var thumb = $('#page-content').find('div.detail-wrap > div.detail-top-info > div.detail-img > img.big-img').attr('src');
            var LinkKe = $('#page-content').find('div.detail-wrap > div.detail-interact > a').attr('href')
            var Link = `https://mangatoon.mobi${LinkKe}`
            let Author = author.replace('Nama Author: ', '');
            let hasil = {
                judul, thumb, genre, Author, Link
            }
            return hasil
        } else {
        const data = await axios.get(`https://mangatoon.mobi${id}`)
        const $ = cheerio.load(data.data)
        var judul = $('#page-content').find('div.detail-wrap > div.detail-top-info > div.detail-info > div.detail-title-bg > span').text().trim()
        var genre = $('#page-content').find('div.detail-wrap > div.detail-top-info > div.detail-info > div.detail-tags-info > span').text().trim()
        var author = $('#page-content').find('div.detail-wrap > div.detail-top-info > div.detail-info > div.detail-author-name > span').text().trim()
        var thumb = $('#page-content').find('div.detail-wrap > div.detail-top-info > div.detail-img > img.big-img').attr('src');
        var LinkKe = $('#page-content').find('div.detail-wrap > div.detail-interact > a').attr('href')
        var Link = `https://mangatoon.mobi${LinkKe}`
        let Author = author.replace('Nama Author: ', '');
        let hasil = {
            status: 200,
            author : '@dandsubhani_',
            judul, thumb, genre, Author, Link
        }
        return hasil
    }
        } catch (err) {
            return `Not Found 404`
        }
}

async function RandomCerpen() {
    try{
    const link = await axios.get(`http://cerpenmu.com/`)
    const c = cheerio.load(link.data)
    let kumpulan = []
    c('#sidebar > div').each(function (real, ra) {
        c(ra).find('ul > li').each(function (i, rayy) {
            let random = c(rayy).find('a').attr('href')
            kumpulan.push(random)
        })
    })
    var acak = kumpulan[Math.floor(Math.random() * (kumpulan.length))]
    let Otw = await axios.get(`${acak}`)
    const C = cheerio.load(Otw.data)
    let otw = []
    C('#content > article > article').each(function (a, b) {
        let random = C(b).find('h2 > a').attr('href')
        otw.push(random)
    })
    var Acak = otw[Math.floor(Math.random() * (otw.length))]
    let Link = await axios.get(`${Acak}`)
    let $ = cheerio.load(Link.data)
    let judul = $('#content').find('article > h1').text().trim()
    let karangan = $('#content').find('article > a:nth-child(2)').text().trim()
    let Isi = []
    $('#content > article > p').each(function (wm, Ra) {
        let isi = $(Ra).text().trim()
        Isi.push(isi)

    })
    let cerita = []
    for (let i of Isi) {
        cerita += i
    }
    const data = {
        status: 200,
        author: author,
        result: {
            Judul: judul,
            Penulis: karangan,
            sumber: Acak,
            cerita: cerita
        }
    }
    return data
} catch (err) {
    const res404 = {
        status: 500,
        author: author,
        Pesan: 'Emrorr'
    }
    return res404
}
}
//- igstalk
async function igStalk(username) {
    username = username.replace(/^@/, '')
    const html = await (await fetch(`https://dumpor.com/v/${username}`)).text()
    const $$ = cheerio.load(html)
    const name = $$('div.user__title > a > h1').text().trim()
    const Uname = $$('div.user__title > h4').text().trim()
    const description = $$('div.user__info-desc').text().trim()
    const profilePic = $$('div.user__img').attr('style')?.replace("background-image: url('", '').replace("');", '')
    const row = $$('#user-page > div.container > div > div > div:nth-child(1) > div > a')
    const postsH = row.eq(0).text().replace(/Posts/i, '').trim()
    const followersH = row.eq(2).text().replace(/Followers/i, '').trim()
    const followingH = row.eq(3).text().replace(/Following/i, '').trim()
    const list = $$('ul.list > li.list__item')
    const posts = parseInt(list.eq(0).text().replace(/Posts/i, '').trim().replace(/\s/g, ''))
    const followers = parseInt(list.eq(1).text().replace(/Followers/i, '').trim().replace(/\s/g, ''))
    const following = parseInt(list.eq(2).text().replace(/Following/i, '').trim().replace(/\s/g, ''))
    return {
        name,
        username: Uname,
        description,
        postsH,
        posts,
        followersH,
        followers,
        followingH,
        following,
        profilePic
    }
}
// ttstalk

async function tiktokStalk(user) {
    let res = await axios.get(`https://urlebird.com/user/${user}/`)
    let $ = cheerio.load(res.data)
    const pp_user = $('div[class="col-md-auto justify-content-center text-center"] > img').attr('src')
    const name = $('h1.user').text().trim()
    const username = $('div.content > h5').text().trim()
    const followers = $('div[class="col-7 col-md-auto text-truncate"]').text().trim().split(' ')[1]
    const following = $('div[class="col-auto d-none d-sm-block text-truncate"]').text().trim().split(' ')[1]
    const description = $('div.content > p').text().trim()
    return {
        profile: pp_user,
        name: username, 
        username: name, 
        followers, 
        following, 
        desc: description
     } 
  }
// twitter dl
async function twitter(link) {
	return new Promise((resolve, reject) => {
    let config = {
	'URL': link
     }
axios.post('https://twdown.net/download.php',qs.stringify(config),{
	headers: {
"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
"cookie": "_ga=GA1.2.1388798541.1625064838; _gid=GA1.2.1351476739.1625064838; __gads=ID=7a60905ab10b2596-229566750eca0064:T=1625064837:RT=1625064837:S=ALNI_Mbg3GGC2b3oBVCUJt9UImup-j20Iw; _gat=1"
	}
})
.then(({ data }) => {
const $ = cheerio.load(data)
resolve({
desc: $('div:nth-child(1) > div:nth-child(2) > p').text().trim(),
thumb: $('div:nth-child(1) > img').attr('src'),
HD: $('tbody > tr:nth-child(1) > td:nth-child(4) > a').attr('href'),
SD: $('tr:nth-child(2) > td:nth-child(4) > a').attr('href'),
audio: 'https://twdown.net/' + $('tr:nth-child(4) > td:nth-child(4) > a').attr('href')
	})
})
	.catch(reject)
	})
}
//

async function Wikipedia(querry) {
    try {
    const link =  await axios.get(`https://es.wikipedia.org/wiki/${querry}`)
    const $ = cheerio.load(link.data)
    let judul = $('#firstHeading').text().trim()
    let thumb = $('#mw-content-text').find('div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img').attr('src') || `//i.ibb.co/nzqPBpC/http-error-404-not-found.png`
    let isi = []
    $('#mw-content-text > div.mw-parser-output').each(function (rayy, Ra) {
        let penjelasan = $(Ra).find('p').text().trim()
        isi.push(penjelasan)
    })
    for(let i of isi) {
    const data = {
        author: author,
        status: link.status,
        result: {
            judul: judul,
            thumb: 'https:'+thumb,
            isi: i
        }
    }
    return data
}
    } catch (err) {
        var notFond = {
            author: author,
            status: link.status,
            Pesan: 'Emrorr'
        }
        return notFond
    }
}


exports.TrendTwit = (country) => {
    return new Promise((resolve,reject) => {
        axios.get(`https://getdaytrends.com/${country}/`)
        .then(({ data }) => {
            const $ = cheerio.load(data)
            const hastag = [];
      const tweet = [];
      const result = [];
      $('#trends > table.table.table-hover.text-left.clickable.ranking.trends.wider.mb-0 > tbody > tr> td.main > a').each(function(a, b){
        deta = $(b).text()
        hastag.push(deta)
      })
      $('#trends > table.table.table-hover.text-left.clickable.ranking.trends.wider.mb-0 > tbody > tr > td.main > div > span').each(function(a, b){
        deta = $(b).text()
        tweet.push(deta)
      })
      num = 1
      for(let i=0; i<hastag.length; i++){
        result.push({
          rank: num,
          hastag: hastag[i],
          tweet: tweet[i]
        })
        num += 1
      }
            resolve({
          country: country,
          result: result
        })
        })
        .catch(reject)
    })
}

exports.mediafireDl = async (url) => {
async function getMime(links) {
bufs = await require('node-fetch')(links).then(v => v.buffer())
hsil = await require('file-type').fromBuffer(bufs)
return hsil
}
const res = await axios.get(url) 
const $ = cheerio.load(res.data)
const hasil = []
const link = $('a#downloadButton').attr('href')
const size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '')
const seplit = link.split('/')
const nama = seplit[5]
hasil.push({ status: 200, author: author, nama, size, link })
return hasil[0]
}

exports.Pinterest = async(querry) => {
    return new Promise(async(resolve,reject) => {
         axios.get('https://es.pinterest.com/search/pins/?autologin=true&q=' + querry, {
            headers: {
            "cookie" : "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
        }
            }).then(({ data }) => {
        const $ = cheerio.load(data)
        const result = [];
        const hasil = [];
         $('div > a').get().map(b => {
        const link = $(b).find('img').attr('src')
            result.push(link)
        });
        result.forEach(v => {
         if(v == undefined) return
         hasil.push(v.replace(/236/g,'736'))
            })
            hasil.shift();
        resolve(hasil)
        })
    })
}



async function Emoji(emoticon) {
    const emojii = encodeURI(`${emoticon}`)
    const link = await axios.get(`https://emojipedia.org/${emojii}/`)
    const $ = cheerio.load(link.data)
    var apple = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(1) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
    var google = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(2) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
    var samsung = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(3) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
    var microsoft = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(4) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
    var whatsapp = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(5) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
    var twitter = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(6) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
    var facebook = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(7) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
    var jooxpixel = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(8) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
    var openmoji = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(9) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
    var emojidex = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(10) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
    var messager = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(11) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
    var LG = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(12) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
    var HTC = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(13) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
    var mozilla = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(14) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
    var softbank = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(15) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
    var docomo = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(16) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
    var KDDI = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(17) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
    const result = {
        status: 200,
        author: author,
        apple: apple.replace('120', '240'),
        google: google.replace('120', '240'),
        samsung: samsung.replace('120', '240'),
        microsoft: microsoft.replace('120', '240'),
        whatsapp: whatsapp.replace('120', '240'),
        twitter: twitter.replace('120', '240'),
        facebook: facebook.replace('120', '240'),
        jooxPixel: jooxpixel.replace('120', '240'),
        openemoji: openmoji.replace('120', '240'),
        emojidex: emojidex.replace('120', '240'),
        messanger: messager.replace('120', '240'),
        LG: LG.replace('120', '240'),
        HTC: HTC.replace('120', '240'),
        mozilla: mozilla.replace('120', '240'),
        softbank: softbank.replace('120', '240'),
        docomo: docomo.replace('120', '240'),
        KDDI: KDDI.replace('120', '240')
    }
    return result
}



async function Gempa() {
    try{
    const link = await axios.get(`https://www.bmkg.go.id/gempabumi/gempabumi-dirasakan.bmkg`)
    const $ = cheerio.load(link.data)
    let hasil = []
    $('body > div.wrapper > div.container.content > div > div.col-md-8 > div > div > table > tbody').each(function (a, b) {
        $(b).find('tr').each(function (c, d) {
            let tanggal = $(d).find('td:nth-child(2)').text().trim()
            let koordinat = $(d).find('td:nth-child(3)').text().trim()
            let magnitudo = $(d).find('td:nth-child(4)').text().trim()
            let kedalaman = $(d).find('td:nth-child(5)').text().trim()
            let skala = $(d).find('td:nth-child(6) > a').text().trim()
            const data = {
                author: author,
                status: link.status,
                result: {
                    tanggal: tanggal,
                    koordinat: koordinat,
                    getaran: magnitudo,
                    kedalaman: kedalaman,
                    skala: skala
                }
            }
            hasil.push(data)
        })
    })
    return hasil
} catch (err) {
    var notFond = {
        author: author,
        status: link.status,
        Pesan: 'ERROR'
    }
    return notFond
}
}

async function GSMArena(querry) {
    const link = await axios.get(`https://www.gsmarena.com/res.php3?sSearch=${querry}`)
    const ch = cheerio.load(link.data)
    let Url = ch('#review-body > div > ul').find('li:nth-child(1) > a').attr('href')
    const Link = await axios.get(`https://www.gsmarena.com/${Url}`)
    let $ = cheerio.load(Link.data)
    let barang = $('#body > div > div.review-header > div').find(' div.article-info-line.page-specs.light.border-bottom > h1').text().trim()
    let rilis = $('#body > div > div.review-header > div').find('div.center-stage.light.nobg.specs-accent > ul > li.specs-brief.pattern > span:nth-child(1) > span').text().trim()
    let thumb = $('#body > div > div.review-header > div').find('div.center-stage.light.nobg.specs-accent > div > a > img').attr('src')
    let ukuran = $('#body > div > div.review-header > div').find('div.center-stage.light.nobg.specs-accent > ul > li.specs-brief.pattern > span:nth-child(3) > span').text().trim()
    let tipe = $('#body > div > div.review-header > div').find('div.center-stage.light.nobg.specs-accent > ul > li.specs-brief.pattern > span:nth-child(5) > span').text().trim()
    let storage = $('#body > div > div.review-header > div').find('div.center-stage.light.nobg.specs-accent > ul > li.specs-brief.pattern > span:nth-child(7) > span').text().trim()
    let display = $('#body > div > div.review-header > div').find('div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-display > div').text().trim()
    let inchi = $('#body > div > div.review-header > div').find('div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-display > strong > span').text().trim()
    let camPix = $('#body > div > div.review-header > div').find('div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-camera > strong > span:nth-child(1)').text().trim()
    let Mp = $('#body > div > div.review-header > div').find('div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-camera > strong > span:nth-child(2)').text().trim()
    let VideoVix = $('#body > div > div.review-header > div').find('div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-camera > div').text().trim()
    let Ram = $('#body > div > div.review-header > div').find('div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-expansion > strong > span:nth-child(2)').text().trim()
    let chipset = $('#body > div > div.review-header > div').find('div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-expansion > div').text().trim()
    let batre = $('#body > div > div.review-header > div').find('div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-battery > strong > span:nth-child(1)').text().trim()
    let Mah = $('#body > div > div.review-header > div').find('div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-battery > strong > span:nth-child(2)').text().trim()
    let merekBatre = $('#body > div > div.review-header > div').find('div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-battery > div').text().trim()
    let AngkaRam = $('#body > div > div.review-header > div').find('div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-expansion > strong > span:nth-child(1)').text().trim()
    let detail = []
    $('#specs-list').each(function (anu, RA) {
        let isi = $(RA).text().trim()
        detail.push(isi)
    })
    const result = {
        status: Link.status,
        author: author,
        result: {
            judul: barang,
            rilis: rilis,
            thumb: thumb,
            ukuran: ukuran,
            type: tipe,
            storage: storage,
            display: display,
            inchi: inchi,
            pixel: camPix + Mp,
            videoPixel: VideoVix,
            ram: AngkaRam + Ram,
            chipset: chipset,
            batrai: batre + Mah,
            merek_batre: merekBatre,
            detail: detail[0]
        }
    }
    return result
}

async function Shoope(item, limit) {
    const hasil = []
    await axios.request(`https://shopee.co.id/api/v4/search/search_items?by=relevancy&keyword=${item}&limit=${limit}&newest=0&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2`, {
        method: "GET",
        data: null,
        headers: {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,id;q=0.8",
            "if-none-match-": "55b03-856cd63f16112f8a43da6096f97ac3fe",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
        }
    }).then(respon => {
        hasil.push(respon.data)
    })
    return hasil[0]
}


exports.igdl = async (url_media) => {
    return new Promise(async (resolve,reject)=>{
        const BASE_URL = "https://instasupersave.com/"
        
        //New Session = Cookies
        try {
            const resp = await axios(BASE_URL);
            const cookie = resp.headers["set-cookie"]; // get cookie from request
            const session = cookie[0].split(";")[0].replace("XSRF-TOKEN=","").replace("%3D", "")
            
            //REQUEST CONFIG
            var config = {
                method: 'post',
                url: `${BASE_URL}api/convert`,
                headers: { 
                    'origin': 'https://instasupersave.com', 
                    'referer': 'https://instasupersave.com/pt/', 
                    'sec-fetch-dest': 'empty', 
                    'sec-fetch-mode': 'cors', 
                    'sec-fetch-site': 'same-origin', 
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52', 
                    'x-xsrf-token': session, 
                    'Content-Type': 'application/json', 
                    'Cookie': `XSRF-TOKEN=${session}; instasupersave_session=${session}`
                },
                data : {
                    url: url_media
                }
            };

            //REQUEST
            axios(config).then(function (response) {
                let ig = []
                if(Array.isArray(response.data)){
                    response.data.forEach(post => { ig.push(post.sd === undefined ? post.thumb : post.sd.url)})
                } else {
                    ig.push(response.data.url[0].url)    
                }
                
                resolve({
                    results_number : ig.length,
                    url_list: ig
                })
            })
            .catch(function (error) {
                reject(error.message)
            })
        } catch(e){
            reject(e.message)
        }
    })
}
//

exports.ResepSearch = async(query) => {
            return new Promise(async(resolve,reject) => {
                axios.get('https://getdaytrends.com/?s=' + query)
                .then(({ data }) => {
                        const $ = cheerio.load(data)
                        const link = [];
                        const judul = [];
                        const upload_date = [];
                        const format = [];
                        const thumb = [];
                        $('body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-media > a').each(function(a,b){
                            link.push($(b).attr('href'))
                        })
                        $('body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-content > header > h3 > a').each(function(c,d){
                            jud = $(d).text();
                            judul.push(jud)
                        })
                        for( let i = 0; i < link.length; i++){
                            format.push({
                                judul : judul[i],
                                link : link[i]
                            })
                        }
                        const result = {
                            creator: author,
                            data : format
                        }
                  resolve(result)
            })
                .catch(reject)
            })
}
exports.ReadResep = async(query) => {
            return new Promise(async(resolve,reject) => {
                axios.get(query)
                .then(({ data }) => {
                        const $ = cheerio.load(data)
                        const abahan = [];
                        const atakaran = [];
                        const atahap = [];
                        $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-name').each(function(a,b) {
                            bh = $(b).text();
                            abahan.push(bh)
                        })
                        $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-amount').each(function(c,d) {
                            uk = $(d).text();
                            atakaran.push(uk)
                        })
                        $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-content > div.single-steps > table > tbody > tr > td.single-step-description > div > p').each(function(e,f) {
                            th = $(f).text();
                            atahap.push(th)
                        })
                        const judul = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-title.title-hide-in-desktop > h1').text();
                        const waktu = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-cooking-time > span').text();
                        const hasil = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-serves > span').text().split(': ')[1]
                        const level = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-difficulty > span').text().split(': ')[1]
                        const thumb = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-main-media > img').attr('src')
                        tbahan = 'bahan\n'
                        for( let i = 0; i < abahan.length; i++){
                            tbahan += abahan[i] + ' ' + atakaran[i] + '\n' 
                        }
                        ttahap = 'tahap\n'
                        for( let i = 0; i < atahap.length; i++){
                            ttahap += atahap[i] + '\n\n' 
                        }
                        const tahap = ttahap
                        const bahan = tbahan
                        const result = {
                            creator : author,
                            data : {
                                judul : judul,
                                waktu_masak : waktu,
                                hasil : hasil,
                                tingkat_kesulitan : level,
                                thumb : thumb,
                                bahan : bahan.split('bahan\n')[1],
                                langkah_langkah : tahap.split('tahap\n')[1]
                            }
                        }
                  resolve(result)
            })
                .catch(reject)
            })
}

exports.Goredl = async(link) => {
            return new Promise(async(resolve,reject) => {
            axios.get(link)
                        .then(({ data }) => {
                            const $$ = cheerio.load(data)
                            const format = {
                                judul : $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > header > h1').text(),
                                views : $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > span > span.count').text(),
                                comment : $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > a > span.count').text(),
                                link : $$('video > source').attr('src')
                            }
                            const result = {
                                creator: author,
                                data : format
                            }
                  resolve(result)
                })
                .catch(reject)
            })
}

exports.SearchGore = async(query) => {
            return new Promise(async(resolve,reject) => {
                axios.get('https://seegore.com/?s=' + query).then(dataa => {
                    const $$$ = cheerio.load(dataa)
                    pagina = $$$('#main > div.container.main-container > div > div.bb-col.col-content > div > div > div > div > nav > ul > li:nth-child(4) > a').text();    
                rand = Math.floor(Math.random() * pagina) + 1
                if(rand === 1){
                    slink = 'https://seegore.com/?s=' + query
                }else{
                    slink = `https://seegore.com/page/${rand}/?s=${query}` 
                }
                axios.get(slink)
                .then(({ data }) => {
                        const $ = cheerio.load(data)
                        const link = [];
                        const judul = [];
                        const uploader = [];
                        const format = [];
                        const thumb = [];
                        $('#post-items > li > article > div.content > header > h2 > a').each(function(a,b){
                            link.push($(b).attr('href'))
                        })
                        $('#post-items > li > article > div.content > header > h2 > a').each(function(c,d){
                            jud = $(d).text();
                            judul.push(jud)
                        })
                        $('#post-items > li > article > div.content > header > div > div.bb-cat-links > a').each(function(e,f){
                            upl = $(f).text();
                            uploader.push(upl)
                        })
                        $('#post-items > li > article > div.post-thumbnail > a > div > img').each(function(g,h){
                            thumb.push($(h).attr('src'))
                        })
                        for( let i = 0; i < link.length; i++){
                            format.push({
                                judul : judul[i],
                                uploader : uploader[i],
                                thumb : thumb[i],
                                link : link[i]
                            })
                        }
                        const result = {
                            creator: author,
                            data : format
                        }
                  resolve(result)
            })
                .catch(reject)
            })
            })
}
exports.RandomGore = async() => {
            return new Promise(async(resolve,reject) => {
                axios.get('https://seegore.com/gore/').then(dataa => {
                    const $$$ = cheerio.load(dataa)
                    pagina = $$$('#main > div.container.main-container.bb-stretched-full > div > div > div > div > div > div > nav > ul > li:nth-child(4) > a').text(); 
                rand = Math.floor(Math.random() * pagina) + 1
                randvid = Math.floor(Math.random() * 16) + 1
                if(rand === 1){
                    slink = 'https://seegore.com/gore/'
                }else{
                    slink = `https://seegore.com/gore/page/${rand}/` 
                }
                axios.get(slink)
                .then(({ data }) => {
                        const $ = cheerio.load(data)
                        const link = [];
                        const result = [];
                        const username = [];
                        const linkp = $(`#post-items > li:nth-child(${randvid}) > article > div.post-thumbnail > a`).attr('href')
                        const thumbb = $(`#post-items > li:nth-child(${randvid}) > article > div.post-thumbnail > a > div > img`).attr('src')
                        axios.get(linkp)
                        .then(({ data }) => {
                            const $$ = cheerio.load(data)
                            const format = {
                                judul : $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > header > h1').text(),
                                views : $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > span > span.count').text(),
                                comment : $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > a > span.count').text(),
                                thumb : thumbb,
                                link : $$('video > source').attr('src')
                            }
                            const result = {
                                creator: author,
                                data : format
                            }
                  resolve(result)
                })
            })
                .catch(reject)
            })
        })
}


exports.ApkMirror = async(query) => {
        return new Promise((resolve,reject) => {
                axios.get('https://www.apkmirror.com/?post_type=app_release&searchtype=apk&s=' + query)
                .then(({ data }) => {
                        const $ = cheerio.load(data)
                        const nama = [];
                        const developer = [];
                        const lupdate = [];
                        const size = [];
                        const down = [];
                        const version = [];
                        const link = [];
                        const format = [];
                        $('#content > div > div > div.appRow > div > div > div > h5 > a').each(function(a,b) {
                          nem = $(b).text();
                          nama.push(nem)
                        })
                        $('#content > div > div > div.appRow > div > div > div > a').each(function(c,d) {
                          dev = $(d).text();
                          developer.push(dev)
                        })
                        $('#content > div > div > div.appRow > div > div > div > div.downloadIconPositioning > a').each(function(e,f) {
                          link.push('https://www.apkmirror.com' + $(f).attr('href'))
                        })
                        $('#content > div > div > div.infoSlide > p > span.infoslide-value').each(function(g,h) {
                          data = $(h).text();
                          if(data.match('MB')){
                          size.push(data)
                          }
                          else if(data.match('UTC')){
                            lupdate.push(data)
                          }
                          else if(!isNaN(data) || data.match(',')){
                            down.push(data)
                          }
                          else{
                            version.push(data)
                          }
                        })
                        for(let i=0; i<link.length; i++){
                          format.push({
                            judul : nama[i],
                            dev : developer[i],
                            size : size[i],
                            version : version[i],
                            uploaded_on : lupdate[i],
                            download_count : down[i],
                            link : link[i]
                          })
                        }
                       const result = {
                        creator : author,
                        data : format
                       }
                  resolve(result)
                })
                .catch(reject)
        })
}

async function sfileSearch(query, page = 1) {
	let res = await fetch(`https://sfile.mobi/search.php?q=${query}&page=${page}`)
	let $ = cheerio.load(await res.text())
	let result = []
	$('div.list').each(function () {
		let title = $(this).find('a').text()
		let size = $(this).text().trim().split('(')[1]
		let icon = $(this).find('img').attr('src')
		let link = $(this).find('a').attr('href')
		if (link) result.push({ title, icon, size: size.replace(')', ''), link })
	})
	return result
}

async function sfileDl(url) {
	let res = await fetch(url)
	let $ = cheerio.load(await res.text())
	let filename = $('div.w3-row-padding').find('img').attr('alt')
	let mimetype = $('div.list').text().split(' - ')[1].split('\n')[0]
	let filesize = $('#download').text().replace(/Download File/g, '').replace(/\(|\)/g, '').trim()
	let download = $('#download').attr('href') + '&k=' + Math.floor(Math.random() * (15 - 10 + 1) + 10)
	return { filename, filesize, mimetype, download }
}

exports.GrupWA = (nama) => {
    return new Promise((resolve, reject) => {
        axios.get('http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search=' + nama + '&searchby=name')
            .then(({
                data
            }) => {
                const $ = cheerio.load(data);
                const result = [];
                const lnk = [];
                const nm = [];
                $('div.wa-chat-title-container').each(function(a, b) {
                    const limk = $(b).find('a').attr('href');
                    lnk.push(limk)
                })
                $('div.wa-chat-title-text').each(function(c, d) {
                    const name = $(d).text();
                    nm.push(name)
                })
                for (let i = 0; i < lnk.length; i++) {
                    result.push({
                        nama: nm[i].split('. ')[1],
                        link: lnk[i].split('?')[0]
                    })
                }
                resolve(result)
            })
            .catch(reject)
    })
}

exports.ArtiNama = (query) => {
    return new Promise((resolve, reject) => {
        queryy = query.replace(/ /g, '+')
        axios.get('https://www.primbon.com/arti_nama.php?nama1=' + query + '&proses=+Submit%21+')
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const result = $('#body').text();
                const result2 = result.split('\n      \n        \n        \n')[0]
                const result4 = result2.split('ARTI NAMA')[1]
                const result5 = result4.split('.\n\n')
                const result6 = result5[0] + '\n\n' + result5[1]
                resolve(result6)
            })
            .catch(reject)
    })
}

exports.wallpaperhd = (chara) => {
    return new Promise((resolve, reject) => {
        axios.get('https://wall.alphacoders.com/search.php?search=' + chara + '&filter=4K+Ultra+HD')
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const result = [];
                $('div.boxgrid > a > picture').each(function(a, b) {
                    result.push($(b).find('img').attr('src').replace('thumbbig-', ''))
                })
                resolve(result)
            })
            .catch(reject)
    })
}


 //
 exports.facebook = (url) => {
    return new Promise(async (resolve, reject) => {
  //return new Promise((resolve, reject)=>{
        const BASE_URL = "https://fdownloader.net"
        //GET TOKEN
        axios({
            url : BASE_URL
        }).then((page)=>{
            let $ = cheerio.load(page.data), code = $("body > div.container-app > script").text()
            let token = new Function(`${code}; return {k_token, k_exp};`)()
            //GET SCRAPPER DATA
            axios({
                method: 'post',
                url : `${BASE_URL}/id/api/ajaxSearch`,
                data : `k_exp=${token.k_exp}&k_token=${token.k_token}&q=${url}`
            }).then((response)=>{
                let $ = cheerio.load(response.data.data), download = []
                $("#fbdownloader > div.tab-wrap > div:nth-child(5) > table > tbody > tr").each(function (i, elem){
                    let trElement = $(elem)
                    let tds = trElement.children()
                    let quality = $(tds[0]).text().trim(), url = $(tds[2]).children("a").attr("href")
                    if(url != undefined){
                        download.push({
                            quality,
                            url
                        })
                    }
                })
                resolve({
                    success:true,
                    video_length: util.convertTime($("div.clearfix > p").text().trim()),
                    download
                })
            }).catch((e)=>{
                reject({
                    success:false,
                    error: "Scraper Error: Revise que el link sea de facebook"
                })
            })
        }).catch((e)=>{
            reject({
                success:false,
                error : "get token error"
            })
        })
    })
    
}
 //
exports.lovetik = async(url) => {
    return new Promise(async (resolve, reject) => {
       try {
          let header = {
             headers: {
                "Accept": "/",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Referer": "https://lovetik.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
             }
          }
          let form = new URLSearchParams
          form.append('query', url)
          let json = await (await axios.post('https://lovetik.com/api/ajax/search', form, header)).data
          if (json.mess) return resolve({
             creator: author,
             status: false
          })
          let urls = json.links.map(v => v.a)
          resolve({
             creator: author,
             status: true,
             author: json.author.replace(/<[^>]*>?/gm, ''),
             caption: json.desc,
             data: {
                video: urls[0],
                videoWM: urls[1],
                audio: urls[2] || false
             }
          })
       } catch (e) {
          console.log(e)
          resolve({
             creator: author,
             status: false
          })
       }
    })
 }

exports.kbbi = async (query) => new Promise((resolve, reject) => {
    const url = 'https://kbbi.web.id/'

    axios.get(url + query).then(res => {
        const $ = cheerio.load(res.data)
        const arti = $('div#d1').text().trim()
        resolve(arti)
    }).catch(reject)
})


//varuable
const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/

//fucntion
function post(url, formdata) {
    console.log(Object.keys(formdata).map(key => `${key}=${encodeURIComponent(formdata[key])}`).join('&'))
    return fetch(url, {
        method: 'POST',
        headers: {
            accept: "*/*",
            'accept-language': "en-US,en;q=0.9",
            'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: Object.keys(formdata).map(key => `${key}=${encodeURIComponent(formdata[key])}`).join('&')
    })
}
//
function bytesToSize(bytes) {
    return new Promise((resolve, reject) => {
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes === 0) return "n/a";
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
      if (i === 0) resolve(`${bytes} ${sizes[i]}`);
      resolve(`${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`);
    });
  }

  function formated(ms) {
    let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
    let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
    return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
  }
  
//--
function ytMp4(url) {
    return new Promise(async (resolve, reject) => {
      ytdl
        .getInfo(url)
        .then(async (getUrl) => {
          let result = [];
          for (let i = 0; i < getUrl.formats.length; i++) {
            let item = getUrl.formats[i];
            if (
              item.container == "mp4" &&
              item.hasVideo == true &&
              item.hasAudio == true
            ) {
              let { qualityLabel, contentLength, approxDurationMs } = item;
              let bytes = await bytesToSize(contentLength);
              result[i] = {
                video: item.url,
                quality: qualityLabel,
                size: bytes,
                duration: formated(parseInt(approxDurationMs)),
              };
            }
          }
          let resultFix = result.filter(
            (x) =>
              x.video != undefined &&
              x.size != undefined &&
              x.quality != undefined
          );
          let tinyUrl = resultFix[0].video;
          let title = getUrl.videoDetails.title;
          let desc = getUrl.videoDetails.description;
          let views = parseInt(getUrl.videoDetails.viewCount || 0);
          let likes = getUrl.videoDetails.likes;
          let dislike = getUrl.videoDetails.dislikes;
          let channel = getUrl.videoDetails.ownerChannelName;
          let uploadDate = getUrl.videoDetails.uploadDate;
          let thumb =
            getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail
              .thumbnails[0].url;
          resolve({
            creator: "FG98",
            title,
            result: tinyUrl,
            quality: resultFix[0].quality,
            size: resultFix[0].size,
            duration: resultFix[0].duration,
            thumb,
            views,
            likes,
            dislike,
            channel,
            uploadDate,
            desc,
          });
        })
        .catch(reject);
    });
  }
  
  function ytMp3(url) {
    return new Promise((resolve, reject) => {
      ytdl
        .getInfo(url)
        .then(async (getUrl) => {
          let result = [];
          for (let i = 0; i < getUrl.formats.length; i++) {
            let item = getUrl.formats[i];
            if (item.mimeType == 'audio/webm; codecs="opus"') {
              let { contentLength, approxDurationMs } = item;
              let bytes = await bytesToSize(contentLength);
              result[i] = {
                audio: item.url,
                size: bytes,
                duration: formated(parseInt(approxDurationMs)),
              };
            }
          }
          let resultFix = result.filter(
            (x) => x.audio != undefined && x.size != undefined
          );
          let tinyUrl = resultFix[0].audio;
          let title = getUrl.videoDetails.title;
          let desc = getUrl.videoDetails.description;
          let views = parseInt(getUrl.videoDetails.viewCount || 0);
          let likes = getUrl.videoDetails.likes;
          let dislike = getUrl.videoDetails.dislikes;
          let channel = getUrl.videoDetails.ownerChannelName;
          let uploadDate = getUrl.videoDetails.uploadDate;
          let thumb =
            getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail
              .thumbnails[0].url;
          resolve({
            creator: "FG98",
            title,
            result: tinyUrl,
            size: resultFix[0].size,
            duration: resultFix[0].duration,
            thumb,
            views,
            likes,
            dislike,
            channel,
            uploadDate,
            desc,
          });
        })
        .catch(reject);
    });
  }
//--- google drive
 async function gdrivedl(url) {
	let id
	if (!(url && url.match(/drive\.google/i))) throw 'Invalid URL'
	id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1]
	if (!id) throw 'ID Not Found'
	let res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
		method: 'post',
		headers: {
			'accept-encoding': 'gzip, deflate, br',
			'content-length': 0,
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'origin': 'https://drive.google.com',
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
			'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
			'x-drive-first-party': 'DriveWebUi',
			'x-json-requested': 'true' 
		}
	})
	let { fileName, sizeBytes, downloadUrl } =  JSON.parse((await res.text()).slice(4))
	if (!downloadUrl) throw 'L??mite de descarga del link'
	let data = await fetch(downloadUrl)
	if (data.status !== 200) throw data.statusText
	return { downloadUrl, fileName, fileSize: formatSize(sizeBytes), mimetype: data.headers.get('content-type') }
}

//
async function igDownloader(Link) {
    const hasil = []
    const Form = {
        url: Link,
        submit: ""
    }
    await axios(`https://downloadgram.org/`, {
        method: "POST",
        data:  new URLSearchParams(Object.entries(Form)),
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9,id;q=0.8",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
            "cookie": "_ga=GA1.2.1695343126.1621491858; _gid=GA1.2.28178724.1621491859; __gads=ID=8f9d3ef930e9a07b-2258e672bec80081:T=1621491859:RT=1621491859:S=ALNI_MbqLxhztDiYZttJFX2SkvYei6uGOw; __atuvc=3%7C20; __atuvs=60a6eb107a17dd75000; __atssc=google%3B2; _gat_gtag_UA_142480840_1=1"
        },
        referrerPolicy: "strict-origin-when-cross-origin",
    }).then(async res => {
        const $ = cheerio.load(res.data)
        let url = $('#downloadBox').find('a').attr('href');
        await axios(Link, {
            method: "GET",
            data: null,
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "en-US,en;q=0.9,id;q=0.8",
                "cache-control": "max-age=0",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
                "cookie": "ig_did=08A3C465-7D43-4D8A-806A-88F98384E63B; ig_nrcb=1; mid=X_ipMwALAAFgQ7AftbrkhIDIdXJ8; fbm_124024574287414=base_domain=.instagram.com; shbid=17905; ds_user_id=14221286336; csrftoken=fXHAj5U3mcJihQEyVXfyCzcg46lHx7QD; sessionid=14221286336%3A5n4czHpQ0GRzlq%3A28; shbts=1621491639.7673564; rur=FTW"
            },
            referrerPolicy: "strict-origin-when-cross-origin"
        }).then(respon => {
            const ch = cheerio.load(respon.data)
            let title = ch('title').text().trim()
            const result = {
                author: author,
                result: {
                    link: url,
                    desc: title,
                    Link: Link
                }
            }
            hasil.push(result)
        })
    })
    return hasil[0]
}

const igstory = (username) => {
    return new Promise(async(resolve, reject) => {
        axios.request({
            url: 'https://www.instagramsave.com/instagram-story-downloader.php',
            method: 'GET',
            headers:{
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
            }
        })
        .then(({ data }) => {
            const $ = cheerio.load(data)
            const token = $('#token').attr('value')
            let config ={
                headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
                    "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                },
                data: new URLSearchParams({
                    'url':'https://www.instagram.com/'+ username,
                    'action': 'story',
                    'token': token
                })
            }
        axios.post('https://www.instagramsave.com/system/action.php',qs.stringify(config.data), { headers: config.headers })
        .then(({ data }) => {
        resolve(data)
           })
        })
    .catch(reject)
    })
}

async function webp2mp4(source) {
  let form = new FormData
  let isUrl = typeof source === 'string' && /https?:\/\//.test(source)
  form.append('new-image-url', isUrl ? source : '')
  form.append('new-image', isUrl ? '' : source, 'image.webp')
  let res = await fetch('https://ezgif.com/webp-to-mp4', {
    method: 'POST',
    body: form
  })
  let html = await res.text()
  let { document } = new JSDOM(html).window
  let form2 = new FormData
  let obj = {}
  for (let input of document.querySelectorAll('form input[name]')) {
    obj[input.name] = input.value
    form2.append(input.name, input.value)
  }
  let res2 = await fetch('https://ezgif.com/webp-to-mp4/' + obj.file, {
    method: 'POST',
    body: form2
  })
  let html2 = await res2.text()
  let { document: document2 } = new JSDOM(html2).window
  return new URL(document2.querySelector('div#output > p.outfile > video > source').src, res2.url).toString()
}

async function webp2png(source) {
  let form = new FormData
  let isUrl = typeof source === 'string' && /https?:\/\//.test(source)
  form.append('new-image-url', isUrl ? source : '')
  form.append('new-image', isUrl ? '' : source, 'image.webp')
  let res = await fetch('https://ezgif.com/webp-to-png', {
    method: 'POST',
    body: form
  })
  let html = await res.text()
  let { document } = new JSDOM(html).window
  let form2 = new FormData
  let obj = {}
  for (let input of document.querySelectorAll('form input[name]')) {
    obj[input.name] = input.value
    form2.append(input.name, input.value)
  }
  let res2 = await fetch('https://ezgif.com/webp-to-png/' + obj.file, {
    method: 'POST',
    body: form2
  })
  let html2 = await res2.text()
  let { document: document2 } = new JSDOM(html2).window
  return new URL(document2.querySelector('div#output > p.outfile > img').src, res2.url).toString()
}

/// XVIDEOS 
async function xvideosSearch(url) {
    return new Promise(async (resolve) => {
     await axios.request(`https://www.xvideos.com/?k=${url}&p=${Math.floor(Math.random() * 9) +1}`, {method: "get"}).then(async result => {
    let $ = cheerio.load(result.data, {xmlMod3: false});
    let title = [];
    let duration = [];
    let quality = [];
    let url = [];
    let thumb = [];
    let hasil = [];
  
    $("div.mozaique > div > div.thumb-under > p.title").each(function(a,b){
      title.push($(this).find("a").attr("title"));
      duration.push($(this).find("span.duration").text());
      url.push("https://www.xvideos.com"+$(this).find("a").attr("href"));
    });
    $("div.mozaique > div > div.thumb-under").each(function(a,b){
      quality.push($(this).find("span.video-hd-mark").text());
    });
    $("div.mozaique > div > div > div.thumb > a").each(function(a,b){
      thumb.push($(this).find("img").attr("data-src"));
    });
    for(let i=0; i < title.length; i++){
      hasil.push({
        title: title[i],
        duration: duration[i],
        quality: quality[i],
        thumb: thumb[i],
        url: url[i]
      });
    }
    resolve(hasil);
  });
  });
  };
  

   async function xvideosdl(url) {
    return new Promise((resolve, reject) => {
		fetch(`${url}`, {method: 'get'})
		.then(res => res.text())
		.then(res => {
			let $ = cheerio.load(res, {
				xmlMode: false
			});

    //let $ = cheerio.load(result.data, {xmlMod3: false});

     const title = $("meta[property='og:title']").attr("content")
     const keyword = $("meta[name='keywords']").attr("content")
     const views = $("div#video-tabs > div > div > div > div > strong.mobile-hide").text()+" views"
     const vote = $("div.rate-infos > span.rating-total-txt").text()
     const likes = $("span.rating-good-nbr").text()
     const deslikes = $("span.rating-bad-nbr").text()
     const thumb = $("meta[property='og:image']").attr("content")
     const url = $("#html5video > #html5video_base > div > a").attr("href")
    
    resolve({
        status: 200,
        result: {
            title,
            url,
            keyword,
            views,
            vote,
            likes,
            deslikes,
            thumb
        }
    })
})
})
};


///XNXNN
async function xnxxdl(URL) {
	return new Promise((resolve, reject) => {
		fetch(`${URL}`, {method: 'get'})
		.then(res => res.text())
		.then(res => {
			let $ = cheerio.load(res, {
				xmlMode: false
			});
			const title = $('meta[property="og:title"]').attr('content');
			//const duration = $('meta[property="og:duration"]').attr('content');
            const duration = $("span.metadata").text().replace(/\n/gi, "").split("\t\t\t\t\t")[1].split(/-/)[0];
            const quality = $("span.metadata").text().trim().split("- ")[1].replace(/\t\t\t\t\t/,"");
			const image = $('meta[property="og:image"]').attr('content');
			const videoType = $('meta[property="og:video:type"]').attr('content');
			const videoWidth = $('meta[property="og:video:width"]').attr('content');
			const videoHeight = $('meta[property="og:video:height"]').attr('content');
			const info = $('span.metadata').text();
			const videoScript = $('#video-player-bg > script:nth-child(6)').html();
            
			const files = {
				low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
				high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
				HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
				thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
				thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
				thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
				thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1],
			};
			resolve({
				status: 200,
				result: {
					title,
					URL,
					duration,
                    quality,
					image,
					videoType,
					videoWidth,
					videoHeight,
					info,
					files
				}
			})
		})
		.catch(err => reject({code: 503, status: false, result: err }))
	})
}

async function xnxxSearch(query) {
	return new Promise((resolve, reject) => {
		const baseurl = 'https://www.xnxx.com'
		fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, {method: 'get'})
		.then(res => res.text())
		.then(res => {
			let $ = cheerio.load(res, {
				xmlMode: false
			});
			let title = [];
			let url = [];
			let desc = [];
			let views = [];
			let thumb = [];
			let rate = [];
			let duration = [];
			let results = [];

			$('div.mozaique').each(function(a, b) {
				$(b).find('div.thumb').each(function(c, d) {
					url.push(baseurl+$(d).find('a').attr('href').replace("/THUMBNUM/", "/"))
				})
			})
			$('div.mozaique').each(function(a, b) {
				$(b).find('div.thumb-under').each(function(c, d) {
					desc.push($(d).find('p.metadata').text())
					$(d).find('a').each(function(e,f) {
					    title.push($(f).attr('title'))
					})
				})
			})
			for (let i = 0; i < title.length; i++) {
				results.push({
					title: title[i],
					views: views[i],
					quality: rate[i],
					duration: duration[i],
					thumb: thumb[i],
					link: url[i]
				})
			}
			resolve({
				code: 200,
				status: true,
				result: results
			})
		})
		.catch(err => reject({code: 503, status: false, result: err }))
	})
}

async function ttp(text, tcolor = "30F4EF") {
    return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `https://www.picturetopeople.org/p2p/text_effects_generator.p2p/transparent_text_effect`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "Cookie": "_ga=GA1.2.1667267761.1655982457; _gid=GA1.2.77586860.1655982457; __gads=ID=c5a896288a559a38-224105aab0d30085:T=1655982456:RT=1655982456:S=ALNI_MbtHcmgQmVUZI-a2agP40JXqeRnyQ; __gpi=UID=000006149da5cba6:T=1655982456:RT=1655982456:S=ALNI_MY1RmQtva14GH-aAPr7-7vWpxWtmg; _gat_gtag_UA_6584688_1=1"
                },
                formData: {
                    'TextToRender': text,
                    'FontSize': '100',
                    'Margin': '30',
                    'LayoutStyle': '0',
                    'TextRotation': '0',
                    'TextColor': `${tcolor}`,
                    'TextTransparency': '0',
                    'OutlineThickness': '3',
                    'OutlineColor': '000000',
                    'FontName': 'Lekton',
                    'ResultType': 'view'
                }
            };
            request(options, async function(error, response, body) {
                if (error) throw new Error(error)
                const $ = cheerio.load(body)
                const result = 'https://www.picturetopeople.org' + $('#idResultFile').attr('value')
                resolve({ status: 200, result: result })
            });
        })
}

module.exports.webp2mp4 = webp2mp4
module.exports.webp2png = webp2png
module.exports.igstory = igstory
module.exports.igDownloader = igDownloader
module.exports.Shoope = Shoope
module.exports.Gempa = Gempa
module.exports.GSMArena = GSMArena
module.exports.Emoji = Emoji
module.exports.Wikipedia = Wikipedia
module.exports.RandomCerpen = RandomCerpen
module.exports.Covid = covid
module.exports.Downloader = downloader
module.exports.Anime = anime
module.exports.Manga = manga
module.exports.Character = character
module.exports.JadwalBola = jadwalbola
module.exports.JadwalTv = jadwaltv
module.exports.JadwalSholat = jadwalsholat
module.exports.Pinterest = pinterest
module.exports.Film = film
module.exports.Wattpad = wattpad
module.exports.WattpadUser = wattpaduser
module.exports.Webtoons = webtoons
module.exports.Mangatoons = mangatoons
module.exports.Drakor = drakor
module.exports.StickerSearch = stickersearch
module.exports.ListSurah = listsurah
module.exports.Surah = surah
module.exports.TafsirSurah = tafsirsurah
module.exports.KompasNews = kompasnews 
module.exports.ytMp4 = ytMp4    
module.exports.ytMp3 = ytMp3  
module.exports.Gdrive = gdrivedl
module.exports.igStalk = igStalk
module.exports.tiktokStalk = tiktokStalk
module.exports.twitter = twitter //
module.exports.xvideosSe = xvideosSearch
module.exports.xnxxSe = xnxxSearch
module.exports.xvideosdl = xvideosdl
module.exports.xnxxdl = xnxxdl
module.exports.sfileSe = sfileSearch
module.exports.sfileDl = sfileDl
module.exports.ttp = ttp