const accessKey = "QKYtIGfjyqpsdHqrB-1zmr4SnWLJ_FM_trCEGfn6BxU";

const formEl =document.querySelector("form");
const searchInputEl = document.getElementById("Search-input");
const searchResultsEl =document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page=1;

async function searchImages(){
    inputData=searchInputEl.value;
    const url =`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    
    if(page===1){
        searchResultsEl.innerHTML="";
    }

    const results = data.results;


    results.map((result)=>{
        const imageWrapper=document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src= result.urls.small;
        image.alt=result.alt_description;
        const imagLink=document.createElement("a");
        imagLink.href=result.links.html;
        imagLink.target="_blank";
        imagLink.textContent=result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imagLink);
        searchResultsEl.appendChild(imageWrapper);

    });

   page++;


    if(page>1){
        showMoreButtonEl.style.display="block";

    }

}

formEl.addEventListener("submit" , (event) => {
    event.preventDefault();
    page=1;
    searchImages();
});
showMoreButtonEl.addEventListener("click", () => {
    searchImages();
  });
