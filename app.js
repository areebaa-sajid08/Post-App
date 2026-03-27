var cardBg = ""
var editCard = null;
var username = prompt("Enter your username");
var now = new Date();
var dateTime = now.toLocaleString();
// POST
function post() {
    var title = document.getElementById("title")
    var description = document.getElementById("description")
    var posts = document.getElementById("posts")
    var isEdit = editCard ? true : false

    if (title.value.trim() && description.value.trim()) {

        // EDIT MODE
        if (editCard) {

            var titleEl = editCard.getElementsByClassName("post-title")[0]
            var descEl = editCard.getElementsByClassName("post-desc")[0]
            var body = editCard.getElementsByClassName("card-body")[0]

            titleEl.innerText = title.value
            descEl.innerText = description.value
            body.style.backgroundImage = "url(" + cardBg + ")"

            editCard = null

            document.getElementsByClassName("btn-primary")[0].innerText = "Post"
        }

        // NEW POST
        else {
            posts.innerHTML += `
            <div class="card mb-2">
              <div class="card-header d-flex justify-content-between align-items-center">
                <span>~${username}</span>
                <div>
                  <button class="btn btn-sm btn-warning" onclick="editPost(this)">Edit</button>
                  <button class="btn btn-sm btn-danger" onclick="deletePost(this)">Delete</button>
                </div>
              </div>

              <div style="background-image:url(${cardBg})" class="card-body">
                <figure>
                  <blockquote class="blockquote">
                    <p class="post-title">${title.value}</p>
                  </blockquote>
                  <figcaption class="blockquote-footer post-desc">
                    ${description.value}
                  </figcaption>
                  <small>Posted: ${dateTime}</small>
                </figure>
              </div>
            </div>
            `
        }

    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Title & description can't be empty!",
        });
        return;
    }

    title.value = ""
    description.value = ""

    Swal.fire({
        icon: "success",
        title: isEdit ? "Post Updated!" : "Post Added!",
        showConfirmButton: false,
        timer: 1500
    });
}


// DELETE

function deletePost() {
    var card = event.target.parentNode.parentNode.parentNode
    Swal.fire({
        title: "Are you sure?",
        text: "This post will be deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ab47bc",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(function (result) {
        if (result.isConfirmed) {
            card.remove()

            Swal.fire({
                title: "Deleted!",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}

// EDIT

function editPost() {
    var card = event.target.parentNode.parentNode.parentNode

    Swal.fire({
        title: "Edit this post?",
        text: "You can update it from the form",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, edit it!"
    }).then(function (result) {
        if (result.isConfirmed) {

            var titleEl = card.getElementsByClassName("post-title")[0]
            var descEl = card.getElementsByClassName("post-desc")[0]

            document.getElementById("title").value = titleEl.innerText
            document.getElementById("description").value = descEl.innerText

            var body = card.getElementsByClassName("card-body")[0]
            cardBg = body.style.backgroundImage.slice(5, -2)

            editCard = card

            document.getElementsByClassName("btn-primary")[0].innerText = "Update"
        }
    });
}

// SELECT IMAGE
function selectImg(src) {
    cardBg = src

    var images = document.getElementsByClassName("bgImg")

    for (var i = 0; i < images.length; i++) {
        images[i].classList.remove("selectedImg")
    }

    event.target.classList.add("selectedImg")
}
