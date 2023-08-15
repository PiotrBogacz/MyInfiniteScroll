// Variables
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let imagesLoaded = 0;
let totalImages = 0;
let ready = false;

// Photos array
let photosArray = [];

//Check if all images are loadded and set ready to true
const imageLoaded = () => {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper function to clear code in displayPhotos();
const setAttributes = (element, attributes) => {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos, add to DOM
const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photos array
    photosArray.forEach(photo => {
        // Create item and <a> tag
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });
        // Create <img> for photo
        const image = document.createElement("img");
        setAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event listener to check if images are loaded
        image.addEventListener("load", imageLoaded);
        // Add image to item & item to image-container
        item.appendChild(image);
        imageContainer.appendChild(item);
    })
}

// Unsplash API
let count = 5;
const apiKey = "JZEy4qVnNhrDF2oi4pEMVrEnhU-Fd_Zz58Q32XbAc_w";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get data from Unsplash API
const getPhotos = async () => {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

//Load new images on scroll
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 & ready) {
        ready = false;
        getPhotos();
;    }
})

getPhotos();