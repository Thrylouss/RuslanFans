import AdviseCard from "./users_card.jsx";
import {useState} from "react";


export default function Advisement({setComponents, query, setQuery, setCurrentProfile}) {
    const [refresh, setRefresh] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const refreshComponent = () => {
        setRefresh((prev) => prev + 1);
        setCurrentPage(1)
        setQuery('')
    }

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    }
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    }

    return (
        <>
            <div className='advise-field'>
                <h2>Предложение</h2>
                <div>
                    <i className='bx bx-refresh' onClick={refreshComponent}></i>
                    <i className='bx bx-chevron-left' onClick={prevPage}></i>
                    <i className='bx bx-chevron-right' onClick={nextPage}></i>
                </div>
            </div>
            <AdviseCard
                key={refresh}
                setComponents={setComponents}
                setTotalPages={setTotalPages}
                currentPage={currentPage}
                refresh={refresh}
                query={query}
                setCurrentProfile={setCurrentProfile}/>

        </>
    )
}