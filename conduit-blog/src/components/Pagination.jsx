export default function Pagination(props) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(props.articlesCount / 10); i++) {
    pages.push(i);
  }
  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          onClick={() => props.updateOffset(page)}
          className={`page-button ${
            props.offset / 10 + 1 === page ? 'active-page-button' : ''
          }`}
          key={page}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
