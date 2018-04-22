//--- SMOOTH NAVIGATION SCROLL ---
$(document).ready(function () {
    $('.menu').click(function () {
        $('.nav-list').toggleClass('active')
    })
})

$('a.smooth-scroll').on('click', function(event){
    event.preventDefault()
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 80
    }, 800)
})
//--- / SMOOTH NAVIGATION SCROLL ---

//--- HIGHLIGHT IN-VIEW SECTION IN MENU ---
$(window).scroll(function() {
    var scrollDistance = $(window).scrollTop()

    // Assign active class to nav links while scolling
    $('.main-section').each(function(i) {
        if ($(this).position().top - $(window).height() / 3 <= scrollDistance) {
            $('.nav a.active').removeClass('active')
            $('.nav a').eq(i).addClass('active')
        }
    })
}).scroll()
//--- / HIGHLIGHT IN-VIEW SECTION IN MENU ---

//--- TEMPORARY LOCAL STORAGE COOKIE ---
if (!localStorage.getItem('cookie',)) {
    document.getElementById('cookies').style.display = 'flex'
}

$('#cookies--close').on(
    'click',
    function() {
        localStorage.setItem('cookie', true)
        document.getElementById('cookies').style.display = 'none'
        changeButtonPosition()
    })
//--- / TEMPORARY LOCAL STORAGE COOKIE ---

//--- / TEAM MEMBERS ANIMATION ON IN-VIEW
inView.offset(80)

inView('.team_magda').on('enter', (function () {
    $('.team__magda').addClass('team__member-picture__animation')
}))

inView('.team_szymon').on('enter', (function () {
    $('.team__szymon').addClass('team__member-picture__animation')
}))

inView('.team_bartek').on('enter', (function () {
    $('.team__bartek').addClass('team__member-picture__animation')
}))
//--- / TEAM MEMBERS ANIMATION ON IN-VIEW

//--- BACK TO TOP BUTTON ---
$(document).ready(function() {

    //Check to see if the window is top if not then display button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            document.getElementById('scrollToTop').style.display = 'flex'
        } else if ($(this).scrollTop() < 200) {
            document.getElementById('scrollToTop').style.display = 'none'
        }
    })

    //Click event to scroll to top
    $('.scrollToTop').click(function() {
        $('html, body').animate({scrollTop : 0},800)
        return false
    })

})

// Adjust srollToTop button bottom position depending on 'cookies' display 'felx' or 'none'
function changeButtonPosition() {
    var cookiesHeight = document.getElementById('cookies').offsetHeight || 0
    document.getElementById('scrollToTop').style.bottom = cookiesHeight + 35 + 'px'
}

changeButtonPosition()
//--- / BACK TO TOP BUTTON ---
