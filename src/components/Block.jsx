import React, { useState, useEffect } from "react";
import axios from "axios";

const Block = () => {
    const [benchmarks, setBenchmarks] = useState([]);
    const [newBenchmark, setNewBenchmark] = useState({
        product: "",
        specs: "",
        price: "",
        sources: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchChain = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/get_chain");
            console.log(response.data); // Log the entire response to inspect its structure
    
            // Make sure the response contains the correct fields
            setBenchmarks(response.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };
    

    const addBenchmark = async () => {
        // Basic validation
        if (!newBenchmark.product || !newBenchmark.specs || !newBenchmark.price || !newBenchmark.sources) {
            setError("Please fill all fields.");
            return;
        }
        try {
            setLoading(true);
            await axios.post("http://127.0.0.1:5000/add_benchmark", newBenchmark);
            setNewBenchmark({ product: "", specs: "", price: "", sources: "" });
            fetchChain();
            setError(null); // Clear any previous errors
        } catch (error) {
            setError("Failed to add benchmark. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChain();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex flex-col items-center p-8 text-white">
            <h1 className="text-4xl font-bold mb-6">Blockchain for Benchmarking</h1>

            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-gray-800 space-y-4">
                {error && <div className="text-red-500 text-center">{error}</div>}
                <input
                    type="text"
                    placeholder="Product Name"
                    value={newBenchmark.product}
                    onChange={(e) => setNewBenchmark({ ...newBenchmark, product: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                    type="text"
                    placeholder="Specifications"
                    value={newBenchmark.specs}
                    onChange={(e) => setNewBenchmark({ ...newBenchmark, specs: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newBenchmark.price}
                    onChange={(e) => setNewBenchmark({ ...newBenchmark, price: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                    type="text"
                    placeholder="Sources"
                    value={newBenchmark.sources}
                    onChange={(e) => setNewBenchmark({ ...newBenchmark, sources: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <button
                    onClick={addBenchmark}
                    disabled={loading}
                    className={`w-full py-3 ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500'} text-white font-bold rounded-lg shadow-lg transition-all duration-300`}
                >
                    {loading ? 'Adding...' : 'Add Benchmark'}
                </button>
            </div>

            <h2 className="text-2xl font-semibold mt-8">Benchmarks:</h2>
            <ul className="w-full max-w-3xl mt-4 space-y-4">
            {benchmarks.map((block, index) => (
    <li key={index} className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
        {/* Check if block.data exists before accessing its properties */}
        <p className="font-semibold">Product: <span className="font-normal">{block.data ? block.data.product : "N/A"}</span></p>
        <p className="font-semibold">Specifications: <span className="font-normal">{block.data ? block.data.specs : "N/A"}</span></p>
        <p className="font-semibold">Price: <span className="font-normal">{block.data ? block.data.price : "N/A"}</span></p>
        <p className="font-semibold">Sources: <span className="font-normal">{block.data ? block.data.sources : "N/A"}</span></p>
        <p className="text-sm text-gray-500">Hash: {block.hash}</p>
    </li>
))}

            </ul>
        </div>
    );
};

export default Block;
