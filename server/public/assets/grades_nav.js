function ShowNav() {
    var Nav = document.getElementById('dropdown');
    if (Nav.style.display === "none") {
        Nav.style.display = "block";
    } else {
        Nav.style.display = "none";
    };
}


// Get the navbar
var navbar = document.getElementById("topnav");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};



//-----------------------------------------------//
//Redundant
/* 
function ShowWrappers () {
    var Nav = document.getElementById('dropdown')
    var GradeWrapper = document.getElementById("wrapper_show");
    var GradeAddWrapper = document.getElementById("wrapper_add");
    Nav.style.display = "none";
    GradeWrapper.style.display = "block";
    GradeAddWrapper.style.display = "block";
}


window.onload = function () {
    var links = document.querySelectorAll("#dropdown a");
    links.forEach(function(link) {
        link.addEventListener("click", function () {
            ShowWrappers();
        })  
    });
}
*/
