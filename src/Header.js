import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import ReadingList from './ReadingList';
const Header = () => {
  return (
    <>
      <header>
        <Link to={"/"}>
        <h1>Page Turner App</h1>
        </Link>
      </header>
      <Link to={"/readinglist"}>
      <button className="iconBtn">
        <FontAwesomeIcon icon={faBookmark} className="bookMark" />
      </button>
      </Link>
    </>
  )
}
export default Header;