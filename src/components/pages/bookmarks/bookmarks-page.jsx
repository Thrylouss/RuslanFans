import './bookmarks.css'
import Bookmark from "./booksmark.jsx";

export default function BookmarksPage ({setComponents}) {

    return (
        <>
            <div className='bookmarks-header'>
                <i onClick={()=> setComponents('main')} className='bx bx-arrow-back'></i>
                <h2>Коллекция</h2>
            </div>

            <div>
                <Bookmark/>
            </div>
        </>
    )
}