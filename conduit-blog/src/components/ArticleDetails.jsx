import { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { Link, withRouter } from 'react-router-dom';
import { articlesUrl } from '../utils/links';
function ArticleDetails(props) {
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    fetch(`${articlesUrl}/${props.match.params.slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) => {
        setArticle(data.article);
      })
      .catch((err) => {
        setError('Not able to fetch required data');
      });
  }, []);
  if (error) {
    return (
      <div className="text-center">
        <h2>Oops! Something went wrong</h2>
      </div>
    );
  }
  return article ? (
    <article className="article-details">
      <div className="article-details-header">
        <h2>{article.slug.split('-').join(' ')}</h2>
        <div className="author-info flex padding-2">
          <Link>
            <img src={article.author.image} />
          </Link>

          <div>
            <h6>
              <Link>{article.author.username} </Link>
            </h6>

            <span className="date">
              {article.createdAt.split('').slice(0, 10)}
            </span>
          </div>
        </div>
      </div>
      <div className="desc">
        <p>{article.body}</p>
        <div className="padding-2">
          {article.tagList.map((tag) => {
            return (
              <span className="article-footer-tag" key={tag}>
                {tag}
              </span>
            );
          })}
        </div>
        <hr />
      </div>
      <div className="text-center padding-2">
        {!props.isLoggedIn ? (
          <p>
            <Link to="/login">Sign in</Link> or{' '}
            <Link to="/register">Sign up</Link> to add comments on this article.
          </p>
        ) : (
          ''
        )}
      </div>
    </article>
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
  );
}
export default withRouter(ArticleDetails);
