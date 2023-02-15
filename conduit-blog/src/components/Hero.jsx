import { useEffect, useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { articlesUrl } from '../utils/links';
import FeedList from './FeedList';
import PopularTags from './PopularTags';

export default function Hero(props) {
  const [selectedTag, setSelectedTag] = useState('');
  const [articlesData, setArticlesData] = useState(null);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0);

  const updateSelectedTag = async (tag) => {
    setOffset(0);
    setSelectedTag(tag);
    setArticlesData(null);
  };
  const updateOffset = (pageNum) => {
    setOffset((pageNum - 1) * 10);
  };
  useEffect(() => {
    //selectedTag can be "" for global articles and "feed"(auth needed) for user feed article and a valid tag from popular tags
    if (selectedTag == 'feed') {
      fetch(`${articlesUrl}/feed?limit=10&offset=${offset}`, {
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
    } else {
      let url;
      url = selectedTag
        ? `${articlesUrl}?tag=${selectedTag}&limit=10&offset=${offset}`
        : `${articlesUrl}?limit=10&offset=${offset}`;
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
    }
  }, [selectedTag, offset]);
  if (error) {
    return (
      <div className="text-center">
        <p>{error}</p>
      </div>
    );
  }
  return (
    <section>
      <div className="home-head text-center padding-1">
        <h1>Conduit</h1>
        <p>A place to Share Knowledge</p>
      </div>
      <div className="hero flex justify-between container align-start">
        <div className="home-feeds flex-68 padding-2">
          <nav>
            <ul className="flex">
              <li onClick={() => updateSelectedTag('')}>Global Feed</li>
              {props.isLoggedIn ? (
                <li onClick={() => updateSelectedTag('feed')}>Your Feed</li>
              ) : (
                ''
              )}
              {selectedTag !== 'feed' && selectedTag !== '' ? (
                <li>#{selectedTag}</li>
              ) : (
                ''
              )}
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
        <div className="home-tags flex-30 padding-2">
          <span>Popular Tags</span>
          <PopularTags updateSelectedTag={updateSelectedTag} />
        </div>
      </div>
    </section>
  );
}

// export default function Hero(props) {
//   const [selectedTag, setSelectedTag] = useState('');
//   const [globalArticles, setGlobalArticles] = useState(null);
//   const [selectedTagArticles, setSelectedTagArticles] = useState(null);
//   const [error, setError] = useState('');
//   const [offset, setOffset] = useState(0);

//   const updateSelectedTag = async (tag) => {
//     setOffset(0);
//     setSelectedTag(tag);
//   };
//   const updateOffset = (pageNum) => {
//     setOffset((pageNum - 1) * 10);
//   };
//   useEffect(() => {
//     fetch(`${articlesUrl}?tag=${selectedTag}&limit=10&offset=${offset}`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(res.statusText);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setSelectedTagArticles(data);
//       })
//       .catch((err) => {
//         setError('Not able to fetch required data');
//       });
//   }, [selectedTag, offset]);

//   useEffect(() => {
//     fetch(`${articlesUrl}?limit=10&offset=${offset}`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(res.status);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setGlobalArticles(data);
//       })
//       .catch((err) => {
//         setError('Not able to fetch required data');
//       });
//   }, [offset]);
//   if (error) {
//     return (
//       <div className="text-center">
//         <p>{error}</p>
//       </div>
//     );
//   }
//   return (
//     <main>
//       <div className="home-head text-center padding-1">
//         <h1>Conduit</h1>
//         <p>A place to Share Knowledge</p>
//       </div>
//       <section className="hero flex justify-between container align-start">
//         <div className="home-feeds flex-68 padding-2">
//           <nav>
//             <ul className="flex">
//               <li onClick={() => updateSelectedTag('')}>Global Feed</li>

//               {selectedTag ? <li>#{selectedTag}</li> : ''}
//             </ul>
//           </nav>

//           <div className="feed">
//             {selectedTag ? (
//               <FeedList
//                 data={selectedTagArticles}
//                 offset={offset}
//                 updateOffset={updateOffset}
//               />
//             ) : (
//               <FeedList
//                 data={globalArticles}
//                 offset={offset}
//                 updateOffset={updateOffset}
//               />
//             )}
//           </div>

//           {/*<Route path="/your-feed">
//               <div className="feed">
//                 <FeedList articles="" />
//               </div>
// </Route>*/}
//         </div>
//         <div className="home-tags flex-30 padding-2">
//           <span>Popular Tags</span>
//           <PopularTags updateSelectedTag={updateSelectedTag} />
//         </div>
//       </section>
//     </main>
//   );
// }
