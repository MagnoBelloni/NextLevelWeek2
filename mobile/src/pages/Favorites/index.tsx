import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { ITeacher } from '../../components/TeacherItem';

import styles from './styles';

function Favorites() {
    const [favoritesTeachers, setFavoritesTeachers] = useState([]);
    
    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favorites = JSON.parse(response);

                setFavoritesTeachers(favorites);
            }
        });
    }

    useFocusEffect(()=> {
        loadFavorites();
    })
    
    return (
        <View style={styles.container}>
            <PageHeader title="Meus Proffys favoritos" />

            <ScrollView 
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {favoritesTeachers.map((teacher: ITeacher)=> (
                   <TeacherItem 
                   key={teacher.id} 
                   teacher={teacher}
                   favorited
               />
                ))}
            </ScrollView>
        </View>
    );
}

export default Favorites;