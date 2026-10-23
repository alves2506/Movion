import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getVehicles } from '../services/vehicleStorage';

export default function VehicleListScreen() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carrega os veículos salvos sempre que a tela entra em foco
  useFocusEffect(
    useCallback(() => {
      loadVehicles();
    }, [])
  );

  async function loadVehicles() {
    setLoading(true);
    const data = await getVehicles();
    setVehicles(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#14B8A6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚘 Meus Veículos Cadastrados</Text>
      
      {vehicles.length === 0 ? (
        <Text style={styles.empty}>Nenhum veículo cadastrado ainda.</Text>
      ) : (
        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.vehicleTitle}>{item.brand} {item.model} ({item.year})</Text>
              <Text style={styles.text}>Placa: {item.plate}</Text>
              <Text style={styles.text}>Km atual: {item.currentKm} km</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', marginBottom: 16, textAlign: 'center' },
  empty: { textAlign: 'center', color: '#64748B', marginTop: 40, fontSize: 16 },
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0', elevation: 2 },
  vehicleTitle: { fontSize: 16, fontWeight: 'bold', color: '#0F172A', marginBottom: 4 },
  text: { fontSize: 14, color: '#475569', marginTop: 2 }
});