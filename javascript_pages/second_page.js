var noOfBooks = parseInt(sessionStorage.getItem("no_of_books"));

var authorInfo = function(author_name, email)
{
    this.author_name = author_name;       
    this.email = email; 
}

var book = function(name, priceValue, author)
{
    this.name = name;
    this.priceValue = priceValue;
    this.author = author;
}

const book_details = document.getElementById("bookDetails");
const books_info = [];

const bookNameRegex = /^[A-Za-z0-9\s'’-]+$/;
const priceRegex = /^(?:\$|€|EGP)?\s?\d+(\.\d{1,2})?$/;
const authorNameRegex = /^(?:[A-Za-z]+(?:['-]?[A-Za-z]+)*|[A-Za-z]\.)(?:\s+(?:[A-Za-z]+(?:['-]?[A-Za-z]+)*|[A-Za-z]\.))*$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const bookNameError = document.getElementById("bookNameError");
const priceErorr = document.getElementById("priceError");
const authorNameError = document.getElementById("authorNameError");
const emailError = document.getElementById("emailError");

book_details.addEventListener("submit", function(e)
{
    bookNameError.innerText = "";
    priceErorr.innerText = "";
    authorNameError.innerText = "";
    emailError.innerText = "";

    const bookName = document.getElementById("bookName").value.trim();
    const price = document.getElementById("price").value.trim();
    const authorName = document.getElementById("author").value.trim();
    const email = document.getElementById("email").value.trim();

    var isValid = true;

    if ((bookName == '') || (!bookNameRegex.test(bookName)))
    {
        isValid = false;
        bookNameError.innerText = "Please Enter A valid Book Name..";
    }
    if ((price == '') || (!priceRegex.test(price)))
    {
        isValid = false;
        priceErorr.innerText = "Please Enter A valid Price..";
    }
    if ((authorName == '') || (!authorNameRegex.test(authorName)))
    {
        isValid = false;
        authorNameError.innerText = "Please Enter A valid Auhor Name..";
    }
    if ((email == '') || (!emailRegex.test(email)))
    {
        isValid = false;
        emailError.innerText = "Please Enter A valid Email..";
    }

    if(isValid)
    {
        books_info.push(new book(bookName, price, new authorInfo(authorName, email)));
        if (books_info.length == noOfBooks)
        {
            window.location.href = "table.html";
            sessionStorage.setItem("arrayOfBooks", JSON.stringify(books_info));
        }
        else
        {
            this.reset();
            e.preventDefault();
        }   
    }
    else
    {
        e.preventDefault();
    }

});
