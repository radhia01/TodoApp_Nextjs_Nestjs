"use client"
import React from "react";
import { useState, useEffect } from "react";

function Error({ message }) {
  const [show, setshow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setshow(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return show ? (
    <div class=" fixed right-1 top-20 bottom-5 flex  text-sm justify-start text-red-600 font-bold h-10  bg-white border-2  min-w-52 rounded-2xl px-14 py-4 items-center   max-w-200">
      {message}
    </div>
  ) : null;
}

export default Error;
