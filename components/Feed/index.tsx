'use client'

import { useState, useEffect, useCallback, ChangeEvent } from "react";
import FeedList from "./FeedList";
import { IPost } from "@interfaces/index";

const Feed = () => {
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [searchedResults, setSearchedResults] = useState<IPost[]>([]);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch("/api/prompt");
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data: IPost[] = await response.json();
      setAllPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  const filterPrompts = useCallback((searchText: string): IPost[] => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  }, [allPosts]);

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  }, [searchTimeout, filterPrompts]);

  const handleTagClick = useCallback((tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  }, [filterPrompts]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <FeedList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <FeedList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
