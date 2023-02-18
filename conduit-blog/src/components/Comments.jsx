import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { articlesUrl } from '../utils/links';
export default function Comments(props) {
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  const handleText = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //posting an comment
    fetch(`${articlesUrl}/${props.details.slug}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${props.details.userToken}`,
      },
      body: JSON.stringify({
        comment: {
          body: commentText,
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
        setCommentText('');
        fetchCommentList();
      })
      .catch((err) => {
        setError('Error while posting comment');
      });
  };
  const deleteComment = (id) => {
    fetch(`${articlesUrl}/${props.details.slug}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Token ${props.details.userToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((res) => {
        fetchCommentList();
      })
      .catch((err) => {
        setError('Error while deleting Comment');
      });
  };
  const fetchCommentList = () => {
    fetch(`${articlesUrl}/${props.details.slug}/comments`, {
      method: 'GET',
      headers: {
        authorization: `Token ${props.details.userToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setCommentsList(data.comments);
      })
      .catch((err) => {
        setError('Error while displaying comments');
      });
  };
  useEffect(() => {
    //get comments
    fetchCommentList();
  }, []);
  return (
    <section className="comments container">
      <form onSubmit={handleSubmit} className="post-comment">
        <div>
          <textarea
            value={commentText}
            name="comment"
            rows={6}
            onChange={handleText}
            placeholder="Write a comment here..."
          ></textarea>
        </div>
        <div className="flex justify-between">
          <img src={props.details.userImage} />
          <input type="submit" value="Post Comment" />
        </div>
      </form>
      {commentsList ? (
        <div className="list-comments">
          {commentsList.map((comment) => {
            return (
              <div className="box">
                <div className="comment-body padding-3">
                  <p>{comment.body}</p>
                </div>
                <div className="comment-info flex justify-between padding-3">
                  <div className="flex align-center">
                    <img src={comment.author.image} />
                    <Link to={`/profile/${comment.author.username}`}>
                      <span>{comment.author.username}</span>
                    </Link>
                    <span>{comment.createdAt.split('').slice(0, 10)}</span>
                  </div>

                  <span onClick={() => deleteComment(comment.id)}>🗑️</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ''
      )}
      <span className="error">{error}</span>
    </section>
  );
}
