fs = require 'fs'
path = require 'path'
{renderable, link, script, style} = require 'teacup'

cdnUrl = process.env['CDN_URL'] || ''

publicDir = "#{__dirname}/../public"
inlineScript = fs.readFileSync "#{publicDir}/js/iouo.min.js"
inlineStyle = fs.readFileSync "#{publicDir}/css/iouo.min.css"
versions = {}

versioned = (file) ->
  versions[file] or versions[file] = findVersioned file

findVersioned = (file) ->
  candidates = fs.readdirSync("#{publicDir}/#{path.dirname file}").filter (filename) ->
    new RegExp(".#{path.basename file}".split('.').join('\\.')).test filename
  versionedFile = candidates[0] or file
  "#{cdnUrl}/#{path.dirname file}/#{versionedFile}"

exports.scripts = renderable ->
  script src: versioned('js/vendor.min.js'), ''
  script inlineScript

exports.styles = renderable ->
  link rel: 'stylesheet', href: versioned('css/vendor.min.css')
  style inlineStyle

exports.favicons = renderable ->
  link rel: 'apple-touch-icon-precomposed', href: "#{cdnUrl}/apple-touch-icon-precomposed.png"
  link rel: 'shortcut icon', href: "#{cdnUrl}/apple-touch-icon.png"
