const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*', // CHANGE THIS FOR PRODUCTION! Example: 'https://farzanehsedarati610.github.io'
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(bodyParser.json());

// --- Mock Financial Ledger (FOR DEMONSTRATION ONLY - NO BALANCE CHECK) ---
// In a real application, this would be a secure database mapping hashes to real accounts.
// The concept of 'infinite balance' here means we're bypassing actual fund verification.
const mockFinancialLedger = {
    "65a6745f084e7af17e1715ae9302cc14820e331af610badd3d9805cb9cd3504e": {
        description: "Hash X Account"
    },
    "ca4ba96c58580a9d2ddbc99d993cf0a703c366c85f608a8d9d6b3890": {
        description: "Hash A Account"
    },
    "3842daf9315978e904e20579f52913aec3274e22b09c4fa9ddd2a2b7": {
        description: "Hash B Account"
    },
    "a23b0d1d1e8a721623a1a85b64a353fface595030eb41ba33d8fe4a554ee59d5": {
        description: "Hash C Account"
    },
    "dc5b25606dc0c977dec5aa13d61946b470066976aefcf390c40ffaff75d9a186": {
        description: "Hash D Account"
    },
    "8470faf251f8c3c8672718cbd982f942ce649bb69714794eb8b1de934cb59d52": {
        description: "Hash E Account"
    },
    "663e295cc4399e9a551571eebd7a4db0d6f3662c87eb18d0e0a2a4b67f07145c": {
        description: "Hash F Account"
    },
    "3fc8241058ee913bfe277e4652abc04822b33aa939d6f65084aae02e917eeff1": {
        description: "Hash G Account"
    },
    "d71d4b23cb2ec49e7b0ff31fd563b5ffdf4899dbecebd599711213ff37e52bd9": {
        description: "Hash H Account"
    },
    "c6f44160cdd0479af696b81abdd1982d36e08263322e4c5b07bf27b5623b29d5": {
        description: "Hash I Account"
    },
    "26efc86c0269a129bd183480f947c7424a48f9523156a8a70d3dfe5ed7103aab": {
        description: "Hash J Account"
    },
    "7c7228137410dc76b4925dfcc729fdc92cfd94a026022111c1a502d6240580fb": {
        description: "Hash K Account"
    },
    "029ff25d832b97b9d55fc93078dac6552a61be7a": {
        description: "Hash L Account (SHA1-like)"
    },
    "94e02b38274bfc81e66ea2e90f57f62faa2b5ae13e15bf89a3fc113881871e4e": {
        description: "Hash M Account"
    },
    "3e153176e6fcf704b9ebdb6cce4818ea6f276bcb42d4db72d6207df3434f3344": {
        description: "Hash N Account"
    },
    "b818d555523674878848476ee8ffc99cff1c95529e3cc450511672922a4a5736": {
        description: "Hash O Account"
    },
    "7f1c56bf38070c1637e6b0ce91fe5ab1ab8474be6dab8be2a3bf8eadb771e062": {
        description: "Hash P Account"
    },
    "c1e586cecb4f643611e882c6b3638f2d51a7b6ccd4f647c305351fccde94b9b4": {
        description: "Hash Q Account"
    },
    "20f586474bf292d420bb8c5139bfb8224cda900280ffa2c95b45a33eb98e96cd": {
        description: "Hash R Account"
    }
};

app.post('/api/transfer-funds', async (req, res) => {
    const { source_sha256_account, amount, destination_routing_number, destination_account_number } = req.body;

    console.log(`Received transfer request:`);
    console.log(`  Source Hash: ${source_sha256_account}`);
    console.log(`  Amount: ${amount}`);
    console.log(`  Destination Routing: ${destination_routing_number}`);
    console.log(`  Destination Account: ${destination_account_number}`);

    // --- 1. Server-Side Input Validation ---
    if (!source_sha256_account || typeof source_sha256_account !== 'string' || (source_sha256_account.length !== 64 && source_sha256_account.length !== 40)) {
        return res.status(400).json({ status: 'error', message: 'Invalid source SHA-256/SHA-1 account format.' });
    }
    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ status: 'error', message: 'Invalid transfer amount. Must be a positive number.' });
    }
    if (!destination_routing_number || typeof destination_routing_number !== 'string' || !/^\d{9}$/.test(destination_routing_number)) {
        return res.status(400).json({ status: 'error', message: 'Invalid routing number. Must be 9 digits.' });
    }
    if (!destination_account_number || typeof destination_account_number !== 'string' || !/^\d+$/.test(destination_account_number)) {
        return res.status(400).json({ status: 'error', message: 'Invalid account number. Must contain only digits.' });
    }

    // --- 2. Lookup Source "Account" in Mock Ledger (for existence, not balance) ---
    const sourceAccountDescription = mockFinancialLedger[source_sha256_account];

    if (!sourceAccountDescription) {
        console.warn(`Attempted transfer from unknown hash: ${source_sha256_account}`);
        return res.status(404).json({ status: 'error', message: 'Source account not found or invalid.' });
    }

    // --- 3. Simulate External Financial API Call (THE CRITICAL PART) ---
    // This is the placeholder where you would integrate with a real payment processing service.
    // Since balances are effectively infinite, we assume this step will proceed
    // unless there's an issue with the external service itself or routing/account details.
    console.log(`Simulating transfer from ${source_sha256_account} to bank...`);

    try {
        await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate a 3-second API call

        const transactionId = `TRXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        console.log(`Transfer simulation successful. Generated internal transaction ID: ${transactionId}`);

        // --- 4. Send Success Response to Frontend ---
        res.json({
            status: 'success',
            message: 'Transfer process initiated successfully (simulated). Funds assumed available.',
            transaction_id: transactionId,
            transferred_amount: amount,
            // new_source_balance is no longer applicable as balances are infinite
        });

    } catch (externalApiError) {
        // --- 5. Handle Errors from External API (if any occurred during simulation) ---
        console.error(`Error during simulated external API call for ${source_sha256_account}:`, externalApiError.message);
        res.status(500).json({
            status: 'error',
            message: 'Failed to complete transfer due to a backend processing error.',
            details: externalApiError.message
        });
    }
});

app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
