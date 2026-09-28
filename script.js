const reviewForm = document.getElementById("reviewForm");
const reviewsContainer = document.getElementById("reviewsContainer");

function addDefaultReviews() {

    if (!localStorage.getItem("campusReviewData")) {

        const defaultReviews = [

            {
                uniqueId: 10001,
                dishName: "Cheese Grilled Sandwich",
                locationName: "Main Canteen",
                costAmount: 60,
                starScore: 5,
                reviewMessage:
                    "Extremely cheesy and served crispy hot! This is one of the best snacks on campus.",
                dateLogged: new Date().toLocaleDateString()
            },

            {
                uniqueId: 10002,
                dishName: "Special Cutting Chai",
                locationName: "Nescafe Counter",
                costAmount: 15,
                starScore: 4,
                reviewMessage:
                    "Perfect refreshing tea for handling exam stress, though the queue can be long during lunch hours.",
                dateLogged: new Date().toLocaleDateString()
            }

        ];

        localStorage.setItem(
            "campusReviewData",
            JSON.stringify(defaultReviews)
        );
    }
}

addDefaultReviews();

if (reviewForm) {

    reviewForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const reviewObject = {

            uniqueId: Date.now(),

            dishName:
                document.getElementById("dishName").value.trim(),

            locationName:
                document.getElementById("location").value.trim(),

            costAmount:
                parseInt(
                    document.getElementById("price").value,
                    10
                ),

            starScore:
                parseInt(
                    document.getElementById("rating").value,
                    10
                ),

            reviewMessage:
                document.getElementById("reviewText").value.trim(),

            dateLogged:
                new Date().toLocaleDateString()
        };


        let reviews =
            JSON.parse(
                localStorage.getItem("campusReviewData")
            ) || [];

        reviews.unshift(reviewObject);

        localStorage.setItem(
            "campusReviewData",
            JSON.stringify(reviews)
        );

        alert("🎉 Review successfully added!");

        window.location.href = "index.html";

    });
}

if (reviewsContainer) {

    const reviews =
        JSON.parse(
            localStorage.getItem("campusReviewData")
        ) || [];


    reviewsContainer.innerHTML = "";

    if (reviews.length === 0) {

        reviewsContainer.innerHTML = `
            <div class="no-reviews">
                No food reviews yet. Be the first student to
                write a review!
            </div>
        `;

    }

    reviews.forEach(function (item) {

        const visualStars =
            "⭐".repeat(item.starScore);

        const reviewCard =
            document.createElement("div");

        reviewCard.classList.add("review-card");

        reviewCard.innerHTML = `

            <h3>
                ${item.dishName}

                <span class="price-tag">
                    ₹${item.costAmount}
                </span>
            </h3>

            <p class="meta-info">
                📍 ${item.locationName}
                |
                📅 ${item.dateLogged}
            </p>

            <div class="stars">
                ${visualStars}
            </div>

            <p class="review-desc">
                "${item.reviewMessage}"
            </p>

            <button
                class="delete-btn"
                onclick="deleteReview(${item.uniqueId})">

                Delete Post

            </button>
        `;


        reviewsContainer.appendChild(reviewCard);

    });

}

function deleteReview(id) {

    let reviews =
        JSON.parse(
            localStorage.getItem("campusReviewData")
        ) || [];

    reviews =
        reviews.filter(function (review) {

            return review.uniqueId !== id;

        });

    localStorage.setItem(
        "campusReviewData",
        JSON.stringify(reviews)
    );

    window.location.reload();
}

let reviews =
    JSON.parse(localStorage.getItem("campusReviewData")) || [];

reviews.unshift(reviewObject);

localStorage.setItem(
    "campusReviewData",
    JSON.stringify(reviews)
);
