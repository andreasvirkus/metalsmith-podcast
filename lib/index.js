/**
 * Dependencies
 */

// Include debug to help with debugging.
const debug = require('debug')('metalsmith-name-of-my-plugin');
const Podcast = require('podcast');
const get = require('lodash.get');
const match = require('multimatch');

/**
 * Export plugin
 */
module.exports = podcastPlugin;

/**
 * Metalsmith plugin for generating a sitemap.
 *
 * @param {Object} opts
 *   @property {String} title
 *   @property {String} description (optional)
 *   @property {String} feed_url
 *   @property {String} site_url
 *   @property {String} image_url (optional)
 *   @property {String} docs (optional)
 *   @property {String} author
 *   @property {String} managingEditor (optional)
 *   @property {String} webMaster (optional)
 *   @property {String} copyright (optional)
 *   @property {String} language (optional)
 *   @property {Array} categories (optional)
 *   @property {Date} pubdate (optional)
 *   @property {String} ttl (optional)
 *   @property {String} itunesAuthor (optional)
 *   @property {String} itunesSubtitle (optional)
 *   @property {String} itunesSummary (optional)
 *   @property {Boolean} itunesExplicit (optional)
 *   @property {String} itunesOwner (optional)
 *   @property {String} itunesCategory (optional)
 *   @property {String} itunesImage (optional)
 * @return {Function}
 */
const podcastPlugin = opts => {
  /**
   * Init
   */
  opts = opts || {};

  // Map options to local variables and set defaults
  const pattern = opts.pattern || '**/*.html';
  const privateProperty = opts.privateProperty || 'private';

  return (files, metalsmith, done) => {

    // Metalsmith metadata usage:
    const metadata = metalsmith.metadata();
    const feed = new Podcast({
      title: opts.title || 'Podcast title', // string Title of your site or feed
      description: opts.description || 'A podcast about interesting topics.', // optional string A short description of the feed.
      feed_url: opts.feedUrl || '/podcast.xml', //  url string Url to the rss feed.
      site_url: opts.siteUrl || '', //  url string Url to the site that the feed is for.
      image_url: opts.imageUrl || '', //  optional * url string Small image for feed readers to use.
      docs: opts.docs || '', //  optional url string Url to documentation on this feed.
      author: opts.author || '', //  string Who owns this feed.
      managingEditor: opts.managingEditor || '', //  optional string Who manages content in this feed.
      webMaster: opts.webMaster || '', //  optional string Who manages feed availability and technical support.
      copyright: opts.copyright || '', //  optional string Copyright information for this feed.
      language: opts.language || 'EN-US', //  optional string The language of the content of this feed.
      categories: opts.categories || ['podcast'], //  optional array of strings One or more categories this feed belongs to.
      pubDate: opts.pubDate || Date.now(), //  optional Date object or date string The publication date for content in the feed
      ttl: opts.ttl || 60, //  optional integer Number of minutes feed can be cached before refreshing from source.
      itunesAuthor: author, //  optional string (iTunes specific) author of the podcast
      itunesSubtitle: title, //?  optional string (iTunes specific) subtitle for iTunes listing
      itunesSummary: description, //  optional string (iTunes specific) summary for iTunes listing
      itunesExplicit: opts.itunesExplicit || false, //  optional boolean (iTunes specific) specifies if the podcast contains explicit content
      itunesOwner: author, //  optional object (iTunes specific) owner of the podcast ({ name: String, email: String })
      itunesCategory: categories, //  optional array of objects (iTunes specific) Categories for iTunes ([{ text: String, subcats: [{ text: String, subcats: Array }] }])
      itunesImage: imageUrl, //  optional string (iTunes specific) link to an image for the podcast
    });

    Object.keys(files).forEach(file => {
      // Get the current file's frontmatter
      const frontmatter = files[file];

      // Only process files that pass the check
      if (!check(file, frontmatter)) {
        return;
      }

      // Create the podcast feed entry (reject keys with falsy values)
      feed.item({
        title: 'Episode title',
        description: 'Episode content. It can include html.',
        url: 'http://example.com/episode4?this&that', // link to the episode
        guid: '1123', // optional - defaults to url
        categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4'], // optional - array of item categories
        author: 'Guest Author', // optional - defaults to feed author property
        date: 'May 27, 2012', // any format that js Date can parse.
        lat: 33.417974, //optional latitude field for GeoRSS
        long: -111.933231, //optional longitude field for GeoRSS
        enclosure: { url: '...', file: 'path-to-file' }, // optional enclosure
        itunesAuthor: 'Max Nowack',
        itunesExplicit: false,
        itunesSubtitle: 'I am a sub title',
        itunesSummary: 'I am a summary',
        itunesDuration: 12345,
        itunesKeywords: ['javascript', 'podcast']
      });
    });

    // Create sitemap in files
    files[output] = {
      contents: new Buffer(feed.xml('\t').toString())
    };

    done();
  };
}


// Checks whether files should be processed
function check(file, frontmatter) {
  // Only process files that match the pattern
  if (!match(file, pattern)[0]) {
    return false;
  }

  // Don't process private files
  if (get(frontmatter, privateProperty)) {
    return false;
  }

  return true;
}
