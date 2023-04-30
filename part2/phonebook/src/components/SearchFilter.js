const SearchFilter = ({ filterByNames }) => {
  return (
    <div>
      find by name <input onChange={filterByNames}></input>
    </div>
  );
};

export default SearchFilter;
