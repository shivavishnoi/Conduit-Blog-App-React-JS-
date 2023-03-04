import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ArticleCard({ article }) {
  const slugLength = article.slug.length - 7;
  let slug = article.slug.split('').splice(0, slugLength).join('');
  slug = slug.split('-').join(' ');
  return (
    <>
      <article className="article-card padding-2">
        <div className="article-card-header flex justify-between padding-3">
          <div className="author-info flex">
            <Link to={`/profile/${article.author.username}`}>
              <img src={article.author.image} />
            </Link>

            <div>
              <h6>
                <Link to={`/profile/${article.author.username}`}>
                  {article.author.username}{' '}
                </Link>
              </h6>

              <span className="date">
                {article.createdAt.split('').slice(0, 10)}
              </span>
            </div>
          </div>
          <div>
            <span className="article-likes">
              &#9829; {article.favoritesCount}
            </span>
          </div>
        </div>
        <Link to={`/articles/${article.slug}`}>
          <h4 className="padding-3">{slug}</h4>
          <p>{article.description}</p>
        </Link>
        <div className="article-card-footer flex justify-between padding-3">
          <Link to={`/articles/${article.slug}`}>
            <span>Read More..</span>
          </Link>
          <Link to={`/articles/${article.slug}`}>
            {article.tagList.map((tag) => {
              return (
                <span className="article-footer-tag" key={tag}>
                  {tag}
                </span>
              );
            })}
          </Link>
        </div>
      </article>
      <hr />
    </>
  );
}
