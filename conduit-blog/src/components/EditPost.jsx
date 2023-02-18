import { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { articlesUrl } from '../utils/links';
function EditPost(props) {
  const history = useHistory();
  const [articleData, setArticleData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${articlesUrl}/${articleData.slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${props.userData.user.token}`,
      },
      body: JSON.stringify({
        article: {
          title: articleData.title,
          body: articleData.body,
          description: articleData.description,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        history.push(`/articles/${data.article.slug}`);
      })
      .catch((err) => {
        setError('Error while Updating article');
      });
  };
  const handleInput = ({ target }) => {
    let { name, value } = target;
    setArticleData({ ...articleData, [name]: value });
  };
  useEffect(() => {
    fetch(`${articlesUrl}/${props.match.params.slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setArticleData(data.article);
      })
      .catch((err) => {
        setError('Error while fetching Data');
      });
  }, []);
  if (error) {
    return <h3>{error}</h3>;
  }
  return articleData ? (
    <section className="new-post-form container">
      <form
        className="flex column align-center padding-1"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Article Title"
          type="text"
          name="title"
          value={articleData.title}
          onChange={handleInput}
        />
        <input
          placeholder="What's this article about?"
          type="text"
          name="description"
          value={articleData.description}
          onChange={handleInput}
        />
        <textarea
          placeholder="Write your article (in markdown)"
          name="body"
          rows={12}
          value={articleData.body}
          onChange={handleInput}
        />

        <span className="error">{error}</span>
        <input type="submit" value="Update Article" />
      </form>
    </section>
  ) : (
    ''
  );
}
export default withRouter(EditPost);

// <input
//   placeholder="Enter Tags"
//   type="text"
//   name="tagList"
//   value={articleData.tagList}
//   onChange={handleInput}
// />;
