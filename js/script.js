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


carousel = (function(){
    var box = document.querySelector('.hero__carousel-box')
    var next = box.querySelector('.next')
    var prev = box.querySelector('.prev')
    var items = box.querySelectorAll('.hero__carousel-pictures hero__carousel-items')
    var counter = 0
    var amount = items.length
    var current = items[0]
    box.classList.add('active')
    function navigate(direction) {
        current.classList.remove('current')
        counter = counter + direction;
        if (direction === -1 &&
            counter < 0) {
            counter = amount - 1
        }
        if (direction === 1 &&
            !items[counter]) {
            counter = 0
        }
        current = items[counter];
        current.classList.add('current')
    }
    next.addEventListener('click', function(ev) {
        navigate(1)
    })
    prev.addEventListener('click', function(ev) {
        navigate(-1)
    })
    navigate(0)
})();