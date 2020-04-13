$(function () {
    checkboxes.click(function () {
        createQueryHash(filters);
    });
        /* getdata about settings from settings.json */
    $.getJSON("settings.json", function( data ) {
        /*callfunction that will turn the data into HTML.*/
        generateAllDetailsHTML(data);

        /* manually trigger a hash change to start the app */
        $(window).trigger('hashchange');
    });

    $(window).on('hashchange', function() {
        /*On every hash change, render function is called with the new hash. This is how navaigation of the app happen */
        render(decodeURI(window.location.hash));
    });

    function render(url) {
        /* get keyword from the url */
        var temp = url.split('/')[0];

        /* Hide whatever page it currently shows */
        $('.main-content .page').removeClass('visible');

        var map = {
            /* the homepage */
            '': function() {
                /* Clear the filter object, uncheck all checkbox, show all the products */
                filters = {};
                checkboxes.prop('checked', false);
                renderDetailsPage(details);
            },
            /* Single Details Page */
            '#details': function() {
                /* get the index of which product we want to show and call the appropriate function. */
                var index = url.split('#details/')[1].trim();

                renderSingleDetailsPage(index, details);
            },
            /* page with filtered details */
            '#filter': function() {
                /* Grab string after the filter keyword. call the filter function */
                url = url.split('#filter/')[1].trim();
                /* Try and parse the filters object from the query string. */
                try {
                    filters = JSON.parse(url);
                }
                /* if it isn't a valid json, return to home page*/
                catch(err) {
                    window.location.hash = '#';
                }
                renderFilterResults(filters, details);
            }
        };
        /* Execute needed function depending on the url keyword(stored in temp).*/
        if(map[temp]){
            map[temp]();
        }
        /* if keyword isnt listed in the above, render error page. */
        else {
            renderErrorPage();
        }

    }

    function generateAllDetailsHTML(data) {
        var list = $('.all-details .details-list');
        var theTemplateScript = $("#details-template").html();
        /* Compile template */
        var theTemplate = Handlebars.compile(theTemplateScript);
        list.append(theTemplate(data));
        /* each detail has a data-index attribute.*/
        /* on click change url hash to open up a preview for this detail */
        /* remember: evry hashchange triggers the render function. */
        list.find('li').on('click', function (e) {
            e.preventDefault();
            var detailIndex = $(this).data('index');

            window.location.hash = 'detail/' + detailIndex;
        });
    }

    function renderDetailsPage(data) {
        var page = $('.all-details'),
            allDetails = $('.all-details .details-list > li');
        /* Hide all the details in the details list */
        allDetails.addClass('hidden');
        /* Iterate over all of the details. */
        /* if their id is somewhere in the data object, remove hidden class to reveal them */
        allDetails.each(function () {
            var that = $(this);

            data.forEach(function (item) {
                if(that.data('index') == item.id){
                    that.removeClass('hidden');
                }
            });
        });
        /* Show the page iteself*/
        /* render function hides all pages so we need to display the ones we desire */
        page.addClass('visible');
    }
      /* Shows the Single Product Page with appropriate data.*/
    function renderSingleDetailsPage(index, data){
      var page = $('.single-product'),
        container = $('.preview-large');
    /* Find the wanted details by iterating the data object and searching for the chosen index. */
    if(data.length){
        data.forEach(function (item){
            if(item.id == index){
                /* Populate '.preview-large' with the chosen detail's data */
                container.find('h3').text(item.name);
                container.find('img').attr('src', item.image.large);
                container.find('p').text(item.description);
            }
        });
    }
    /* Show the page. */
    page.addClass('visible');
    }
    /* Creates an object with filtered products and passes it to renderProductsPage.*/
    function renderFilterResults(filters, details){
        /* array contains all possible filter criteria. */
        var criteria = ['author','email','number','experience'],
            results = [],
            isFiltered = false;
        /* Uncheck all checkboxes*/
        /* Checkboxes checked one by one */
        checkboxes.prop('checked', false);
        criteria.=forEach(function (c) {
            
        })
        renderProductsPage(results);
    }

    function renderErrorPage(){
        // Shows the error page.
    }

    function createQueryHash(filters){
        // Get the filters object, turn it into a string and write it into the hash.
    }
});
