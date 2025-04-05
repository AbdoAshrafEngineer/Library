const form = document.getElementById("bookForm");

form.addEventListener("submit",function(e)
{
    var error = document.getElementById("errorNoBooks");
    var userInput = document.getElementById("books").value.trim();
    
    error.innerText = "";
    if (isNaN(userInput) || userInput == '')
    {
        error.innerText = "Enter a valid number";
        e.preventDefault();
    }
    else
    {
        var userInputInt = parseInt(userInput);
        sessionStorage.setItem("no_of_books", userInputInt);
        window.location.href = "book_details.html";
    }
});


