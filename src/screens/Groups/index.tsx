import { useEffect, useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Container } from './styles';

import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';

import { Button } from '@components/Button';
import { groupGetAll } from '@storage/group/groupGetAll';
import { Loading } from '@components/Loading';

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGrops] = useState<string[]>([]);
  const navigation = useNavigation();

  const handleNewGroup = () => {
    navigation.navigate('new');
  }

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
      const data = await groupGetAll();

      setGrops(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Turmas', 'Não foi possível carregar as turmas.')
    } finally {
      setIsLoading(false);
    }
  }

  const handleOpenGroup = (group: string) => {
    navigation.navigate('players', { group });
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));

  return (
    <Container>
      <Header />
      
      <Highlight 
        title='Turmas'
        subtitle='jogue com a sua turma'
      />

      { isLoading ? <Loading /> : 

        <FlatList 
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard 
              title={item}
              onPress={() => handleOpenGroup(item)}
            />
          )}
          contentContainerStyle={groups.length === 0 && {flex: 1}}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <ListEmpty 
              message='Que tal cadastrar a primeira turma ?'
            />
          )}
        />
      }

      <Button 
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </Container>
  );
}

