import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import ReadingList from './ReadingList';
const Header = () => {
  return (
    <>
      <header>
        <h1>Page Turner App</h1>
      </header>
      <button className="iconBtn">
        <FontAwesomeIcon icon={faBookmark} className="bookMark" />
      </button>
    </>
  )
}
export default Header;