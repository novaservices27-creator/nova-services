function scrollToBooking() {
  document.getElementById("bookingForm").scrollIntoView({
    behavior: 'smooth'
  });
}

document.getElementById('bookingForm').addEventListener('submit', function(e){
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('clientPhone').value;
  const area = document.getElementById('area').value;
  const propertyType = document.getElementById('propertyType').value; // 👈 الجديد
  const service = document.getElementById('service').value;
  const address = document.getElementById('address').value;

  let message = `حجز جديد:\n`;
  message += `الاسم: ${name}\n`;
  message += `الهاتف: ${phone}\n`;
  message += `نوع المنشأة: ${propertyType}\n`; // 👈 الجديد
  message += `مساحة الشقة: ${area} متر\n`;
  message += `الخدمة: ${service}\n`;
  message += `العنوان: ${address}`;

  const url = `https://wa.me/201515820191?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});
function openReviewForm(){
  document.getElementById("reviewForm").classList.remove("hidden");
}

function closeReviewForm(){
  document.getElementById("reviewForm").classList.add("hidden");
}

// تحميل الكومنتات عند فتح الصفحة
window.addEventListener("load", function () {
  const saved = JSON.parse(localStorage.getItem("reviews")) || [];

  saved.forEach(addReviewToDOM);
});

// إضافة كومنت جديد
function addReview(){
  const name = document.getElementById("reviewName").value;
  const text = document.getElementById("reviewText").value;

  if(name === "" || text === "") return;

  const review = { name, text };

  // حفظ في LocalStorage
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.unshift(review);
  localStorage.setItem("reviews", JSON.stringify(reviews));

  // إضافته مباشرة في الصفحة
  addReviewToDOM(review);

  document.getElementById("reviewName").value = "";
  document.getElementById("reviewText").value = "";
  closeReviewForm();
}

// إنشاء الكارت في الصفحة
function addReviewToDOM(review){
  const container = document.querySelector(".reviews-grid");

  const card = document.createElement("div");
  card.className = "review-card";

  card.innerHTML = `
    <p>${review.text}</p>
    <span>— ${review.name}</span>
  `;

  container.prepend(card);
}