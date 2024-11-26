const cardsContainer = document.getElementById("cards-container");
const message = document.getElementById("message");
const confettiCanvas = document.getElementById("confetti");
let cards = [
    { text: "Hoy", order: 1 },
    { text: "30", order: 2 },
    { text: "de", order: 3 },
    { text: "Noviembre,", order: 4 },
    { text: "¿puedo", order: 5 },
    { text: "ser", order: 6 },
    { text: "tu", order: 7 },
    { text: "novio?", order: 8 }
];
let selectedOrder = [];
let correctOrder = cards.map(card => card.order);

// Barajar las cartas
cards = cards.sort(() => Math.random() - 0.5);

// Crear las cartas
cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.order = card.order;
    cardElement.textContent = card.text;
    cardElement.style.order = index;

    cardElement.addEventListener("click", () => {
        if (selectedOrder.includes(card.order)) return;

        cardElement.classList.add("flipped");
        selectedOrder.push(card.order);

        // Verificar si el orden es correcto
        if (selectedOrder.length === correctOrder.length) {
            if (JSON.stringify(selectedOrder) === JSON.stringify(correctOrder)) {
                showConfetti();
                message.textContent = "¡Gracias por aceptar! ❤️";
                message.style.visibility = "visible";
            } else {
                setTimeout(resetCards, 1000);
            }
        }
    });

    cardsContainer.appendChild(cardElement);
});

// Restablecer las cartas
function resetCards() {
    document.querySelectorAll(".card").forEach(card => card.classList.remove("flipped"));
    selectedOrder = [];
}

// Mostrar confeti
function showConfetti() {
    const ctx = confettiCanvas.getContext("2d");
    const confettiColors = ["#f8a5c2", "#786fa6", "#f7d794"];
    const particles = Array.from({ length: 100 }, () => ({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height - confettiCanvas.height,
        r: Math.random() * 4 + 1,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        speed: Math.random() * 3 + 2
    }));

    function drawConfetti() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.y += p.speed;
            if (p.y > confettiCanvas.height) p.y = -p.r;
        });
        requestAnimationFrame(drawConfetti);
    }

    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    drawConfetti();
}
