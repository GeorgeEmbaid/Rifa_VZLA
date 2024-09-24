let raffles = {
    rifa1: { name: "Rifa 1 (Selección Manual)", type: "manual", availableNumbers: Array.from({ length: 100 }, (_, i) => i + 1), selectedNumbers: [] },
    rifa2: { name: "Rifa 2 (Asignación Aleatoria)", type: "aleatorio", availableNumbers: Array.from({ length: 50 }, (_, i) => i + 1), selectedNumbers: [] }
};

let selectedNumbers = [];
let paymentApproved = false;

// Inicializar rifas
const raffleSelect = document.getElementById("raffleId");
for (let raffle in raffles) {
    let option = document.createElement("option");
    option.value = raffle;
    option.text = raffles[raffle].name;
    raffleSelect.appendChild(option);
}

// Actualizar los números según el tipo de rifa
raffleSelect.addEventListener("change", updateNumbers);

function updateNumbers() {

    const selectedRaffle = raffleSelect.value;
    const raffleType = raffles[selectedRaffle].type;
    const numbersContainer = document.getElementById("numbers-container");
    const randomButton = document.getElementById("random-number-btn");
    numbersContainer.innerHTML = ''; // Limpiar números
    randomButton.style.display = raffleType === "aleatorio" ? "block" : "none";

    if (raffleType === "manual") {
        // Mostrar números disponibles para selección manual
        raffles[selectedRaffle].availableNumbers.forEach(number => {
            let numberDiv = document.createElement("div");
            numberDiv.textContent = number;
            numberDiv.classList.add("number");
            if (raffles[selectedRaffle].selectedNumbers.includes(number)) {
                numberDiv.classList.add("unavailable");
            }
            numberDiv.addEventListener("click", () => selectNumber(number));
            numbersContainer.appendChild(numberDiv);
        });

        const formSubmit = document.getElementById("form-btn-submit");
        if (selectNumber.length > 0) {
            formSubmit.removeAttribute("hidden")
        } else {
            formSubmit.setAttribute("hidden", true)
        }

    }
}

function selectNumber(number) {

    const selectedRaffle = raffleSelect.value;

    if (!selectedNumbers.includes(number)) {
        selectedNumbers.push(number);
        updateNumbers(); // Actualizar la lista visual
    }

}

document.getElementById("random-number-btn").addEventListener("click", function () {
    const selectedRaffle = raffleSelect.value;
    const availableNumbers = raffles[selectedRaffle].availableNumbers.filter(n => !raffles[selectedRaffle].selectedNumbers.includes(n));

    if (availableNumbers.length > 0) {
        const randomNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
        selectedNumbers.push(randomNumber);
        updateNumbers();
    } else {
        alert("No hay números disponibles.");
    }
});

// Simular proceso de pago
document.getElementById("raffle-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const paymentBtn = document.getElementById("payment-btn");
    paymentBtn.style.display = 'block';
});

document.getElementById("payment-btn").addEventListener("click", function () {
    const paymentStatus = document.getElementById("payment-status");

    paymentStatus.textContent = "Pago pendiente de aprobación del administrador.";

    // Simular envío de datos para aprobación
    let paymentInfo = {
        user: document.getElementById("firstName").value + " " + document.getElementById("lastName").value,
        raffle: raffleSelect.value,
        numbers: selectedNumbers
    };

    localStorage.setItem('pendingPayment', JSON.stringify(paymentInfo));

    paymentStatus.textContent = "Pago enviado. Esperando aprobación.";
});
