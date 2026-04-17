var cardBg = ""
var editCard = null;


function signUp() {
    var name = document.getElementById("userName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if (name === "" || email === "" || password === "") {
        alert("Please fill all this fields")
        return;
    }

    var userInformation = {
        fullName: name,
        userEmail: email,
        userPassword: password
    }
    var json = JSON.stringify(userInformation);
    //  console.log(json);
    localStorage.setItem("user", json);
    alert("Signup Successful! Now go to Login Page");
    window.location.href = "login.html"
}



function login() {
    var user$ = document.getElementById("enterEmail").value;
    var $password = document.getElementById("firstPassword").value;

    if (user$ === "" || $password === "") {
        alert("Please fill all this fields");
        return;
    }

    var userData = localStorage.getItem("user");

    if (userData === null) {
        alert("No user found, please sign up first!");
        return;
    }

    var info = JSON.parse(userData);

    if (user$ === info.userEmail && $password === info.userPassword) {
        Swal.fire({
            icon: "success",
            title: `Welcome ${info.fullName}!`,
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.location.href = "post.html";
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Invalid Information!",
            text: "Email or Password is wrong."
        });
    }
}

function post() {
    var now = new Date();
    var dateTime = now.toLocaleString();
    var user_Name = localStorage.getItem("user");
    var userObj = JSON.parse(user_Name)
    var title = document.getElementById("title")
    var description = document.getElementById("description")
    var posts = document.getElementById("posts")
    var isEdit = editCard ? true : false

    if (title.value.trim() && description.value.trim()) {

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

        else {
            posts.innerHTML += `
<div class="card mb-2">
    <div class="card-header d-flex justify-content-between align-items-center">
        <span>~${userObj.fullName}</span>

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
    <div class="py-3 border-top border-secondary d-flex gap-4">
        <button class="btn  color p-0 text-decoration-none small" onclick="colorChange(this)">
            Like
        </button>
        <div class="d-flex gap-4  ms-auto">
            <button class="btn btn-sm btn-warning" onclick="editPost(this)">
                Edit
            </button>

            <button class="btn btn-sm btn-danger" onclick="deletePost(this)">
                Delete
            </button>
        </div>
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




function editPost(button) {
    var card = button.closest(".card");

    var titleEl = card.querySelector(".post-title");
    var descEl = card.querySelector(".post-desc");

    var titleInput = document.getElementById("title");
    var descriptionInput = document.getElementById("description");

    Swal.fire({
        title: "Edit this post?",
        text: "This post will be removed and you can update it from the form",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, edit it!",
        cancelButtonText: "Cancel"
    }).then((result) => {
        if (result.isConfirmed) {
            titleInput.value = titleEl.innerText;
            descriptionInput.value = descEl.innerText;

            editCard = card;

            document.getElementsByClassName("btn-primary")[0].innerText = "Update Post";

            Swal.fire({
                title: "Ready to Edit!",
                text: "Post removed. Now update it from the form",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}

function selectImg(src) {
    cardBg = src

    var images = document.getElementsByClassName("bgImg")

    for (var i = 0; i < images.length; i++) {
        images[i].classList.remove("selectedImg")
    }

    event.target.classList.add("selectedImg")
}
function colorChange(likeBtn) {
    if (likeBtn.innerText === "Like") {
        likeBtn.style.color = "rgb(64, 32, 32)";
        likeBtn.innerText = "Liked";
    } else {
        likeBtn.style.color = "rgb(126, 82, 82)";
        likeBtn.innerText = "Like";
    }
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}