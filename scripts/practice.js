// console.log('practice');

// time calculate
function calculate(time){
    const hours = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % minute;
    return `${hours} hour ${minute} minute ${remainingSecond} second ago`;
}
// calculate(4000);

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("btn-category");
    console.log(buttons);
    for(let btn of buttons){
        btn.classList.remove('active');
    }
}

// load category
const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => showCategory(data.categories))
    .catch((error) => console.log(error))
};
// show category
const showCategory = (categories) => {
    const categoryContainer = document.getElementById('categories');
    categories.forEach((item) => {
        // create button
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideo(${item.category_id})" class="btn btn-category">${item.category}</button>
        `;
        categoryContainer.append(buttonContainer);


        // const button = document.createElement('button');
        // button.classList = 'btn';
        // button.innerText = item.category;
        // categoryContainer.append(button);
    });
};

const loadDetails = async (videoId) => {
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url);
    const data = await res.json();
    showDetails(data.video);
}

const showDetails = (video) => {
    console.log(video)
    const detailContainer = document.getElementById('modal-content');

    detailContainer.innerHTML = `
    <img src="${video.thumbnail}" />
    <p>${video.description}</p>
    `
    
    // way-1
    // document.getElementById('showModalData').click();
    // way-2
    document.getElementById('my_modal_1').showModal();
};


const loadCategoryVideo = (id) =>{
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add('active');
        showVideos(data.category)
    })
    .catch((error) => console.log(error))
};

// {
//     "category_id": "1001",
//     "category": "Music"
//   },

// {
//     "status": true,
//     "message": "successfully fetched all the videos",
//     "videos": [
//       {
//         "category_id": "1001",
//         "video_id": "aaaa",
//         "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//         "title": "Shape of You",
//         "authors": [
//           {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//           }
//         ],
//         "others": {
//           "views": "100K",
//           "posted_date": "16278"
//         },

// load videos
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((res) => res.json())
    .then((data) => showVideos(data.videos))
    .catch((error) => console.log(error))
};


// show videos
const showVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = '';

    if(videos.length === 0){
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center gap-5">
            <img src="assets/Icon.png" />
            <p class="text-red-500 text-2xl font-bold">No any Items here</p>
        </div>
        `;
    }
    else{
        videoContainer.classList.add('grid');
    }

    videos.forEach((video) => {
        // console.log(video);
        // create card
        const card = document.createElement('div');
        card.classList = 'card card-compact';
        card.innerHTML = `
        <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
     class="w-full h-full object-cover"
      alt="Shoes" />
      ${video.others.posted_date?.length === 0 ? '' : `<span class="absolute bg-black text-white right-2 bottom-2 px-1 rounded-lg text-sm">${calculate(video.others.posted_date)}</span>`}
      
  </figure>
  <div class="flex py-2 gap-5">
    <div>
    <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}" />
    </div>
    <div>
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex items-center gap-2">
        <p>${video.authors[0].profile_name}</p>
        ${video.authors[0].verified ? `<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" />` : ''}
    </div>
    <p class="text-sm">${video.others.views} views</p>
    <button onclick="loadDetails('${video.video_id}')" class="btn btn-error btn-sm mt-2 text-white font-semibold">details</button>
    </div>
  </div>
  `;
  videoContainer.append(card);
})
};

loadCategory();
loadVideos();