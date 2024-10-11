import toast from "react-hot-toast";
import { useState, FormEvent, ChangeEvent } from "react";
import css from "./SearchBar.module.css";
import { BsFillSearchHeartFill } from "react-icons/bs";
import React from "react";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [query, setQuery] = useState<string>("");

  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) {
      return toast.error("Cannot be empty", { duration: 2000 });
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleQuery}
        />
        <button className={css.button} type="submit">
          <BsFillSearchHeartFill />
        </button>
      </form>
    </header>
  );
}
