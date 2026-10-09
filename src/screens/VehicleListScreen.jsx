// VehicleListScreen.jsx — lista todos os veículos cadastrados.
import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { getVehicles } from '../services/vehicleStorage';

export default function VehicleListScreen({ navigation }) {
  const [veiculos, setVeiculos] = useState([]);

  // Carrega a lista toda vez que a tela aparece.
  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        setVeiculos(await getVehicles());
      }
      carregar();
    }, [])
  );

  return (
    <View style={styles.tela}>
      {/* FlatList repete o bloco "renderItem" para cada veículo da lista. */}
      <FlatList
        data={veiculos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.texto}>Nenhum veículo cadastrado.</Text>}
        renderItem={({ item }) => (
          <View style={styles.cartao}>
            <Text style={styles.titulo}>
              {item.brand} {item.model}
            </Text>
            <Text style={styles.texto}>
              {item.year} • {item.plate} • {item.currentKm} km
            </Text>
          </View>
        )}
      />

      <Pressable style={styles.botao} onPress={() => navigation.navigate('VehicleForm')}>
        <Text style={styles.botaoTexto}>+ Novo veículo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, padding: 16, backgroundColor: '#F4F7FA' },
  cartao: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 12 },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  texto: { fontSize: 16, color: '#475569' },
  botao: { backgroundColor: '#14B8A6', padding: 14, borderRadius: 10, alignItems: 'center' },
  botaoTexto: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
