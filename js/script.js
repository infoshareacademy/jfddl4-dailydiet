$(document).ready(function () {
    $('.menu').click(function () {
        $('.nav-list').toggleClass('active');
    })
})

$('a.smooth-scroll').on('click', function(event){
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 30
    }, 800);
});

//--- TEMPORARY LOCAL STORAGE COOKIE ---

if (!localStorage.getItem('cookie',)) {
    document.getElementById('cookies').style.display = 'flex'
}

$('#cookies--close').on(
    'click',
    function() {
        localStorage.setItem('cookie', true)
        document.getElementById('cookies').style.display = 'none'
    })

//--- BACK TO TOP BUTTON ---

$(document).ready(function(){

    //Check to see if the window is top if not then display button
    $(window).scroll(function(){
        if ($(this).scrollTop() > 200) {
            document.getElementById('scrollToTop').style.display = 'flex'
        } else if ($(this).scrollTop() < 200) {
            document.getElementById('scrollToTop').style.display = 'none'
        }
    });

    //Click event to scroll to top
    $('.scrollToTop').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });
});

// Team members animation on in-view //

inView('#team').on('enter', (function () {
        $('.team__member-picture').addClass('team__member-picture__animation2 team__member-picture__animation')
    }))