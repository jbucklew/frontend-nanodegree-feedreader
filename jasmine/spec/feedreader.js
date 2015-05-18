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
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            // Make sure the allFields variable exists.
            expect(allFeeds).toBeDefined();
            // Make sure at there is at least 1 feed defined.
            expect(allFeeds.length).toBeGreaterThan(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have urls that are not empty', function() {
            // Loop through all the defined feeds within the allFeeds array
            // and make sure url is defined and contains a value.
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toBeTruthy();
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names that are not empty', function() {
            // Loop through all the defined feeds within the allFeeds array
            // and make sure the name is defined and contains a value.
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).toBeTruthy();
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            // The menu is hidden when the body element has the class
            // menu-hidden. It should have this class on initial load.
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibilty on click', function() {
            // When the .menu-icon-link element is clicked for the first time,
            // the menu-hidden class is removed from the body element. When it
            // is clicked again, the class menu-hidden is added back to the body
            // element. Simulate this using jQuery and test for the menu-hidden
            // class within the body element.

            // First click
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // Second click
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        // Before each test is run, we need to run the loadFeed function
        // since it is an asynchronous call.
        beforeEach(function(done) {
            loadFeed(0,function() {
                done();
            });
        });

        it('has at least 1 entry', function(done) {
            // When our asynchronous loadFeed function call completes,
            // make sure there is at least 1 entry. Using jQuery to
            // get an array of all entries.
            expect($('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        // Defined so we can retrieve the html of the initially loaded feed
        var self = this;
        var orig_feed_html;

        beforeEach(function(done) {
            // Run loadFeed to get orig_feed_html for comparison to ensure
            // feed content has changed.
            loadFeed(0,function() {
                self.orig_feed_html = $('.feed').html();
                // Call loadFeed again with a different feed. The resulting
                // html will be compared with orig_feed_html
                loadFeed(2, function() {
                    done();
                });
            });
        });

        it('content has changed', function(done) {
            var current_feed_html = $('.feed').html();
            // Make sure the current_feed_html is different than orig_feed_html
            expect(current_feed_html).not.toMatch(self.orig_feed_html);
            done();
        });
    });
}());
