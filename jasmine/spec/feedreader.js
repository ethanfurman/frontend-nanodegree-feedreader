/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have non-empty urls', function() {
            $.each(allFeeds, function(index, feed) {
                expect(feed.url).toBeDefined();
                expect(typeof feed.url).toBe('string');
                expect(feed.url).not.toBe('');
            });
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have non-empty names', function() {
            $.each(allFeeds, function(index, feed) {
                expect(feed.name).toBeDefined();
                expect(typeof feed.name).toBe('string');
                expect(feed.name).not.toBe('');
            });
        });
    });


    /* Test suite for "The menu" */
    describe('The menu', function() {
        
        var body = $('body'),
            menu = $('.menu-icon-link');

        /* Test that ensures the menu element is hidden by default.
         */
        it('is hidden at start', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked, both in becoming
          * visible and then hiding when clicked.
          */
        it('(un)hides when clicked', function() {
            menu.trigger('click');
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            menu.trigger('click');
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

    });

    /* Test suite for "Initial Entries" */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            // wait while we load the initial feed (again)
            loadFeed(2, done);
        });

        /* Test that ensures when the loadFeed function is called and
         * completes its work, there is at least a single .entry element
         * within the .feed container.
         */
        it('has at least one entry', function() {
            expect($('.entry').length).toBeGreaterThan(0);
        });
    });

    /* Test suite for "New Feed Selection" */
    describe('New Feed Selection', function() {

        var firstFeed;

        beforeEach(function(done) {
            loadFeed(1, function() {
                firstFeed = $('.entry');
                done();
            });
        });

        /* Test that ensures when a new feed is loaded by the loadFeed
         * function that the content actually changes.
         */
        it('loads new feeds', function(done) {
            loadFeed(2, function() {
                var secondFeed = $('.entry');
                expect(firstFeed[0].innerHTML).not.toEqual(secondFeed[0].innerHTML);
                done();
            });
        });
    });
}());
