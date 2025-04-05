var array = JSON.parse(sessionStorage.getItem("arrayOfBooks"));
const table = document.getElementById("book_table");

const bookNameRegex = /^[A-Za-z0-9\s'’-]+$/;
const priceRegex = /^(?:\$|€|EGP)?\s?\d+(\.\d{1,2})?$/;
const authorNameRegex = /^[A-Za-z]+(['-]?[A-Za-z]+)*$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

array.forEach(function(book, i)
{
    const row = document.createElement("tr");
    row.innerHTML = 
    `
        <td>${book.name}</td>
        <td>${book.priceValue}</td>
        <td>${book.author.author_name}</td>
        <td>${book.author.email}</td>
        <td> 
            <button class="edit">Edit</button>
        </td>
        <td> 
            <button class="delete">Delete</button>
        </td>
    `
    table.appendChild(row);

    const editbutton = row.querySelector(".edit")
    const cancelbutton = row.querySelector(".delete");

    editbutton.addEventListener("click", function()
    {
        if ("Edit" === editbutton.textContent)
        {
            //const row = editbutton.closest('tr');
            row.cells[0].innerHTML = `<input type="text" value="${book.name}">`;
            row.cells[1].innerHTML = `<input type="text" value="${book.priceValue}">`;
            row.cells[2].innerHTML = `<input type="text" value="${book.author.author_name}">`;
            row.cells[3].innerHTML = `<input type="text" value="${book.author.email}">`;

            editbutton.textContent = "Save";
            cancelbutton.textContent = "Cancel"
        }

        else
        {
            const bookNameInput = row.cells[0].querySelector("input");
            const priceInput = row.cells[1].querySelector("input");
            const authorNameInput = row.cells[2].querySelector("input");
            const emailInput = row.cells[3].querySelector("input");

            const bookname = bookNameInput.value.trim();
            const pricevalue = priceInput.value.trim();
            const authorname = authorNameInput.value.trim();
            const authoremail = emailInput.value.trim();

            if (!bookNameRegex.test(bookname)) {
                alert(`Book Name row ${i + 1} Invalid`);
                bookNameInput.focus();
                return;
            }

            if (!priceRegex.test(pricevalue)) {
                alert(`Price row ${i + 1} Invalid. Please use a valid number (e.g., 10 or 10.50)`);
                priceInput.focus();
                return;
            }

            if (!authorNameRegex.test(authorname)) {
                alert(`Author Name row ${i + 1} Invalid`);
                authorNameInput.focus();
                return;
            }

            if (!emailRegex.test(authoremail)) {
                alert(`Author E-mail row ${i + 1} Invalid`);
                emailInput.focus();
                return;
            }

            book.name = bookname;
            book.priceValue = pricevalue; // Format price with EGP
            book.author.author_name = authorname;
            book.author.email = authoremail;

            row.cells[0].textContent = book.name;
            row.cells[1].textContent = book.priceValue;
            row.cells[2].textContent = book.author.author_name;
            row.cells[3].textContent = book.author.email;

            editbutton.textContent = "Edit";
            cancelbutton.textContent = "Delete";

            sessionStorage.setItem("arrayOfBooks", JSON.stringify(array));
        }
    });

    cancelbutton.addEventListener("click", function()
    {
        if ("Cancel" === cancelbutton.textContent)
        {
            row.cells[0].textContent = book.name;
            row.cells[1].textContent = book.priceValue;
            row.cells[2].textContent = book.author.author_name;
            row.cells[3].textContent = book.author.email;

            editbutton.textContent = "Edit";
            cancelbutton.textContent = "Delete";
        }
        else
        {
            if (confirm("Are you sure you want to delete this row?"))
            {
                array.splice(i,1);
                sessionStorage.setItem("arrayOfBooks", JSON.stringify(array));
                row.remove();
            }
        }
    });
});