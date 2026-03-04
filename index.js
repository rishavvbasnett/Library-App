const myLibrary = [];

function Book(title, author, pages, readOrNot) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readOrNot = readOrNot;
}

function addBooktoLibrary(title, author, pages, readOrNot) {
    let book = new Book(title, author, pages, readOrNot)
    myLibrary.push(book)
}

function displayBooks(library) {
    library.forEach(book => {
        let id = book.id;
        let title = book.title;
        let author = book.author;
        let pages = book.pages;
        let readOrNot = book.readOrNot;

        const displayId = document.createElement("p");
        displayId.id = "bookId"
        const displayTitle = document.createElement("p");
        const displayAuthor = document.createElement("p");
        const displayPages = document.createElement("p");
        const displayReadOrNot = document.createElement("p");

        displayId.textContent = id;
        displayTitle.textContent = title;
        displayAuthor.textContent = author;
        displayPages.textContent = pages;

        if (readOrNot === true) {
            displayReadOrNot.textContent = "Read";
        } else {
            displayReadOrNot.textContent = "Unread";
        }

        /* the remove button */
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove"
        removeBtn.classList.add("removeBtn")

        const bookCard = document.createElement("div")
        bookCard.appendChild(displayTitle)
        bookCard.appendChild(displayId)
        bookCard.appendChild(displayAuthor)
        bookCard.appendChild(displayPages)
        bookCard.appendChild(displayReadOrNot)
        bookCard.appendChild(removeBtn)
        bookCard.dataset.id = id;

        const displayBox = document.querySelector(".container .displayBox")
        displayBox.appendChild(bookCard)  
    })

        /* make events to remove a particular book from the myLibrary array */
        
        const allRemoveBtns = document.querySelectorAll(".displayBox .removeBtn")
        allRemoveBtns.forEach(button => {
        button.addEventListener("click", e => {

            /*get the closest parent div */
            const clickedBookCard = e.target.closest("div") /*or I can just retrieve the data named id. like: const idToDelete = clickedBookCard.dataset.id
            /* get the id from the parent div */
            const clickedBookId = clickedBookCard.querySelector("#bookId")
            const idToDelete = clickedBookId.textContent
            
            /* find the index of the book object that has the same id*/
            const deleteIndex = myLibrary.findIndex(item => item.id === idToDelete)

            /* remove the whole object from using that index from the main array */
            myLibrary.splice(deleteIndex, 1)

            /* redisplay new updated main array: myLibrary */
            Display.replaceChildren();
            displayBooks(myLibrary)
        })
})
}

addBooktoLibrary("RI ", "Gu Zhen Ren ", 1000, true)
addBooktoLibrary("One Piece", "Echiro Oda", 800, false)
addBooktoLibrary("Naruto", "Miyamoto", 800, true)


/* DOM */
const body = document.querySelector("body")
const Display = document.querySelector(".displayBox")


/* Make event for displaying Books */
const displayBooksButton = document.querySelector(".container>.displayBooks")
displayBooksButton.addEventListener("click", e => {

    /* clear all children from the displayBox */
    Display.replaceChildren();
    displayBooks(myLibrary)
})

    

const btnnewBook = document.querySelector(".newBook")
btnnewBook.addEventListener("click", () => {
    const dialogBox = document.createElement("dialog")

    const myForm = document.createElement("form")
    const title = document.createElement("h3")
    title.textContent = "Add a Book"
    myForm.appendChild(title)

    /* Make labels and input for different book properties */

    /* Title */
    const titleLabel = document.createElement("label")
    titleLabel.htmlFor = "title"
    titleLabel.textContent = "Title: "

    const titleInput = document.createElement("input")
    titleInput.type = "text";
    titleInput.id = "name";
    titleInput.name = "title";

    const titleDiv = document.createElement("div")
    titleDiv.appendChild(titleLabel)
    titleDiv.appendChild(titleInput)

    /* Author */
    const authorLabel = document.createElement("label")
    authorLabel.htmlFor = "author"
    authorLabel.textContent = "Author: "

    const authorInput = document.createElement("input")
    authorInput.type = "text";
    authorInput.id = "author";
    authorInput.name = "author";

    const authorDiv = document.createElement("div")
    authorDiv.appendChild(authorLabel)
    authorDiv.appendChild(authorInput)

    /* Pages */
    const pagesLabel = document.createElement("label")
    pagesLabel.htmlFor = "pages"
    pagesLabel.textContent = "Pages: "

    const pagesInput = document.createElement("input")
    pagesInput.type = "number";
    pagesInput.id = "pages";
    pagesInput.name = "pages";

    const pagesDiv = document.createElement("div")
    pagesDiv.appendChild(pagesLabel)
    pagesDiv.appendChild(pagesInput)

    /* readOrNot */
    const readornot = document.createElement("input")
    readornot.id = "readOrNot";
    readornot.type = "checkbox";
    readornot.name = "readOrNot";
    readornot.value = "true";

    const readLabel = document.createElement("label")
    readLabel.htmlFor = "readOrNot";
    readLabel.textContent = " Read"

    const readDiv = document.createElement("div")
    readDiv.appendChild(readornot)
    readDiv.appendChild(readLabel)

    /* Submit button */
    let submitBtn = document.createElement("button")
    submitBtn.setAttribute("type", "submit")
    submitBtn.textContent = "Add"

    myForm.appendChild(titleDiv)
    myForm.appendChild(authorDiv)
    myForm.appendChild(pagesDiv)
    myForm.appendChild(readDiv)
    myForm.appendChild(submitBtn)
    
    myForm.addEventListener("submit", e => {
        e.preventDefault();

        const bookObject = {}

        const formData = new FormData(myForm)
        for (const pair of formData) {
            bookObject[pair[0]] = pair[1]
        }
        if (formData.has("readOrNot") === false) {
            bookObject.readOrNot = false
        } else {
            bookObject.readOrNot = true
        }

        addBooktoLibrary(bookObject.title, bookObject.author, bookObject.pages, bookObject.readOrNot)
        dialogBox.close();
         
        Display.replaceChildren()
        displayBooks(myLibrary)
    })

    dialogBox.appendChild(myForm)
    body.appendChild(dialogBox)
    dialogBox.showModal();
})


