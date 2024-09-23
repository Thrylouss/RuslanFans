

export default function Card({cards}) {

    return (
        <div>
            {cards.map((card, index) => (
                <div className='card-info' key={index}>
                    <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                        <p>{card.company}</p>
                        <p>{card.number}</p>
                    </div>
                    <p>Срок годности: {card.expiry}</p>
                </div>
            ))}
            <div style={{textAlign: 'center', marginTop: '40px', fontSize: '20px'}}>
                Мы полностью соблюдаем стандарты безопасности данных индустрии платежных карт.
            </div>
        </div>
    )
}