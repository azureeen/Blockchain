import time
import hashlib
import json
from time import time

class Blockchain:
    def __init__(self):
        self.chain = []
        self.current_transactions = []
        self.new_block(previous_hash=self.hash(1), proof=100)

    def new_block(self, proof, previous_hash=None):
        # Creates a new block and adds it to the chain
        block = {
            'index': len(self.chain),
            'timestamp': time(),
            'transactions': self.current_transactions,
            'proof': proof,
            'previous_hash': previous_hash or self.hash(self.chain[-1]),
        }
        self.current_transactions = []
        self.chain.append(block)
        return block

    def new_transaction(self, sender, receiver, amount):
        # Adds a new transaction to the list of transactions
        transaction = {
            'sender': sender,
            'receiver': receiver,
            'amount': amount,
        }
        self.current_transactions.append(transaction)
        print('New transaction: ' + str(self.last_block))

        if len(self.current_transactions) == 10:
            # Once we have 10 transactions, create a new block
            proof = self.proof_of_work(self.last_block['proof'])
            self.new_block(proof)
            return self.last_block['index']
        else:
            return self.last_block['index'] + 1

    def proof_of_work(self, last_proof):
        # Proof of Work Algorithm: Find a number p' such that hash(pp') contains 4 leading zeroes
        proof = 0
        while self.valid_proof(last_proof, proof) is False:
            proof += 1
        return proof

    def valid_proof(self, last_proof, proof):
        guess = f'{last_proof}{proof}'.encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:4] == "0000"

    def show_last_10_transactions(self):
        # Check if the current transaction list has 10 or more transactions
        if len(self.current_transactions) >= 10:
            return self.current_transactions[-10:]
        else:
            # If less than 10, combine the last few transactions of the last block and the current transactions
            last_block_transactions = self.chain[-1]['transactions'] if self.chain else []
            needed_from_last_block = 10 - len(self.current_transactions)
            return last_block_transactions[-needed_from_last_block:] + self.current_transactions

    def tamper(self, transaction_id):
        # Alters a transaction in the list of transactions (for demonstration purposes)
        if transaction_id < len(self.current_transactions):
            self.current_transactions[transaction_id] = 'Tampered Transaction'

    def check_transaction(self, transaction_id):
        # Checks and returns a specific transaction by id
        return self.current_transactions[transaction_id]

    @property
    def last_block(self):
        # Returns the last block in the chain
        return self.chain[-1]

    @staticmethod
    def hash(block):
        # Hashes a block: Creates a SHA-256 hash of a block
        block_string = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()

