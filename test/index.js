var assert = require('assert');
var equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var podcast = require('..');

describe('metalsmith-podcast', function(){
  it('should only process html by default', function(done){
    Metalsmith('test/fixtures/html')
      .use(podcast({
        title: 'Test podcast',
        siteUrl: 'http://www.website.com/',
        feedUrl: 'http://www.website.com/podcast.xml',
        author: 'Bruce Banner',
        pubDate: new Date('1995-12-17T12:24:00')
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
        siteUrl: 'http://www.website.com/',
        feedUrl: '/podcast.xml',
        author: 'Bruce Banner',
        pubDate: new Date('2015-12-17T12:24:00')
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
  //       siteUrl: 'http://www.website.com',
  //       feedUrl: '/podcast.xml',
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
  //       feedUrl: 'castpod.xml'
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


  it('should ignore files marked as private', function(done){
    Metalsmith('test/fixtures/private')
      .use(podcast({
        title: 'Test podcast',
        siteUrl: 'http://www.website.com/',
        feedUrl: '/podcast.xml',
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
  //       imageUrl: '/spidey.jpeg'
  //     }))
  //     .build(function(err){
  //       if (err) {
  //         return done(err);
  //       }
  //       equal('test/fixtures/itunes/expected', 'test/fixtures/itunes/build');
  //       done();
  //     });
  // });
});
