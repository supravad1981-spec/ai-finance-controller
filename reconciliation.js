async function loadFinanceData() {
    try {
        const transactionResponse = await fetch("data/transactions.json");
        const bankResponse = await fetch("data/bank_records.json");

        const transactions = await transactionResponse.json();
        const bankRecords = await bankResponse.json();

        return reconcileTransactions(transactions, bankRecords);

    } catch (error) {
        console.error("Could not load finance data:", error);
        return [];
    }
}


function reconcileTransactions(transactions, bankRecords) {
    const results = [];

    transactions.forEach(transaction => {

        const matches = bankRecords.filter(bank =>
            bank.reference === transaction.reference
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

        if (
            bankRecord.amount === transaction.amount &&
            bankRecord.date === transaction.date &&
            bankRecord.type === transaction.type
        ) {

            results.push({
                transaction_id: transaction.transaction_id,
                reference: transaction.reference,
                status: "matched",
                reason: "Transaction matched successfully"
            });

        } else {

            let reason = [];

            if (bankRecord.amount !== transaction.amount) {
                reason.push("Amount mismatch");
            }

            if (bankRecord.date !== transaction.date) {
                reason.push("Date mismatch");
            }

            if (bankRecord.type !== transaction.type) {
                reason.push("Transaction type mismatch");
            }

            results.push({
                transaction_id: transaction.transaction_id,
                reference: transaction.reference,
                status: "exception",
                reason: reason.join(", ")
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
