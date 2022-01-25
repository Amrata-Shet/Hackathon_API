//Build  html elements Header part
let container=document.createElement('div');
container.setAttribute('class','heading-container');

let header=document.createElement('h1');
header.innerHTML="Books List";

let image=document.createElement('img');
image.setAttribute('src','https://tse3.mm.bing.net/th?id=OIP.4c9OZ_Zb6r2I8OXB5rISpAHaE8&pid=Api&P=0&w=229&h=153');
image.setAttribute('alt','Books');
image.setAttribute('width','800px');
image.setAttribute('height','400px');

container.append(header);
container.append(image);
document.body.append(container);

//Build html elements for displaying the results
let render=document.createElement('div');
render.setAttribute('class','main-container');
render.setAttribute('id','mainContainer');
document.body.append(render);

let char_data=document.createElement('div');
char_data.setAttribute('class','char-container');
render.append(char_data);
document.body.append(char_data);

//Fetch books data from the main URL
const getData = async () => {
  try {
    const data = await fetch("https://www.anapioficeandfire.com/api/books");
    const books = await data.json();
    render.innerHTML = "";
    books.forEach((book) => {
      displayData(book);
    });
  } catch (error) {
    console.log(error);
  }
};

getData();


//Display relevant data of all books
const displayData = (obj) => {
  render.innerHTML += `
  <div class="container">
  <h3 class="info">Book Name:<span>${obj.name}</span></h3>
  <p class="info">Book Isbn:<span>${obj.isbn}</span></p>
  <p class="info">Book Number of Pages:<span>${obj.numberOfPages}</span></p>
  <p class="info">Book Authors:<span>${obj.authors}</span></p>
  <p class="info">Book Publisher Name:<span>${obj.publisher}</span></p>
  <p class="info">Book Released Date:<span>${obj.released}</span></p>
  <p class="info">Book Character 1:<span>${obj.characters[0]}</span></p>
  <p class="info">Book Character 2:<span>${obj.characters[1]}</span></p>
  <p class="info">Book Character 3:<span>${obj.characters[2]}</span></p>
  <p class="info">Book Character 4:<span>${obj.characters[3]}</span></p>
  <p class="info">Book Character 5:<span>${obj.characters[4]}</span></p>
  <p class="info">Book Character 1:<span class="char_url">${get_char(obj.characters[0])}</span></p>
  <p class="info">Book Character 2:<span class="char_url">${get_char(obj.characters[1])}</span></p>
  <p class="info">Book Character 3:<span class="char_url">${get_char(obj.characters[2])}</span></p>
  <p class="info">Book Character 4:<span class="char_url">${get_char(obj.characters[3])}</span></p>
  <p class="info">Book Character 5:<span class="char_url">${get_char(obj.characters[4])}</span></p>
  </div>
  `;
};

//Fetch characters URL from the main books URL, and fetch the characters relevant data
async function get_char(url){
    let users;
    try {
      const data = await fetch(url);
      users = await data.json();
    }catch (err) {
      console.log(err);
    }
    display_characters(users);
  }


//Display relevant information of characters
const display_characters = (obj) => {
  char_data.innerHTML += `
  <div class="char_data-container">
  <p>Book Character</p>
  <p class="info">URL:<span>${obj.url}</span></p>
  <p class="info">Name:<span>${obj.name}</span></p>
  <p class="info">Gender:<span>${obj.gender}</span></p>
  <p class="info">Character Played by:<span>${obj.playedBy}</span></p>
  </div>
  `;
};
