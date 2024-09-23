import './aside.css';
import {useState} from "react";

export default function SearchField({setQuery}) {
    const [inputValue, setInputValue] = useState('');

    // Обрабатываем изменение текста
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Обрабатываем нажатие клавиш
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {  // Проверяем нажатие клавиши Enter
            setQuery(inputValue);  // Запускаем поиск
        }
    };

    return (
        <div className="search-field">
            <i className='bx bx-search'></i>
            <input
                type="text"
                placeholder="Поиск"
                value={inputValue}
                onChange={handleInputChange}  // отслеживаем ввод
                onKeyPress={handleKeyPress}  // отслеживаем нажатие клавиш
            />
        </div>
    );
}
