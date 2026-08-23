const transactions = [
    {
        transaction_id: "TXN001",
        date: "2026-08-01",
        reference: "PAY001",
        description: "Office supplies",
        amount: 1250,
        type: "debit"
    },
    {
        transaction_id: "TXN002",
        date: "2026-08-01",
        reference: "PAY002",
        description: "Client payment",
        amount: 18500,
        type: "credit"
    },
    {
        transaction_id: "TXN003",
        date: "2026-08-02",
        reference: "PAY003",
        description: "Internet bill",
        amount: 1499,
        type: "debit"
    },
    {
        transaction_id: "TXN004",
        date: "2026-08-02",
        reference: "PAY004",
        description: "Software subscription",
        amount: 2499,
        type: "debit"
    },
    {
        transaction_id: "TXN005",
        date: "2026-08-03",
        reference: "PAY005",
        description: "Customer settlement",
        amount: 22000,
        type: "credit"
    },
    {
        transaction_id: "TXN006",
        date: "2026-08-03",
        reference: "PAY006",
        description: "Travel expense",
        amount: 3200,
        type: "debit"
    },
    {
        transaction_id: "TXN007",
        date: "2026-08-04",
        reference: "PAY007",
        description: "Marketing expense",
        amount: 5600,
        type: "debit"
    },
    {
        transaction_id: "TXN008",
        date: "2026-08-04",
        reference: "PAY008",
        description: "Client invoice",
        amount: 31500,
        type: "credit"
    },
    {
        transaction_id: "TXN009",
        date: "2026-08-05",
        reference: "PAY009",
        description: "Cloud hosting",
        amount: 4200,
        type: "debit"
    },
    {
        transaction_id: "TXN010",
        date: "2026-08-05",
        reference: "PAY010",
        description: "Vendor payment",
        amount: 7800,
        type: "debit"
    },
    {
        transaction_id: "TXN011",
        date: "2026-08-06",
        reference: "PAY011",
        description: "Service revenue",
        amount: 27000,
        type: "credit"
    },
    {
        transaction_id: "TXN012",
        date: "2026-08-06",
        reference: "PAY012",
        description: "Equipment purchase",
        amount: 9500,
        type: "debit"
    }
];

const bankRecords = [
    {
        bank_id: "BANK001",
        date: "2026-08-01",
        reference: "PAY001",
        description: "Office supplies",
        amount: 1250,
        type: "debit"
    },
    {
        bank_id: "BANK002",
        date: "2026-08-01",
        reference: "PAY002",
        description: "Client payment",
        amount: 17500,
        type: "credit"
    },
    {
        bank_id: "BANK003",
        date: "2026-08-02",
        reference: "PAY003",
        description: "Internet bill",
        amount: 1499,
        type: "debit"
    },
    {
        bank_id: "BANK004",
        date: "2026-08-02",
        reference: "PAY004",
        description: "Software subscription",
        amount: 2499,
        type: "debit"
    },
    {
        bank_id: "BANK005",
        date: "2026-08-03",
        reference: "PAY005",
        description: "Customer settlement",
        amount: 22000,
        type: "credit"
    },
    {
        bank_id: "BANK006",
        date: "2026-08-03",
        reference: "PAY006",
        description: "Travel expense",
        amount: 3200,
        type: "debit"
    },
    {
        bank_id: "BANK007",
        date: "2026-08-04",
        reference: "PAY007",
        description: "Marketing expense",
        amount: 5600,
        type: "debit"
    },
    {
        bank_id: "BANK008",
        date: "2026-08-04",
        reference: "PAY008",
        description: "Client invoice",
        amount: 31500,
        type: "credit"
    },
    {
        bank_id: "BANK009",
        date: "2026-08-05",
        reference: "PAY009",
        description: "Cloud hosting",
        amount: 4200,
        type: "debit"
    },
    {
        bank_id: "BANK010",
        date: "2026-08-05",
        reference: "PAY010",
        description: "Vendor payment",
        amount: 7800,
        type: "debit"
    },
    {
        bank_id: "BANK011",
        date: "2026-08-06",
        reference: "PAY011",
        description: "Service revenue",
        amount: 27000,
        type: "credit"
    },
    {
        bank_id: "BANK012",
        date: "2026-08-06",
        reference: "PAY012",
        description: "Equipment purchase",
        amount: 9500,
        type: "debit"
    }
];

function reconcileTransactions(transactions, bankRecords) {
    const results = [];

    transactions.forEach(transaction => {

        const matches = bankRecords.filter(
            bank => bank.reference === transaction.reference
        );

        if (matches.length === 0) {
            results.push({
                transaction_id: transaction.transaction_id,
                reference: transaction.reference,
                status: "exception",
                reason: "No matching bank record found"
            });
            return;
        }

        const bankRecord = matches[0];
        const reasons = [];

        if (bankRecord.amount !== transaction.amount) {
            reasons.push("Amount mismatch");
        }

        if (bankRecord.date !== transaction.date) {
            reasons.push("Date mismatch");
        }

        if (bankRecord.type !== transaction.type) {
            reasons.push("Transaction type mismatch");
        }

        if (reasons.length === 0) {
            results.push({
                transaction_id: transaction.transaction_id,
                reference: transaction.reference,
                status: "matched",
                reason: "Transaction matched successfully"
            });
        } else {
            results.push({
                transaction_id: transaction.transaction_id,
                reference: transaction.reference,
                status: "exception",
                reason: reasons.join(", ")
            });
        }
    });

    return results;
}

function getReconciliationSummary(results) {
    const total = results.length;

    const matched = results.filter(
        item => item.status === "matched"
    ).length;

    const exceptions = results.filter(
        item => item.status === "exception"
    ).length;

    const matchRate = total === 0
        ? 0
        : ((matched / total) * 100).toFixed(2);

    return {
        total,
        matched,
        exceptions,
        matchRate
    };
}

const results = reconcileTransactions(transactions, bankRecords);
const summary = getReconciliationSummary(results);

console.log("Reconciliation Results:", results);
console.log("Reconciliation Summary:", summary);
