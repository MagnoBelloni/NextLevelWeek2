import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

export interface ITeacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    user_id: string;
    whatsapp: string;
}

interface ITeacherItemProps {
    teacher: ITeacher
}

const TeacherItem: React.FC<ITeacherItemProps> = ({ teacher }) => {
    function createNewConnection() {
        api.post('connections', {
            user_id: teacher.id
        });
    }
    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>
                {teacher.bio}
            </p>
            <footer>
                <p>Preço/hora <strong>R${teacher.cost}</strong></p>
                <a onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`} target="__blank" type="button">
                    <img src={whatsappIcon} alt="Whatsapp" />
                            Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem;