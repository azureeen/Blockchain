# Blockchain Implementation in Flask

## Design Document

### Block Structure
Each block in the blockchain contains the following fields:

- `index`: The position of the block in the chain.
- `timestamp`: The time at which the block was created.
- `transactions`: A list of transactions included in the block.
- `proof`: The proof of work associated with the block.
- `previous_hash`: The hash of the previous block in the chain.

### Cryptographic Functions
The blockchain uses the following cryptographic functions:

- **SHA-256 Hashing**: Used for generating a unique hash for each block. This ensures the integrity and immutability of the blockchain.
- **Proof of Work (PoW)**: A simple algorithm that requires computational effort to validate new blocks (finding a number that produces a hash with 4 leading zeros).

## Implemented Commands

1. **Adding a Transaction**
   - Command: `blockchain.new_transaction(sender, receiver, amount)`
   - Usage: Adds a new transaction to the blockchain. A transaction contains a sender, a receiver, and the transaction amount.

2. **Creating a New Block**
   - Automatically triggered when the number of transactions reaches 10.
   - Utilizes the proof of work algorithm to validate the block.

3. **Checking a Transaction**
   - Command: `blockchain.check_transaction(transaction_id)`
   - Usage: Returns the details of a transaction given its ID.

4. **Displaying Last 10 Transactions**
   - Command: `blockchain.show_last_10_transactions()`
   - Usage: Retrieves the last 10 transactions from the blockchain.

5. **Altering a Transaction**
   - Command: `blockchain.tamper(transaction_id)`
   - Usage: Alters the specified transaction. This is for demonstration purposes only and would not be a feature in a secure, real-world blockchain.

6. **Blockchain Hashing**
   - Command: `Blockchain.hash(block)`
   - Usage: Generates a SHA-256 hash for a given block.

