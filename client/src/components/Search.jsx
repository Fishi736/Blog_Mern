
import { CiSearch } from "react-icons/ci";

const Search = () => {
  return (
    <div className="w-50 position-relative">
        <CiSearch className="search-icon"/>
        <input type="text" name="search" id="search-input" placeholder='Search...' className='form-controls'/>
    </div>
  )
}

export default Search