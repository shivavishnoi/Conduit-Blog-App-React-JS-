import { useEffect, useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import FeedList from './FeedList';
import PopularTags from './PopularTags';
export default function Hero() {
  const [selectedTag, setSelectedTag] = useState('');
  const [globalArticles, setGlobalArticles] = useState(null);
  const [selectedTagArticles, setSelectedTagArticles] = useState(null);
  const [offset, setOffset] = useState(0);

  const updateSelectedTag = async (tag) => {
    setOffset(0);
    setSelectedTag(tag);
  };
  const updateOffset = (pageNum) => {
    setOffset((pageNum - 1) * 10);
  };
  useEffect(() => {
    fetch(
      `https://api.realworld.io/api/articles?tag=${selectedTag}&limit=10&offset=${offset}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSelectedTagArticles(data);
      });
  }, [selectedTag, offset]);

  useEffect(() => {
    fetch(`https://api.realworld.io/api/articles?limit=10&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        setGlobalArticles(data);
      });
  }, [offset]);

  return (
    <main>
      <div className="home-head text-center padding-1">
        <h1>Conduit</h1>
        <p>A place to Share Knowledge</p>
      </div>
      <section className="hero flex justify-between container align-start">
        <div className="home-feeds flex-68 padding-2">
          <nav>
            <ul className="flex">
              <li onClick={() => updateSelectedTag('')}>Global Feed</li>
              <li>
                {/* <NavLink to="/your-feed" activeClassName="active">
                  Your Feed
  </NavLink>*/}
              </li>

              {selectedTag ? <li>#{selectedTag}</li> : ''}
            </ul>
          </nav>

          <div className="feed">
            {selectedTag ? (
              <FeedList
                data={selectedTagArticles}
                offset={offset}
                updateOffset={updateOffset}
              />
            ) : (
              <FeedList
                data={globalArticles}
                offset={offset}
                updateOffset={updateOffset}
              />
            )}
          </div>

          {/*<Route path="/your-feed">
              <div className="feed">
                <FeedList articles="" />
              </div>
</Route>*/}
        </div>
        <div className="home-tags flex-30 padding-2">
          <span>Popular Tags</span>
          <PopularTags updateSelectedTag={updateSelectedTag} />
        </div>
      </section>
    </main>
  );
}
