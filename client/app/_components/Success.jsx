"use client"
import React from "react";
import { useState, useEffect } from "react";

function Success({ message }) {
  const [show, setshow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setshow(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return show ? (
 
    <div role="alert" class=" fixed right-1 top-20   max-h-40 rounded-md border border-gray-300 bg-white p-4 shadow-sm w-1/3">
  <div class="flex items-start gap-10">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class=" w-6 h-6 text-green-600"
    >
      <path 
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>

    <div class="flex  flex-col gap-4">
      <strong class="font-medium text-gray-900"> Changes saved </strong>

      <p class="text-sm text-gray-700">{message}</p>
    </div>

    
  </div>
</div>
  ) : null;
}

export default Success;
