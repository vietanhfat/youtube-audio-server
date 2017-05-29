#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const yas = require('./index')
const args = require('minimist')(process.argv.slice(2))
const port = process.env.PORT || 80

// print ascii art
var artFile = path.join(__dirname, './ascii-art.txt')
var art = fs.readFileSync(artFile, 'utf8')
console.log(art)

function download ({video, file, h, help}) {
  // Display usage.
  if (help || h) {
    console.info(yas.downloader.help())
    process.exit()
  }

  // Nothing to download.
  if (!file && !video) return false

  // Validations.
  console.log('-'.repeat(80))
  if (!video) {
    console.error('Missing param: --video [youtube-video-id]')
    process.exit()
  }

  file = file || './youtube-audio.mp3'
  console.log(`DOWNLOAD: ${video} --> ${file}`)
  yas.downloader
    .onSuccess(() => process.exit())
    .onError((error) => {
      console.error(error)
      process.exit()
    })
    .download(args)

  return true
}

function run () {
  // Run downloader.
  // If file download was specified using arguments:
  // yas --video [youtube-video-id] [--file [./sample.mp3]]
  // Will download the file and exit.
  if (download(args)) return

  // Start youtube-audio-server.
  yas.listen(port, () => {
    console.log(` 🔈  YOUTUBE AUDIO SERVER listening on http://localhost:${port}!`)
    console.log('-'.repeat(80))
  })
}

run()