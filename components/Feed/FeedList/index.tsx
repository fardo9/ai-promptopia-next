'use client'

import React from 'react';
import { IFeedListProps } from '../interfaces';
import FeedCard from './FeedCard';

const FeedList: React.FC<IFeedListProps> = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <FeedCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default FeedList;
