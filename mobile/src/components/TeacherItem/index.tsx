import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import hearthOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
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
    favorited: boolean;
}

const TeacherItem: React.FC<ITeacherItemProps> = ({ teacher, favorited }) => {
    const [isFavorited, setIsFavorited] = useState(favorited);

    function handleLinkToWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
        createNewConnection();
    }

    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites');

        let favoritesArray = [];
        if (favorites) {
            favoritesArray = JSON.parse(favorites);
        }

        if (isFavorited) {
            const favoriteIndex = favoritesArray.findIndex((teacherItem: ITeacher) => {
                return teacherItem.id === teacher.id;
            });

            favoritesArray.splice(favoriteIndex, 1);

            setIsFavorited(false);
        } else {
            favoritesArray.push(teacher);

            setIsFavorited(true);
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }

    function createNewConnection() {
        api.post('connections', {
            user_id: teacher.id,
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: 'https://media-exp1.licdn.com/dms/image/C4D03AQERm57t1YbWrg/profile-displayphoto-shrink_100_100/0?e=1602115200&v=beta&t=nB9NCZvA6YcNdKVrXtm4GhjociRLuGzTZJQrkUB1d6Y' }}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>


            </View>
            <Text style={styles.bio}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio in aperiam aut vero suscipit velit obcaecati, quos dignissimos, nobis, fuga vitae laudantium eius? Est beatae provident iste inventore ipsam totam!
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'   '}
                    <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton style={[
                        styles.favoriteButton, 
                        isFavorited && styles.favorited
                        ]}
                        onPress={handleToggleFavorite}
                    >
                        { isFavorited 
                            ? <Image source={unfavoriteIcon} /> 
                            : <Image source={hearthOutlineIcon} />
                        }



                    </RectButton>

                    <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}

export default TeacherItem;