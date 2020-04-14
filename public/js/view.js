$(document).ready(function() {
  var $services = $("#servicesArea");
  var $name = $("#name");
  var $email = $("#email");
  var $location = $("#location");

  var $postscontainer = $(".newposts");
  $(document).on("click", "#submit-form", insertPost);

  var posts = [];

  getPosts();

  function getPosts() {
    $.get("/api/post", function(data) {
      posts = data;
      initializeRows();
    });
  }

  function initializeRows() {
    $postscontainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      rowsToAdd.push(createNewRow(posts[i]));
    }
    $postscontainer.prepend(rowsToAdd);
  }

  function createNewRow(post) {
    var $newInputRow = $(
      [
        "<p>Name: ",
        post.name,
        "<br>Email: ",
        post.email,
        "<br>Services: ",
        post.services,
        "<br>Location: ",
        post.location,
        "</p><hr>",
      ].join("")
    );
    $newInputRow.data("post", post);
    return $newInputRow;
  }

  function insertPost(event) {
    event.preventDefault();
    var post = {
      name: $name.val().trim(),
      location: $location.val().trim(),
      services: $services.val().trim(),
      email: $email.val().trim()
    };

    $.post("/api/post", post, getPosts);
    $name.val("");
  }
  
});
