import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import { Participant } from '../../components/participant';

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participanteName, setParticipanteName] = useState('')


  function hadnlePartipantAdd(){
    if (participants.includes(participanteName)){
      return Alert.alert('Participante  existe','Já existe na lsita com esse nome')
    }

    setParticipants(prevState => [...prevState, participanteName]);
    setParticipanteName('')
  }

  function hadnlePartipantRemove(name: string){

    

    Alert.alert('Remover', `Deseja remover ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'Não',
        style:'cancel'
      }
    ])
  }


  return (
    <View style={styles.container}>

      <Text style={styles.eventName}>
        Event Name
      </Text>

      <Text style={styles.eventDate}>
        Quinta, 7 de Setembro  de 2023.
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Nome do participante'
          placeholderTextColor='#6B6B6B'
          onChangeText={setParticipanteName}
          value={participanteName}
        />

        <TouchableOpacity style={styles.button} onPress={hadnlePartipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity> 
      </View>

        <FlatList 
          data={participants}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <Participant
              key={item}
              name={item}
              onRemove={() => hadnlePartipantRemove(item)} 
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.listEmpty}>
              Ninguem chegou ao evento ainda? Adicione participantes a sua lista de presença
            </Text>
          )}
        />
    </View>
  )
}