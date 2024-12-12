from flask import Flask, request, jsonify
from blockchain import Blockchain
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
blockchain = Blockchain()

@app.route('/add_benchmark', methods=['POST'])
def add_benchmark():
    data = request.get_json()
    blockchain.add_block(data)
    return jsonify({"message": "Benchmark added to blockchain"}), 200

@app.route('/get_chain', methods=['GET'])
def get_chain():
    chain_data = [
        {
            "index": block.index,
            "data": block.data,
            "hash": block.hash,
            "previous_hash": block.previous_hash,
            "timestamp": block.timestamp
        }
        for block in blockchain.chain
    ]
    return jsonify(chain_data), 200

@app.route('/validate_chain', methods=['GET'])
def validate_chain():
    is_valid = blockchain.is_chain_valid()
    return jsonify({"valid": is_valid}), 200

if __name__ == '__main__':
    app.run(debug=True)
