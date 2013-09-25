_ = require 'lodash'
fs = require 'fs'
memoRead = _.memoize fs.readFileSync
{link, script, style} = require 'teacup'

cdnUrl = process.env['CDN_URL'] || ''
gaPropertyId = process.env['GA_PROPERTY_ID'] || 'UA-43468793-2'

assetsDir = "#{__dirname}/../assets"
publicDir = "#{__dirname}/../public"

versioned = _.memoize (file, ext) ->
  file = "#{file}.#{ext}" if ext
  candidates = fs.readdirSync(publicDir).filter (filename) ->
    ~filename.indexOf ".#{file}"
  "#{cdnUrl}/#{candidates[0]}"

exports.headjs = ({cdnjs, externaljs, inlinejs}) ->
  cdnUrls =
    head: '//cdnjs.cloudflare.com/ajax/libs/headjs/0.99/head.load.min.js'
    jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js'
  scripts = []
  if cdnjs
    scripts.push cdnUrls[f] for f in cdnjs
  if externaljs
    scripts.push "#{versioned(f, 'min.js')}" for f in externaljs
  if scripts.length
    script src: cdnUrls.head, ''
    script "head.js(#{scripts.map JSON.stringify})"
  if inlinejs
    script memoRead "#{assetsDir}/js/#{f}.min.js" for f in inlinejs

exports.gajs = ->
  script """
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', '#{gaPropertyId}', 'iouo.me');
    ga('send', 'pageview');
  """

exports.styles = ->
  link rel: 'stylesheet', href: versioned('vendor.min.css')
  style memoRead "#{assetsDir}/css/iouo.min.css"

exports.favicons = ->
  link rel: 'apple-touch-icon-precomposed', href: "#{cdnUrl}/apple-touch-icon-precomposed.png"
  link rel: 'shortcut icon', href: "#{cdnUrl}/apple-touch-icon.png"
