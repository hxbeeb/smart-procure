// import React, { useEffect, useState } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import axios from "axios";

// const PriceLineGraph = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/prices");
//         // Parse data: convert price to number and structure it for the graph
//         const formattedData = response.data.map((item) => ({
//           title: item.title,
//           price: parseFloat(item.price.replace(/[^\d.-]/g, "")), // Remove ₹ or other characters
//         }));
//         setData(formattedData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2>Price Line Graph</h2>
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="title" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default PriceLineGraph;
// import React, { useEffect, useState } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import axios from "axios";

// const PriceLineGraph = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/prices");
        
//         // Format the data for the graph
//         const formattedData = response.data.map((item) => ({
//           timestamp: item.timestamp, // Use the timestamp for the X axis
//           price: parseFloat(item.price.replace(/[^\d.-]/g, "")), // Remove any non-numeric characters from the price
//         }));

//         setData(formattedData); // Set the formatted data to state
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2>Price Line Graph</h2>
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="timestamp" /> {/* Set X-axis to display timestamp */}
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="price"
//             stroke="#8884d8"
//             activeDot={{ r: 8 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default PriceLineGraph;












import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";

const PriceLineGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/prices");
        // Parse data: convert price to number and structure it for the graph
        const formattedData = response.data.map((item) => ({
          title: item.title,
          price: parseFloat(item.price.replace(/[^\d.-]/g, "")), // Remove ₹ or other characters
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Price Line Graph</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


export default PriceLineGraph;