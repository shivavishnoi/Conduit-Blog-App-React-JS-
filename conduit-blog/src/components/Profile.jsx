import { Link, withRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { articlesUrl } from '../utils/links';
import FeedList from './FeedList';
import { ROOT_URL } from '../utils/links';
import { Bars } from 'react-loader-spinner';
function Profile(props) {
  const [selectedTag, setSelectedTag] = useState('');
  const [articlesData, setArticlesData] = useState(null);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0);
  const [otherUserData, setOtherUserData] = useState(null);
  const updateSelectedTag = async (tag) => {
    setOffset(0);
    setSelectedTag(tag);
    setArticlesData(null);
  };
  const updateOffset = (pageNum) => {
    setOffset((pageNum - 1) * 10);
  };
  useEffect(() => {
    if (!props.userData) {
      fetch(`${ROOT_URL}/profiles/${props.match.params.username}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setOtherUserData(data);
        })
        .catch((err) => {
          setError('Not able to fetch required data');
        });
      let url = !selectedTag
        ? `${articlesUrl}?author=${props.match.params.username}&offset=${offset}&limit=10`
        : `${articlesUrl}?favorited=${props.match.params.username}&offset=${offset}&limit=10`;
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          setArticlesData(data);
        })
        .catch((err) => {
          setError('Not able to fetch required data');
        });
    } else {
      let url = !selectedTag
        ? `${articlesUrl}?author=${props.userData.user.username}&offset=${offset}&limit=10`
        : `${articlesUrl}?favorited=${props.userData.user.username}&offset=${offset}&limit=10`;
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Token ${props.userData.user.token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          setArticlesData(data);
        })
        .catch((err) => {
          setError('Not able to fetch required data');
        });
    }
  }, [selectedTag, offset]);
  if (error) {
    return (
      <div className="text-center">
        <p>{error}</p>
      </div>
    );
  }
  if (otherUserData === null && !props.userData) {
    return (
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
  return (
    <section className="profile">
      <div className="text-center padding-2 head">
        <img
          src={
            props.userData
              ? props.userData.user.image
              : otherUserData.profile.image
          }
        />
        <h4>
          {props.userData
            ? props.userData.user.username
            : otherUserData.profile.username}
        </h4>
        <p>
          {props.userData ? props.userData.user.bio : otherUserData.profile.bio}
        </p>
        <div className="text-right">
          {props.userData ? (
            <Link to="/settings">
              <button>&#9881; Edit profile Settings</button>
            </Link>
          ) : (
            <Link>
              <button>{`+ Follow ${otherUserData.profile.username}`}</button>
            </Link>
          )}
        </div>
      </div>
      <div className="home-feeds padding-2">
        <nav>
          <ul className="flex">
            <li
              onClick={() => updateSelectedTag('')}
              className={selectedTag == '' ? 'active-li' : ''}
            >
              My Articles{' '}
            </li>
            <li
              onClick={() => updateSelectedTag('favourites')}
              className={selectedTag == 'favourites' ? 'active-li' : ''}
            >
              Favourite Articles
            </li>
          </ul>
        </nav>
        <div className="feed">
          <FeedList
            data={articlesData}
            offset={offset}
            updateOffset={updateOffset}
          />
        </div>
      </div>
    </section>
  );
}
export default withRouter(Profile);
