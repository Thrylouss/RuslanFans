import SearchField from "./search_field.jsx";
import Advisement from "./advisement.jsx";
import {useState} from "react";


export default function AsideRight({setComponents, setCurrentProfile}) {
    const [query, setQuery] = useState('');

    return (
        <>
            <SearchField setQuery={setQuery}/>
            <Advisement setComponents={setComponents} query={query} setCurrentProfile={setCurrentProfile} setQuery={setQuery}/>
        </>
    )
}