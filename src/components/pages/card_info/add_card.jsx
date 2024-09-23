import './card_info.css'
import {useRef} from "react";
import axios from "axios";

export default function AddCard({handleAddCard, setCards, cards}) {

    const company = useRef()
    const number = useRef()
    const expiry = useRef()
    const cvv = useRef()

    const submitCard = (e) => {
        e.preventDefault();

        // Преобразуем дату, если это необходимо
        const formattedExpiry = expiry.current.value;

        axios.post('http://localhost:8000/api/v1/wallet/', {
            user: localStorage.getItem('user_id'),  // Убедитесь, что это корректный ID
            company: company.current.value,  // Выбор из select
            number: number.current.value,  // 16 цифр
            expiry: formattedExpiry,  // Дата в формате YYYY-MM-DD
            cvv: cvv.current.value  // 3 цифры
        }, {
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`
            }
        })
            .then(response => {
                setCards([...cards, response.data]);
            })
            .catch(error => {
                if (error.response) {
                    console.log("Response Data:", error.response.data);  // Логируем ответ сервера
                }
            });
    }


    return (
        <div className='add-card'>
            <h1>Добавить карту</h1>
            <i onClick={()=> handleAddCard()} style={{position: "absolute", top: "10px", right: "10px", cursor: "pointer", fontSize: "30px"}} className='bx bx-x'></i>
            <div>
                <form className='form-add-card'>
                    <select ref={company} name="" id="">
                        <option value="Visa">Visa</option>
                        <option value="MasterCard">MasterCard</option>
                        <option value="American Express">American Express</option>
                        <option value="Discover">Discover</option>
                        <option value="UzCard">UzCard</option>
                        <option value="Humo">Humo</option>
                    </select>
                    <input type="text" ref={number} pattern="\d{16}" placeholder="Номер карты" />
                    <input type="date" ref={expiry} placeholder="ММ/ГГ" />
                    <input type="text" ref={cvv} pattern="\d{3}" placeholder="CVV" />
                    <button onClick={(event) => submitCard(event)} type='submit'>Добавить</button>
                </form>
            </div>
        </div>
    )
}