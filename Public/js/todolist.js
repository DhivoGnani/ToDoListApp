var items;


var myNodelist = document.getElementsByTagName("LI");
var i;
var close = document.getElementsByClassName("close");

for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}


var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    // TODO Better way to get index of list item
    var index =  $('li').index($(ev.target));
    var element = items[index];
    var result = !($(ev.target).hasClass('checked'));

    var data = {finished: result};
    $.ajax('todoitems?id=' + element._id , {
        type: 'PATCH',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(data) {
          ev.target.classList.toggle('checked');
        },
        error  : function() { 
          console.log('error');
        }
    });
  }
}, false);

function newElement()
{
  var input = document.getElementById("myInput").value;
  if (input == '') {
    alert("You must write something!");
    return;
  } 

  var data = {item: input, finished : false}; 
  $.ajax('todoitems', {
          type: 'POST',
          data: JSON.stringify(data),
          contentType: 'application/json',
          success: function(data) {
            items.push(data.ops[0]); 
            console.log('success'); 
            displayListItem(input, false);
          },
          error  : function() { 
            console.log('error');
          }
  });

}
// Create a new list item when clicking on the "Add" button
function displayListItem(input, finished) {
  var li = document.createElement("li");
  inputValue = input;
  $(li).text(inputValue)
  if (finished)
  {
    $(li).addClass("checked");
  }

  document.getElementById("myUL").appendChild(li);
  
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var index = $('li').index($(this.parentElement));
      var element = items[index];
      var div = this.parentElement;
      $.ajax('todoitems?id=' + element._id , {
          type: 'DELETE',
          contentType: 'application/json',
          success: function(data) {
            console.log(JSON.stringify(data));
            items.splice(index, 1);
            div.style.display = "none";
            $(div).remove();
          },
          error  : function() { 
            console.log('error');
          }
      });
    }
  }
}

$(document).ready(function() {
    $.get("todoitems", function(result){
      items = result;
       console.log("Worked well");
  	   for (var i = 0; i < result.length; i++)
  	   {
  		  displayListItem(result[i].item, result[i].finished);
  	   }
    });

});

