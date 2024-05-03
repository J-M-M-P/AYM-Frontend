import React, { useState, useEffect } from "react";

const images = [
  "https://th.bing.com/th/id/OIP.u72WQ739A7q0yz4-DkCklgHaEj?w=291&h=180&c=7&r=0&o=5&pid=1.7",
  "https://th.bing.com/th/id/OIP.RE9k9rqVorwokoPI9h6UrAHaJJ?w=174&h=215&c=7&r=0&o=5&pid=1.7",
  "https://th.bing.com/th/id/OIP.E7vAG94YruqJSuitpiFQhAHaEA?w=319&h=180&c=7&r=0&o=5&pid=1.7",
  "https://th.bing.com/th/id/OIP.WcM6Of7nRCTdmaqnrJYvQgHaEK?w=293&h=180&c=7&r=0&o=5&pid=1.7",
  "https://th.bing.com/th/id/OIP.23GlTXVkWQzS0S2yJXGAXAHaEK?w=270&h=180&c=7&r=0&o=5&pid=1.7"
];

export default function ImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-fluid p-0">
      <div className="row">
        <div className="col">
          <img src={images[index]} alt={`Slide ${index + 1}`} className="img-fluid" style={{ maxHeight: "calc(100vh - 56px)", width: "200vh"}} />
        </div>
      </div>
    </div>
  );
}
