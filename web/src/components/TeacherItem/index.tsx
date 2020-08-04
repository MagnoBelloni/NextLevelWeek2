import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem: React.FC = () => {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://i.pinimg.com/originals/21/89/67/2189679cd7afafb0d1988a9d0baa88d2.jpg" alt="Solaire" />
                <div>
                    <strong>Solaire</strong>
                    <span>Religião</span>
                </div>
            </header>

            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                <br />
                <br />
                        Temporibus ex, asperiores doloribus sed voluptatibus eius necessitatibus cum. Aperiam blanditiis beatae sit, asperiores eos iste ab vero, accusantium et, animi inventore.
            </p>
            <footer>
                <p>Preço/hora <strong>20R$</strong></p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp" />
                            Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem;