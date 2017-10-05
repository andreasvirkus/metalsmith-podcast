var assert = require('assert');
var equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var podcast = require('..');

describe('metalsmith-podcast', function(){
  it('should only process html by default', function(done){
    Metalsmith('test/fixtures/html')
      .use(podcast({
        title: 'Test podcast',
        site_url: 'http://www.website.com/',
        feed_url: '/podcast.xml',
        author: 'Bruce Banner',
      }))
      .build(function(err){
        if (err) {
          return done(err);
        }
        equal('test/fixtures/html/expected', 'test/fixtures/html/build');
        done();
      });
  });

  it('should accept defaults for title and feed url', function(done){
    Metalsmith('test/fixtures/defaults')
      .use(podcast({
        title: 'Test podcast',
        site_url: 'http://www.website.com/',
        feed_url: '/podcast.xml',
        author: 'Bruce Banner',
      }))
      .build(function(err){
        if (err) {
          return done(err);
        }
        equal('test/fixtures/defaults/expected', 'test/fixtures/defaults/build');
        done();
      });
  });

  // it('should allow settings to be overridden from the frontmatter', function(done){
  //   Metalsmith('test/fixtures/frontmatter')
  //     .use(sitemap({
  //       title: 'Test podcast',
  //       site_url: 'http://www.website.com',
  //       feed_url: '/podcast.xml',
  //       pubDate: new Date()
  //     }))
  //     .build(function(err){
  //       if (err) {
  //         return done(err);
  //       }
  //       equal('test/fixtures/frontmatter/expected', 'test/fixtures/frontmatter/build');
  //       done();
  //     });
  // });

  // it('should allow the feed\'s location to be changed', function(done){
  //   Metalsmith('test/fixtures/output')
  //     .use(sitemap({
  //       title: 'Test podcast',
  //       feed_url: 'castpod.xml'
  //     }))
  //     .build(function(err){
  //       if (err) {
  //         return done(err);
  //       }
  //       equal('test/fixtures/output/expected', 'test/fixtures/output/build');
  //       done();
  //     });
  // });

  // it('should accept a pattern', function(done){
  //   Metalsmith('test/fixtures/pattern')
  //     .use(sitemap({
  //       title: 'Test podcast',
  //       pattern: ['**/*.html', '**/*.hbs']
  //     }))
  //     .build(function(err){
  //       if (err) {
  //         return done(err);
  //       }
  //       equal('test/fixtures/pattern/expected', 'test/fixtures/pattern/build');
  //       done();
  //     });
  // });

  // it('should allow a canonical url to be set', function(done){
  //   Metalsmith('test/fixtures/canonical')
  //     .use(sitemap('http://www.website.com/'))
  //     .build(function(err){
  //       if (err) {
  //         return done(err);
  //       }
  //       equal('test/fixtures/canonical/expected', 'test/fixtures/canonical/build');
  //       done();
  //     });
  // });

  // it('should allow publishing date to be set', function(done){
  //   Metalsmith('test/fixtures/lastmod')
  //     .use(sitemap({
  //       title: 'Test podcast',
  //       pubDate: new Date('1995-12-17T12:24:00')
  //     }))
  //     .build(function(err){
  //       if (err) {
  //         return done(err);
  //       }
  //       equal('test/fixtures/lastmod/expected', 'test/fixtures/lastmod/build');
  //       done();
  //     });
  // });

  // it('should allow a canonical url, lastmod and priority to be set from custom property', function(done){
  //   Metalsmith('test/fixtures/custom-frontmatter')
  //     .use(sitemap({
  //       hostname: 'http://www.website.com',
  //       modifiedProperty: 'lastModified',
  //       urlProperty: 'seo.canonical',
  //       priorityProperty: 'order'
  //     }))
  //     .build(function(err){
  //       if (err) {
  //         return done(err);
  //       }
  //       equal('test/fixtures/custom-frontmatter/expected', 'test/fixtures/custom-frontmatter/build');
  //       done();
  //     });
  // });

  it('should ignore files marked as private', function(done){
    Metalsmith('test/fixtures/private')
      .use(podcast({
        title: 'Test podcast',
        site_url: 'http://www.website.com/',
        feed_url: '/podcast.xml',
        author: 'Bruce Banner',
      }))
      .build(function(err){
        if (err) {
          return done(err);
        }
        equal('test/fixtures/private/expected', 'test/fixtures/private/build');
        done();
      });
  });

  // it('should mirror options for iTunes options', function(done){
  //   Metalsmith('test/fixtures/links')
  //     .use(sitemap({
  //       title: 'Test podcast',
  //       links: 'links',
  //       author: 'Peter Parker',
  //       description: 'Spider pig and his funky adventures.',
  //       categories: ['spiders', 'webs', 'not web like internet'],
  //       image_url: '/spidey.jpeg'
  //     }))
  //     .build(function(err){
  //       if (err) {
  //         return done(err);
  //       }
  //       equal('test/fixtures/itunes/expected', 'test/fixtures/itunes/build');
  //       done();
  //     });
  // });

  // it('should replace win32 backslash by slash', function(done){
  //   Metalsmith('test/fixtures/win32-backslash')
  //     .use(sitemap('http://www.website.com/'))
  //     .build(function(err){
  //       if (err) {
  //         return done(err);
  //       }
  //       equal('test/fixtures/win32-backslash/expected', 'test/fixtures/win32-backslash/build');
  //       done();
  //     });
  // });
});
