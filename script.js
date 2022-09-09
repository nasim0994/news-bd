// Category API
const categoryData = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => categoryDisplay(data.data.news_category))
        .catch(error => console.log(error))
}
categoryData();
// Category Display
const categoryDisplay = (categories) => {

    const categoryFiled = document.getElementById('categoryFiled');
    categories.forEach(category => {
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML = `
            <button onclick="categoryNews('${category.category_id}')" class="nav-link text-dark border-0 bg-light">${category.category_name}</button>
        `;
        categoryFiled.appendChild(li)
    });
}

// Spinner load
const spinner = (isLoading) => {
    const spinnerContainer = document.getElementById('spinner-container');
    if (isLoading) {
        spinnerContainer.classList.remove('d-none');
    } else {
        spinnerContainer.classList.add('d-none');
    }
}



// click category
const categoryNews = (categoryId) => {
    // Spinner Start
    spinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    fetch(url)
        .then(res => res.json())
        .then(data => newsDisplay(data.data))
        .catch(error => console.log(error))
}
// All News display 
categoryNews('08')

// click category news display
const newsDisplay = (newsAll) => {

    //Sort by total view
    newsAll.sort(function (a, b) {
        return b.total_view - a.total_view
    });


    // Total News Number Display
    const totalNewsNumber = document.getElementById('total-news-number');
    totalNewsNumber.innerText = newsAll.length;

    // news card
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ""
    newsAll.forEach(news => {

        const div = document.createElement('div')
        div.classList.add('card', 'mb-3', 'border-0', 'p-3');
        div.innerHTML = `
            <div class="row g-0">
                <div class="col-md-3">
                    <img src="${news.thumbnail_url}" class="img-fluid w-100 rounded-2" style="height:280px" alt="...">
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <h4 class="card-title fw-bold">${news.title}</h4>
                        <p class="card-text text-black-50 news-details">${news.details}</p>
                        <!-- News Information -->
                        <div class="d-flex justify-content-between align-items-center pt-4">
                            <!-- Author info -->
                            <div class="d-flex justify-content-center align-items-center flex-column flex-sm-row">
                                <div class="pe-2">
                                    <img style="width: 40px; border-radius: 50%;" src="${news.author.img}" alt="">
                                </div>
                                <div>
                                    <h6>${news.author.name ? news.author.name : "Name No Found" }</h6>
                                    <p class="text-black-50 d-none d-md-block">${news.author.published_date ? news.author.published_date : "Date No Found"}</p>
                                </div>
                            </div>
                            <!-- View -->
                            <div>
                                <p><i class="far fa-eye"></i> ${news.total_view ? news.total_view : "No View"}</p>
                            </div>
                            <!-- Rating -->
                            <div>
                                <p><i class="fas fa-star"></i> ${news.rating.number ? news.rating.number : "No Rating"}</p>
                            </div>
                            <!-- See Details Button -->
                            <div>
                                <button onclick="newsDetails('${news._id}')" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#newsDetails">
                                <i class="fas fa-arrow-right text-info"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        newsContainer.appendChild(div);
    });

    // Spinner Stop
    spinner(false);
}



//newsDetails
const newsDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => detailsDisplay(data.data))
        .catch(error => console.log(error))
}

const detailsDisplay = (newsDetails) => {
    newsDetails.forEach(newsDetail => {
        console.log(newsDetail);
        const newsDetailsTitle = document.getElementById('newsDetailsLabel')
        newsDetailsTitle.innerText = `${newsDetail.title}`;

        const newsDetailsContainer = document.getElementById('news-details-container');
        newsDetailsContainer.innerHTML = `
            <img style="width:100%;height:300px" src="${newsDetail.thumbnail_url}"/>
            <br><br>
            <p>Author: <img src="${newsDetail.author.img}" style="width: 30px; border-radius: 50%;"> ${newsDetail.author.name}</p>
            <p>Publish: ${newsDetail.author.published_date}</p>
            <p>Views: <i class="far fa-eye"></i> ${newsDetail.total_view}</p>
            <p>Rating: <i class="fas fa-star"></i> ${newsDetail.rating.number}</p>

            <p class="mt-3">${newsDetail.details}</p>
        `
    })
}