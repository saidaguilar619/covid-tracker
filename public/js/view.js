$(document).ready(function() {
  var $services = $("#servicesArea");
  var $name = $("#name");
  var $email = $("#email");
  var $location = $("#location");
  const $country = $(".country")


  var $postscontainer = $(".newposts");
  $(document).on("click", "#submit-form", insertPost);

  var posts = [];

  getPosts();
  getData();
  function getPosts() {
    $.get("/api/post", function(data) {
      posts = data;
      initializeRows();
    });
  }
  function getData() {
    $.get("/api/coronadata", function(data) {
      $country.val(data.data.countries_stat[0]);
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
      location: $location.val(),
      services: $services.val(),
      email: $email.val()
    };

    $.post("/api/post", post, getPosts);
    $name.val("");
  }
  
});
