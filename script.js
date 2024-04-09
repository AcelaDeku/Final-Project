document.addEventListener("DOMContentLoaded", function () {
    const amiiboList = document.getElementById("amiibo-list");

    
    fetch("http://localhost:3000/amiibo")
        .then(response => response.json())
        .then(data => {

            data.forEach(amiibo => {
                const amiiboCard = createAmiiboCard(amiibo);
                amiiboList.appendChild(amiiboCard);
            });
        })
        .catch(error => console.error("Error fetching data:", error));

    
    function createAmiiboCard(amiibo) {
        const amiiboCard = document.createElement("div");
        amiiboCard.classList.add("amiibo-card");
        amiiboCard.innerHTML = `
            <img src="${amiibo.image}" alt="${amiibo.name}">
            <p>${amiibo.name}</p>
            <button class="purchase" data-amiibo-id="${amiibo.id}">Purchase</button>
            <textarea class="comment" placeholder="Leave a comment" style="display:none;"></textarea>
            <button class="submit-comment" style="display:none;">Submit Comment</button>
        `;

        // Add event listener for purchasing
        const purchaseButton = amiiboCard.querySelector(".purchase");
        purchaseButton.addEventListener("click", function () {
            if (purchaseButton.textContent === "Purchase") {
                purchaseButton.textContent = "In Cart";
                // Show comment section
                const commentSection = amiiboCard.querySelector(".comment");
                const submitButton = amiiboCard.querySelector(".submit-comment");
                commentSection.style.display = "block";
                submitButton.style.display = "block";
            } else {
                purchaseButton.textContent = "Purchase";
                // Hide comment section
                const commentSection = amiiboCard.querySelector(".comment");
                const submitButton = amiiboCard.querySelector(".submit-comment");
                commentSection.value = ""; // Clear comment textarea
                commentSection.style.display = "none";
                submitButton.style.display = "none";
            }
        });

        // Add event listener for submitting comment
        const submitCommentButton = amiiboCard.querySelector(".submit-comment"); 
        submitCommentButton.addEventListener("click", function () {
            const comment = amiiboCard.querySelector(".comment").value;
            // Send comment to server or perform any desired action
            console.log("Comment submitted for Amiibo ID:", amiibo.id, ":", comment);
        });

        return amiiboCard;
    }
});
