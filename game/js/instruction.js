var modal = document.getElementById('instructions')

var btn = document.getElementById("myBtn") //zamienić na btn z formularza

var span = document.getElementsByClassName("modal__close")[0]

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}