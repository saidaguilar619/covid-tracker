$(document).ready(function () {
  var $services = $(".custom-select");
  var $name = $("#name");
  var $email = $("#email");
  var $location = $("#location");

  var $servicesE = $(".edit-custom-select");
  var $nameE = $("#edit-name");
  var $emailE = $("#edit-email");
  var $locationE = $("#edit-location");
 


  var $postscontainer = $(".newposts");
  const $country = $(".country")
  const $deaths = $(".deaths")
  const $confirmed = $(".confirmed")
  const $recovered = $(".recovered")

  var posts = [];
  var currentModal= "";

  $(document).on("click", "#submit-form", insertPost);
  $(document).on("click", ".saveEdit", editPost);

  initializePage();

  function initializePage() {

    getPosts();
    getData();
  }

  function getPosts() {
    $.get("/api/post", function (data) {
      posts = data;
      initializeRows(data);
    }).then(function () {

    });
  }

  function initializeRows(posts) {
    $postscontainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      rowsToAdd.push(createNewRow(posts[i]));
      rowsToAdd.push(createNewDltBtn(posts[i].id));
      rowsToAdd.push(createNewEditBtn(posts[i].id));
    }
    $postscontainer.prepend(rowsToAdd);
  }

  function renderMenu(data) {
    let code = "";
    if (data.length !== 0) {
      var div = $("<div>").addClass("country-list").on("click", getCountryData);
      $.get("/api/getflags").then(function (response) {
        for (let i = 0; i < response.length; i++) {
          for (let j = 0; j < data.countries_stat.length; j++) {
            if (data.countries_stat[j].country_name === response[i].name) {
              code = response[i].alpha2Code;

              var img_url = `https://www.countryflags.io/${code}/shiny/64.png`;
              var span = $("<span>").addClass("container-list ").on("click", getCountryData);

              var a = $("<button>").addClass("country-btn")
                .attr("value", data.countries_stat[j].country_name)
                .text(data.countries_stat[j].country_name + "    ");

              span.append(a);

              var img = $("<img>").attr("src", img_url)
              a.append(img);

              div.append(span);

              $(".jumbotron1").append(div);

            }
          }
        }
        return code;
      });
    }
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

  function createNewRow(post) {
    var $newInputRow = $(
      [
        "<hr><p>Name: <span id='userName",post.id,"'>",
        post.name,
        "</span><br>Email: <span id='userEmail",post.id,"'>",
        post.email,
        "</span><br>Services: <span id='userServices",post.id,"'>",
        post.services,
        "</span><br>Location: <span id='userLocation",post.id,"'>",
        post.location,
        "</span></p>",
      ].join("")
    );

    $newInputRow.data("post", post);
    $newInputRow.data("id", post.id);

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
    var $edit_button = $("<button>").addClass("edit btn-info btn-primary btn1")
      .text("Edit")
      .attr("value", id)
      .attr("data-toggle", "modal")
      .attr("data-target", "#exampleModal3")
      .on("click", renderModal);

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
      .then(function () {
        location.reload();
      });
  }

  function renderModal(event) {
    currentModal = $(this).val();
    currentName = "#userName" + currentModal;
    currentEmail = "#userEmail" + currentModal;
    currentLocation= "#userLocation" + currentModal;
    
    let nameText = $(this).parent().find(currentName).text();
    let  emailText = $(this).parent().find(currentEmail).text();
    let locationText = $(this).parent().find(currentLocation).text();

    $nameE.val(nameText);
    $emailE.val(emailText);
    $locationE.val(locationText);

    $(".saveEdit").attr("value", currentModal)
  }

  function editPost(event) {
    event.preventDefault();
    var post = {
      name: $nameE.val().trim(),
      location: $locationE.val(),
      services: $servicesE.val(),
      email: $emailE.val(),
      id: event.target.value
    };
    finishEdit(post)
  }

  function finishEdit(data){
    $.ajax({
        method: "PUT",
        url: "/api/post/",
        data: data
      })
      .then(location.reload());
  }
});