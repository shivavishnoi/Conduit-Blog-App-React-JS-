import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { articlesUrl } from '../utils/links';
export default function NewPost(props) {
  const history = useHistory();
  const [articleData, setArticleData] = useState({
    title: '',
    description: '',
    body: '',
    tagList: '',
  });
  const [errors, setErrors] = useState('');
  const handleInput = ({ target }) => {
    let { name, value } = target;
    if (name == 'tagList') {
      value = value.split(',');
    }
    setArticleData({ ...articleData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(articlesUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${props.userData.user.token}`,
      },
      body: JSON.stringify({ article: articleData }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        history.push(`/articles/${data.article.slug}`);
      })
      .catch((err) => {
        setErrors(`Error while publishing article`);
      });
  };
  return (
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
        <input
          placeholder="Enter Tags"
          type="text"
          name="tagList"
          value={articleData.tagList}
          onChange={handleInput}
        />
        <span className="error">{errors}</span>
        <input type="submit" value="Publish Article" />
      </form>
    </section>
  );
}
