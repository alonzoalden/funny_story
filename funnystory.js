$(document).ready(function() {
  LoadTitles();
});

//This appends the dropdown list of story titles.
var TitleCreate = function(item) {
  $("#menu").append('<li><a href="#" onclick="AnswerBox(\'' + item + '\')">' + item + '</a></li>');
}

//This gathers all the titles from the objects
var LoadTitles = function() {
  var titles = stories.map(function(obj) {
    return obj.Title;
  }).
    forEach(function(value) {
      TitleCreate(value);
    });
};

var count = 0;
var WordOrder = [];
var AnswerObj = {};

//This collects all the answers from the input boxes and adds it to the story.
var AnswerCollect = function(title) {
  var temp;
  var j = 0
    for (i=0; i < count; i++) {
      j += 1
      if (temp !== WordOrder[i]) {
        j = 1
      }
      temp = WordOrder[i]
      var a = "answer" + [i+1];
      var answers = document.getElementById(a).value;
      AnswerObj[WordOrder[i] + j] = answers
    }
    stories.filter(function (value) {
      return value.Title === title
    }).forEach(function(value) {
      $('#Story-Here').html("<h2>" + value.Title + "</h2><br>" + value.Story());
    })
}

//This function creates the input boxes for the words.
var WordPost = function(item, count) {
  WordOrder.push(item);
  var generatehere = document.getElementById("generate-here");
  generatehere.innerHTML += '<div class="input-group center-block"><input id="answer' + count + '" type="text" class="form-control" placeholder="' + item + '" aria-describedby="basic-addon1"></div>'
}

//This function sets up what boxes will be posted.
var AnswerBox = function(title) {
  WordOrder = [];
  count = 0
  var subjects = [];
  $('#generate-here').html("")
  $('#Story-Here').html("")
  $('#generate-here').append('<p>Fill in the boxes to help create a story.</p>')
  stories.filter(function (value) {
    return value.Title === title
    }).
    forEach(function(value) {
      for (var key in value) {
        if (key !== 'Title' && key !== "Story") {
          count = count + 1
          WordPost(key, count);
        if (value[key] > 1) {
          for (i=0; i < value[key]-1; i++) {
            count = count + 1
            WordPost(key, count);
          }}
        }
      }
    })
$('#generate-here').append('<br><br><button type="button" class="btn btn-primary center-block" onclick="AnswerCollect(\''+ title + '\')">Submit</button>')
}
