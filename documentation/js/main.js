$('.navbar-brand').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ 
        scrollTop: 0
    }, 1000);
})
$('.list-group-item').on('click', function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    $('html, body').animate({ 
        scrollTop: $(target).offset().top
    }, 1000);
})