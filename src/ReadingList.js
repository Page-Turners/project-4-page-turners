//Local copy of firebase to be printed
const ReadingList = (props) => {
  const { booksArray } = props;
  console.log(booksArray);
  return (
    <>
      <ul className="bookShelf">
        {
          booksArray.map((book) => {
            return (
              <li></li>
            )

          })
        }
        <div>

        </div>
      </ul>
    </>
  )
}
export default ReadingList;