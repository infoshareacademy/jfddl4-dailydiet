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


// $('.team__member-picture').hover(function () {
//     $(this).addClass('team__member-picture__animation2 team__member-picture__animation');
// });

inView('#team').on('enter', (function () {
        $('.team__member-picture').addClass('team__member-picture__animation2 team__member-picture__animation');
    }))
    .on('exit', el => {
        el.style.opacity = 0.5;
    });