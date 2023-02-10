import { useState } from 'react';
import ArticleCard from './ArticleCard';
import Pagination from './Pagination';
import { Bars } from 'react-loader-spinner';
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
        <div className="flex justify-center">
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
    </>
  );
}
