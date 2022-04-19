let form = document.getElementById('form')

form.addEventListener('submit',function(event) {
    event.preventDefault()
    var search = document.getElementById('search').value
    var url = "https://source.unsplash.com/random/300×200/?" + search
    var img = document.getElementById('img')
    img.src = url
})