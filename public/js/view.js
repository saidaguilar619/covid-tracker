$(document).ready(function () {

  var $services = $(".custom-select");
  var $name = $("#name");
  var $email = $("#email");
  var $phone = $("#phone");
  var $location = $("#location");
  const $country = $(".country")
  const $deaths = $(".deaths")
  const $confirmed = $(".confirmed")
  const $recovered = $(".recovered")

  var $postscontainer = $(".newposts");
  $(document).on("click", "#submit-form", insertPost);

  var posts = [];

  getPosts();
  getData();

  function getPosts() {
    $.get("/api/post", function (data) {
      posts = data;
      initializeRows();
    });
  }

  function getData() {
    $.get("/api/coronadata", function (data) {
      $country.text(data.countries_stat[0].country_name);
      $deaths.text(data.countries_stat[0].deaths);
      $confirmed.text(data.countries_stat[0].cases);
      $recovered.text(data.countries_stat[0].total_recovered);
      renderMenu(data);

    });
  }


  function renderMenu(data) {
    if (data.length !== 0) {

      var div = $("<div>").addClass("country-list").on("click", getCountryData);


      for (var i = 0; i < data.countries_stat.length; i++) {
        console.log(getFlagsCode(data.countries_stat[i].country_name));
        var span = $("<span>").addClass("container-list ").on("click", getCountryData);

        var code = getFlagsCode(data.countries_stat[i].country_name);
        console.log(code);
        var img_url = `https://www.countryflags.io/${code}/shiny/64.png`;
        var a = $("<button>").addClass("country-btn")
          .attr("value", data.countries_stat[i].country_name)
          .text(data.countries_stat[i].country_name + "    ");
          
        span.append(a);

        var img = $("<img>").attr("src", img_url)
        span.append(img);

        div.append(span);

        $(".jumbotron1").append(div);
      };
    }
  }

  function getFlagsCode(country) {
    
    let code = "";
    $.get("/api/getflags", function (data) {
      for (let i = 0; i < data.length; i++) {
        if (country == data[i].name) {
          code = data[i].alpha2Code;
          console.log(code);
          return code;
        }
      }
    });
  }

  function getCountryData(event) {
    $.get("/api/coronadata", function (data) {
      for (var i = 0; i < data.countries_stat.length; i++) {
        if (event.target.value === data.countries_stat[i].country_name) {
          $country.text(data.countries_stat[i].country_name);
          $deaths.text(data.countries_stat[i].deaths);
          $confirmed.text(data.countries_stat[i].cases);
          $recovered.text(data.countries_stat[i].total_recovered);
        }
      }
    });
  }

  function initializeRows() {
    $postscontainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      rowsToAdd.push(createNewRow(posts[i]));
      rowsToAdd.push(createNewDltBtn(posts[i].id));
      // rowsToAdd.push(createNewEditBtn(posts[i].id));
    }
    $postscontainer.prepend(rowsToAdd);
  }

  function createNewRow(post) {
    var $newInputRow = $(
      [
        "<hr><p>Name: ",
        post.name,
        "<br>Email: ",
        post.email,
        "<br>Services: ",
        post.services,
        "<br>Location: ",
        post.location,
        "</p>",
      ].join("")
    );
 
    $newInputRow.data("post", post);
    return $newInputRow;
  }

  function createNewDltBtn(id) {

    var $dlt_button = $("<button>").addClass("delete btn-danger btn1")
    .text("X")
    .attr("value", id)     
    .on("click", deletePost);

    return $dlt_button;
  }

  function createNewEditBtn(id) {

    var $edit_button = $("<button>").addClass("edit btn-info btn1")
    .text("Edit")
    .attr("value", id) 
    .data("post", post)    
    .on("click", editPost);

    return $edit_button;
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
    $location.val("");
    $email.val("");
    $phone.val("");
  }

  function deletePost(event) {
    $.ajax({
      method: "DELETE",
      url: "/api/post/" + event.target.value
    })
      .then(function() {
        location.reload();
      });
  }

  function editPost() {
    var currentPost = $(this).data("post");
    $name.val(currentPost.text);
  }


  // function editPost(event) {
  //   $.ajax({
  //     method: "PUT",
  //     url: "/api/post/" + event.target.value
  //   })
  //     .then(function() {
  //       location.reload();
  //     });
  // }
});