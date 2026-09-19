"use client";

import { Suspense, useState } from "react";

import HomeworkList from "./List";

const MyHomeworks = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchClick = () => {
    setSearchText("");
  };

  return (
    <div>
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          className="bg-white font-[14px] text-black px-4 py-1"
        />
        <button
          className="cursor-pointer bg-sky-500 px-4 py-1 text-white"
          disabled={!searchText.length}
          onClick={handleSearchClick}
        >
          Buscar
        </button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeworkList />
      </Suspense>
    </div>
  );
};

export default MyHomeworks;
