import { useState } from 'react';
import ArticleCard from './ArticleCard';
import Pagination from './Pagination';
export default function FeedList(props) {
  return (
    <>
      {props.data ? (
        <div>
          <div className="article-list">
            {props.data.articles.map((article, i) => {
              return <ArticleCard article={article} key={i} />;
            })}
          </div>
          <Pagination
            articlesCount={props.data.articlesCount}
            updateOffset={props.updateOffset}
            offset={props.offset}
          />
        </div>
      ) : (
        <span>loading...</span>
      )}
    </>
  );
}
