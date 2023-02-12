import { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { tagsUrl } from '../utils/links';
export default function PopularTags(props) {
  const [tagsData, setTagsData] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    fetch(tagsUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) => {
        setTagsData(data);
      })
      .catch((err) => {
        setError('Not able to fetch required data');
      });
  }, []);
  if (error) {
    return (
      <div className="text-center">
        <p>{error}</p>
      </div>
    );
  }
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
        <div className="flex justify-center">
          <Bars
            height="20"
            width="20"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
    </div>
  );
}
