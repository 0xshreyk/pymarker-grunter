'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
export default function Home() {
  const codezoneRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    document.title = "Home";
    return () => {
    }
  }, [])

  return (
    <>
      <nav className="px-4 py-2 fixed top-0 z-[40] bg-gray-200 bg-opacity-[0.9] backdrop-blur-xl w-screen border-b flex">
        <div className="w-full px-4 py-2">
          <h1 className="font-bold text-2xl text-gray-600 hover:text-blue-600 cursor-pointer">Pymarker</h1>
        </div>
      </nav>
      <div className="fixed top-0 z-[30] pt-16 w-screen h-screen flex">
        <div className="w-full h-full border">

          <div className="w-full px-4 py-2 flex border-b">
            <div className="w-full p-2 text-start space-x-2">
              <span className="text-gray-600 text-2xl font-bold">Options</span>
              <select name="" id="" className="px-4 py-1 rounded-xl outline-none border">
                <option value="python">Python</option>
              </select>
            </div>
            <div className="w-full text-end">
              <button type="button" className="px-8 disabled:opacity-[0.8] active:bg-green-800 py-2 border bg-green-500 rounded text-white" onClick={(e: any) => {
                e.target.disabled = true;
                if (codezoneRef && codezoneRef.current) {
                  fetch('http://localhost:8080/api/run', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      code: `${codezoneRef.current.value}`
                    })
                  }).then((response) => {
                    return response.text();
                  }).then((text) => {
                    if (resultRef.current && resultRef) {
                      resultRef.current.innerText = text;
                      e.target.disabled = false;
                    }
                  })
                }

              }}>Run</button>
              <button type="button" className="px-8 active:bg-blue-800 py-2 border bg-blue-500 rounded text-white">Inspect</button>
            </div>
          </div>

          <div className="cellarea overflow-auto">
            <div className="w-full text-center p-2">
              <textarea name="codezone" ref={codezoneRef} id="codezone" rows={20} cols={80} className="border text-gray-900 p-2 font-semibold rounded-xl outline-white focus:outline-blue-600 outline outline-4 resize-none"></textarea>
            </div>

          </div>


        </div>
        <div className="w-full h-full border">

          <div className="w-full px-4 py-2 flex border-b">
            <div className="w-full p-2 text-start">
              <span className="text-gray-600 text-2xl font-bold">Output</span>
            </div>
            <div className="w-full text-end">
              <button type="button" className="px-8 active:bg-gray-800 py-2 border bg-gray-500 rounded text-white">Settings</button>
            </div>
          </div>
          <div className="w-full h-2/3 overflow-auto p-2">
            <div className="bg-gray-900 p-1 h-full rounded-xl overflow-y-scroll">
              <span id="output" className="text-gray-200 p-2 font-bold" ref={resultRef}>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
