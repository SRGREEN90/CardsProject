import React, {ChangeEvent, useEffect, useState} from "react";
import s from './Search.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";

const packName = [
    "React",
    "Redux",
    "JS",
    "TS",
    "Google",
    "Facebook",
    "Twitter",
    "Linkedin",
];

export const Search = () => {
   //const packName = useSelector<AppRootStateType, boolean>(state => state.cardsPack.);

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Array<string>>([]);
    const handleChange = (e:  ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value);
    };

    useEffect(() => {
        const results = packName.filter(p =>
            p.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm]);

    return (
        <div className={s.wrap}>
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
            />
            <ul>
                {searchResults.map(item => (
                    <li>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default Search