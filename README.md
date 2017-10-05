# metalsmith-podcast
[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]

> A metalsmith plugin for generating a podcast feed

This plugin allows you to generate a [podcast feed](https://resourcecenter.odee.osu.edu/digital-media-production/how-write-podcast-rss-xml) from your source files. By default it looks for any `.html` files and processes them with [node-podcast](https://github.com/maxnowack/node-podcast).

## Installation

```bash
$ npm install metalsmith-podcast
```

## Example

Configuration in `metalsmith.json`:

```json
{
  "plugins": {
    "metalsmith-podcast": {
      "title": "My podcast",
      "description": "A short overview of the podcast series.",
      "feed_url": ""
    }
  }
}
```

## Options

You can pass options to `metalsmith-podcast` with the [Javascript API](https://github.com/segmentio/metalsmith#api) or [CLI](https://github.com/segmentio/metalsmith#cli). The options are the same as described under [node-podcast](https://github.com/maxnowack/node-podcast#feedoptions):

 * `title` **string** Title of your site or feed
 * `description` _optional_ **string** A short description of the feed.
 * `generator` _optional_  **string** Feed generator.
 * `feed_url` **url string** Url to the rss feed.
 * `site_url` **url string** Url to the site that the feed is for.
 * `image_url` _optional_  **url string* Small image for feed readers to use.
 * `docs` _optional_ **url string** Url to documentation on this feed.
 * `author` **string** Who owns this feed.
 * `managingEditor` _optional_ **string** Who manages content in this feed.
 * `webMaster` _optional_ **string** Who manages feed availability and technical support.
 * `copyright` _optional_ **string** Copyright information for this feed.
 * `language` _optional_ **string**  The language of the content of this feed.
 * `categories` _optional_ **array of strings**  One or more categories this feed belongs to.
 * `pubDate` _optional_ **Date object or date string** The publication date for content in the feed
 * `ttl` _optional_ **integer** Number of minutes feed can be cached before refreshing from source.
 * `itunesAuthor` _optional_  **string** (iTunes specific) author of the podcast
 * `itunesSubtitle` _optional_  **string** (iTunes specific) subtitle for iTunes listing
 * `itunesSummary` _optional_  **string** (iTunes specific) summary for iTunes listing
 * `itunesOwner` _optional_ **object** (iTunes specific) owner of the podcast ( {name:String, email:String} )
 * `itunesExplicit` _optional_ **boolean** (iTunes specific) specifies if the podcast contains explicit content
 * `itunesCategory` _optional_ **array of objects** (iTunes specific) Categories for iTunes ( [{text:String, subcats:[{text:String, subcats:Array}]}] )
 * `itunesImage` _optional_ **string** (iTunes specific) link to an image for the podcast

## Frontmatter

Some values can also be set on a file-to-file basis from a file's frontmatter, the options are:

* `title` **string** Title of this particular item.
* `description` **string** Content for the item.  Can contain html but link and image urls must be absolute path including hostname.
* `url` **url string** Url to the item. This could be a blog entry.
* `guid` **unique string** A unique string feed readers use to know if an item is new or has already been seen.
If you use a guid never change it.  If you don't provide a guid then your item urls must
be unique.
* `categories` _optional_ **array of strings** If provided, each array item will be added as a category element
* `author` _optional_  **string**  If included it is the name of the item's creator.
If not provided the item author will be the same as the feed author.  This is typical
except on multi-author blogs.
* `date` **Date object or date string** The date and time of when the item was created.  Feed
readers use this to determine the sort order. Some readers will also use it to determine
if the content should be presented as unread.
* `lat` _optional_ **number** The latitude coordinate of the item.
* `long` _optional_ **number** The longitude coordinate of the item.
* `enclosure` _optional_ **object** Attach a multimedia file to this item.
* `url` **string** Url to the related file.
* `file` _optional_ **string** Path to the related file on the filesystem. Used to fill out size and mime
information.
* `size` _optional_ **number** Number of bytes in the file. The length field will defualt to 0 if the
`size` or `file` fields have not been set.
* `mime` _optional_ **string** Mime type of the file. Will be guessed from the url if this parameter is
not set.
* `explicit` _optional_ **boolean** (iTunes specific) specifies if the podcast contains explicit content
* `subtitle` _optional_  **string** (iTunes specific) subtitle for iTunes listing
* `duration` _optional_ **number** (iTunes specific) duration of the podcast item in seconds

For example:

```html
---
private: true
title: 'Episode title'
description: 'Episode content. It can include html.'
url: 'http://example.com/episode4?this&that'
categories: ['javascript', 'podcast']
author: 'Bruce Banner'
date: 'May 9, 2017'
explicit: false
duration: 12345
---
<!-- index.html -->
```

## Roadmap

- Let `node-podcast` handle default options instead of passing all options to it with default values (loop through `opts` object and set only those that exist)
- Test coverage
- Docs site

## License

MIT


[npm-badge]: https://img.shields.io/npm/v/metalsmith-podcast.svg
[npm-url]: https://www.npmjs.com/package/metalsmith-podcast

[travis-badge]: https://travis-ci.org/ExtraHop/metalsmith-sitemap.svg?branch=master
[travis-url]: https://travis-ci.org/ExtraHop/metalsmith-sitemap