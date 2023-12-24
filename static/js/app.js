document.getElementById('submitTransaction').addEventListener('click', function() {
    const sender = document.getElementById('sender').value;
    const receiver = document.getElementById('receiver').value;
    const amount = document.getElementById('amount').value;

    if (!validateAmount(amount)) {
        event.preventDefault(); // Prevent form submission
        alert('Invalid amount. Please enter a number between 1 and 1000.');
        return false;
    }

    fetch('/transactions/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender, receiver, amount }),
    })
    .then(response => response.json())
    .then(data => {
        showToast(data.message, 'success');
        setTimeout(() => {
            updateBlockchainDisplay();
            updateLastTransactionsDisplay();
        }, 1000); // wait for 1 second before updating
        //alert(data.message);
        // Clear the form or add additional handling
        document.getElementById('sender').value = '';
        document.getElementById('receiver').value = '';
        document.getElementById('amount').value = '';
    })
    .catch((error) => {
        console.error('Error:', error);
        showToast('Transaction submission failed', 'error');
        // alert('Transaction submission failed');
    });
});

document.getElementById('amount').addEventListener('input', function() {
    const amount = this.value;
    if (!validateAmount(amount)) {
        this.classList.add('border-red-500'); // Highlight in red
        // Optionally, show a message or disable the submit button
    } else {
        this.classList.remove('border-red-500'); // Remove highlight
        // Optionally, hide the message or enable the submit button
    }
});

function validateAmount(amount) {
    return amount >= 1 && amount <= 1000;
}

function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');

    toast.className = `bg-${type === 'success' ? 'green' : 'red'}-500 text-white px-4 py-2 rounded-md mb-2`;
    toast.textContent = message;

    toastContainer.appendChild(toast);

    // Remove the toast after 3 seconds
    setTimeout(() => {
        toastContainer.removeChild(toast);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Add 10 amount input fields
    const amountsContainer = document.getElementById('amounts');
    for (let i = 0; i < 10; i++) {
        const amountInput = document.createElement('input');
        amountInput.type = 'number';
        amountInput.placeholder = `Amount ${i + 1}`;
        amountInput.className = 'px-3 py-2 border rounded mr-2 mb-2';
        amountInput.id = `amount${i}`;
        amountsContainer.appendChild(amountInput);
    }

    document.getElementById('submitBatch').addEventListener('click', function() {
        const sender = document.getElementById('batchSender').value;
        const receiver = document.getElementById('batchReceiver').value;

        for (let i = 0; i < 10; i++) {
            const amount = document.getElementById(`amount${i}`).value;

            fetch('/transactions/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sender, receiver, amount }),
            })
            .then(response => response.json())
            .then(data => {
                showToast(`Transaction ${i + 1}: ` + data.message, 'success');
                setTimeout(() => {
                    updateBlockchainDisplay();
                    updateLastTransactionsDisplay();
                }, 1000); // wait for 1 second before updating
            })
            .catch((error) => {
                showToast(`Transaction ${i + 1} submission failed`, 'error');
            });
        }
    });
});

function updateBlockchainDisplay() {
    fetch('/chain')
        .then(response => response.json())
        .then(data => {
            const blockchainSection = document.getElementById('blockchainDisplay');
            blockchainSection.innerHTML = '<h2 class="text-2xl font-bold mb-4">Blockchain</h2>'; // Clear existing content

            data.chain.forEach(block => {
                const blockDiv = document.createElement('div');
                blockDiv.className = 'mb-4 p-4 bg-white shadow rounded';
                blockDiv.innerHTML = `
                    <div class="block-header mb-2">
                        <strong class="text-lg font-semibold">Block ${block.index}</strong>
                        <div class="text-gray-700">Proof: ${block.proof}</div>
                        <div class="text-gray-600">Hash: ${block.previous_hash}</div>
                    </div>
                    <div class="transactions">
                        <strong class="text-md font-semibold">Transactions:</strong>
                        ${block.transactions.map(t => `
                            <div class="transaction mt-1 pl-4 border-l-2 border-blue-500">
                                <span class="text-blue-600">${t.sender}</span> ->
                                <span class="text-green-600">${t.receiver}</span> :
                                <span class="font-bold">${t.amount}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
                blockchainSection.appendChild(blockDiv);
            });
        });
}


function updateLastTransactionsDisplay() {
    fetch('/transactions/last')
        .then(response => response.json())
        .then(transactions => {
            const transactionsSection = document.getElementById('lastTransactionsDisplay');
            transactionsSection.innerHTML = '<h2 class="text-2xl font-bold mb-4">Last 10 Transactions</h2>'; // Clear existing content

            transactions.forEach(t => {
                const transactionDiv = document.createElement('div');
                transactionDiv.className = 'transaction mb-2 p-3 bg-white shadow rounded';
                transactionDiv.innerHTML = `
                    <span class="text-blue-600 font-semibold">${t.sender}</span>
                    <span class="mx-1">-></span>
                    <span class="text-green-600 font-semibold">${t.receiver}</span>
                    <span class="mx-1">:</span>
                    <span class="font-bold">${t.amount}</span>
                `;
                transactionsSection.appendChild(transactionDiv);
            });
        });
}





