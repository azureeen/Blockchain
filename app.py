# import time
# import hashlib
# import json
# from time import time
# from pygments.formatters import HtmlFormatter
# from flask_cors import CORS

import redis

from flask import Flask, render_template, jsonify, request
from Blockchain import Blockchain


app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)
# CORS(app)


# Create an instance of the Blockchain
blockchain = Blockchain()


@app.route('/')
def launch():
    return render_template('blockchain.html')


@app.route('/documentation')
def show_documentation():
    return render_template('documentation.html')



@app.route('/getting-started')
def getting_started():
    return render_template('getting-started.html')


@app.route('/transactions/new', methods=['POST'])
def new_transaction():
    values = request.get_json()
    required = ['sender', 'receiver', 'amount']
    if not all(k in values for k in required):
        return jsonify({'message': 'Missing values'}), 400

    index = blockchain.new_transaction(values['sender'], values['receiver'], values['amount'])
    return jsonify({'message': f'Transaction will be added to Block {index}'}), 201


@app.route('/chain', methods=['GET'])
def full_chain():
    return jsonify({'chain': blockchain.chain, 'length': len(blockchain.chain)}), 200


@app.route('/transactions/last', methods=['GET'])
def get_last_transactions():
    # Use the existing show_last_10_transactions method from the Blockchain class
    transactions = blockchain.show_last_10_transactions()
    return jsonify(transactions), 200



if __name__ == '__main__':
    app.run()

