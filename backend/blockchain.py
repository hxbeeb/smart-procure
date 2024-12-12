import hashlib
import time

class Block:
    def __init__(self, index, timestamp, data, previous_hash):
        self.index = index
        self.timestamp = timestamp
        self.data = data  # Procurement benchmark details (product and price)
        self.previous_hash = previous_hash
        self.hash = self.calculate_hash()
    
    def calculate_hash(self):
        block_string = f"{self.index}{self.timestamp}{self.data}{self.previous_hash}"
        return hashlib.sha256(block_string.encode()).hexdigest()

class Blockchain:
    
    
    def __init__(self):
        self.chain = [self.create_genesis_block()]
    
    def create_genesis_block(self):
        # Set product and price as empty string in the genesis block
        return Block(0, time.time(), {"product": "", "price": "", "sources": "", "specs": ""}, "0")
    
    def get_latest_block(self):
        return self.chain[-1]
    
    def add_block(self, data):
        latest_block = self.get_latest_block()
        new_block = Block(len(self.chain), time.time(), data, latest_block.hash)
        self.chain.append(new_block)
    
    def is_chain_valid(self):
        for i in range(1, len(self.chain)):
            current_block = self.chain[i]
            previous_block = self.chain[i - 1]
            if current_block.hash != current_block.calculate_hash():
                return False
            if current_block.previous_hash != previous_block.hash:
                return False
        return True

# Example usage

# Initialize the blockchain
blockchain = Blockchain()

# Add a new block with procurement data
blockchain.add_block({"product": "Laptop", "price": "90000", "sources": "E-commerce Site", "specs": "Intel i7, 16GB RAM, 512GB SSD"})

# Add another block with different product data
blockchain.add_block({"product": "Smartphone", "price": "40000", "sources": "Online Store", "specs": "Snapdragon 888, 8GB RAM, 128GB Storage"})

# Check if the blockchain is valid
print("Is blockchain valid?", blockchain.is_chain_valid())

# Output the chain
for block in blockchain.chain:
    print(f"Block {block.index}: {block.data['product']} - {block.data['price']} - {block.timestamp}")
