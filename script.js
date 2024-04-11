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
        const price = Math.floor(Math.random() * (1500 - 400 + 1)) + 400; 
        amiiboCard.innerHTML = `
            <img src="${amiibo.image}" alt="${amiibo.name}">
            <p>${amiibo.name}</p>
            <button class="purchase" data-amiibo-id="${amiibo.id}">KSh ${price}</button> <!-- Displaying random price -->
            <textarea class="comment" placeholder="Leave a comment" style="display:none;"></textarea>
            <button class="submit-comment" style="display:none;">Submit Comment</button>
        `;

        
        const purchaseButton = amiiboCard.querySelector(".purchase");
        purchaseButton.addEventListener("click", function () {
            if (purchaseButton.textContent === "Purchase") {
                purchaseButton.textContent = "In Cart";
                
                const commentSection = amiiboCard.querySelector(".comment");
                const submitButton = amiiboCard.querySelector(".submit-comment");
                commentSection.style.display = "block";
                submitButton.style.display = "block";
            } else {
                purchaseButton.textContent = "Purchase";
                
                const commentSection = amiiboCard.querySelector(".comment");
                const submitButton = amiiboCard.querySelector(".submit-comment");
                commentSection.value = ""; 
                commentSection.style.display = "none";
                submitButton.style.display = "none";
            }
        });

        
        const submitCommentButton = amiiboCard.querySelector(".submit-comment");
        submitCommentButton.addEventListener("click", function () {
            const comment = amiiboCard.querySelector(".comment").value;
            
            console.log("Comment submitted for Amiibo ID:", amiibo.id, ":", comment);
        });

        return amiiboCard;
    }
});
