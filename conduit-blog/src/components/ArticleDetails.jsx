import { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { articlesUrl } from '../utils/links';
import Comments from './Comments';
function ArticleDetails(props) {
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');
  const history = useHistory();
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
  const deleteArticle = () => {
    fetch(`${articlesUrl}/${props.match.params.slug}`, {
      method: 'DELETE',
      headers: {
        authorization: `Token ${props.userData.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
      })
      .then((data) => {
        history.push('/');
      })
      .catch((err) => {
        setError('Error while deleting article');
      });
  };
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
            {props.isLoggedIn ? (
              article.author.username == props.userData.user.username ? (
                <div className="buttons">
                  <Link to={`/edit-post/${article.slug}`}>
                    <button> Update Article</button>
                  </Link>

                  <button onClick={deleteArticle}>Delete Article</button>
                </div>
              ) : (
                ''
              )
            ) : (
              ''
            )}
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
          <Comments
            details={{
              slug: article.slug,
              userToken: props.userData.user.token,
              userImage: props.userData.user.image,
            }}
          />
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
