import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function PopularTags(props) {
  const [tagsData, setTagsData] = useState(null);
  useEffect(() => {
    fetch('https://api.realworld.io/api/tags')
      .then((res) => res.json())
      .then((data) => {
        setTagsData(data);
      });
  }, []);
  return (
    <div className="flex wrap padding-2">
      {tagsData ? (
        tagsData.tags.map((tag, i) => (
          <span
            key={i}
            className="popular-tag"
            onClick={() => props.updateSelectedTag(tag)}
          >
            {tag}
          </span>
        ))
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}
