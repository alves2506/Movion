// VehicleFormScreen.jsx — formulário para cadastrar um veículo.
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';

import { saveVehicle } from '../services/vehicleStorage';

export default function VehicleFormScreen({ navigation }) {
  // Um estado para cada campo do formulário.
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [placa, setPlaca] = useState('');
  const [km, setKm] = useState('');

  async function salvar() {
    // Validação simples: nenhum campo pode ficar vazio.
    if (!marca || !modelo || !ano || !placa || !km) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    await saveVehicle({
      brand: marca,
      model: modelo,
      year: Number(ano),
      plate: placa.toUpperCase(),
      currentKm: Number(km),
    });

    navigation.goBack(); // volta para a tela anterior
  }

  return (
    <ScrollView contentContainerStyle={styles.tela}>
      <Text style={styles.rotulo}>Marca</Text>
      <TextInput style={styles.input} placeholder="Ex.: Fiat" value={marca} onChangeText={setMarca} />

      <Text style={styles.rotulo}>Modelo</Text>
      <TextInput style={styles.input} placeholder="Ex.: Argo" value={modelo} onChangeText={setModelo} />

      <Text style={styles.rotulo}>Ano</Text>
      <TextInput style={styles.input} placeholder="Ex.: 2021" value={ano} onChangeText={setAno} keyboardType="numeric" />

      <Text style={styles.rotulo}>Placa</Text>
      <TextInput style={styles.input} placeholder="Ex.: ABC1D23" value={placa} onChangeText={setPlaca} autoCapitalize="characters" />

      <Text style={styles.rotulo}>Quilometragem atual</Text>
      <TextInput style={styles.input} placeholder="Ex.: 45000" value={km} onChangeText={setKm} keyboardType="numeric" />

      <Pressable style={styles.botao} onPress={salvar}>
        <Text style={styles.botaoTexto}>Cadastrar veículo</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { padding: 16 },
  rotulo: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 6 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, padding: 12, fontSize: 16 },
  botao: { backgroundColor: '#14B8A6', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 24 },
  botaoTexto: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
