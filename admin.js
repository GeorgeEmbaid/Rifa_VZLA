// Mostrar pagos pendientes
function loadPendingPayments() {
    const pendingPaymentsContainer = document.getElementById("pending-payments");
    const pendingPayment = JSON.parse(localStorage.getItem('pendingPayment'));
    
    if (pendingPayment) {
        let paymentDiv = document.createElement("div");
        paymentDiv.innerHTML = `
            <p>Usuario: ${pendingPayment.user}</p>
            <p>Rifa: ${pendingPayment.raffle}</p>
            <p>Números Seleccionados: ${pendingPayment.numbers.join(", ")}</p>
            <button onclick="approvePayment()">Aprobar Pago</button>
        `;
        pendingPaymentsContainer.appendChild(paymentDiv);
    }
}

function approvePayment() {
    const pendingPayment = JSON.parse(localStorage.getItem('pendingPayment'));
    
    if (pendingPayment) {
        const raffle = raffles[pendingPayment.raffle];
        raffle.selectedNumbers = raffle.selectedNumbers.concat(pendingPayment.numbers);

        // Remover pago pendiente
        localStorage.removeItem('pendingPayment');

        alert('Pago aprobado y números confirmados.');
        location.reload(); // Refrescar la página
    }
}

document.addEventListener("DOMContentLoaded", loadPendingPayments);
