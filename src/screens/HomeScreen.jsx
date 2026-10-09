// HomeScreen.jsx — Dashboard: mostra o veículo, a quilometragem e o status.
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { getVehicles } from '../services/vehicleStorage';

export default function HomeScreen({ navigation }) {
  // "veiculo" guarda o carro que aparece na tela. Começa vazio (null).
  const [veiculo, setVeiculo] = useState(null);

  // Roda toda vez que a tela aparece (inclusive ao voltar do cadastro).
  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        const lista = await getVehicles();
        setVeiculo(lista[0] || null); // o primeiro da lista é o veículo principal
      }
      carregar();
    }, [])
  );

  // Se ainda não tem carro cadastrado, mostra um convite para cadastrar.
  if (!veiculo) {
    return (
      <View style={styles.tela}>
        <Text style={styles.titulo}>Bem-vindo ao Movion</Text>
        <Text style={styles.texto}>Você ainda não cadastrou nenhum veículo.</Text>
        <Pressable style={styles.botao} onPress={() => navigation.navigate('VehicleForm')}>
          <Text style={styles.botaoTexto}>Cadastrar veículo</Text>
        </Pressable>
      </View>
    );
  }

  // Se tem carro, mostra o resumo.
  return (
    <View style={styles.tela}>
      <View style={styles.cartao}>
        <Text style={styles.titulo}>
          {veiculo.brand} {veiculo.model}
        </Text>
        <Text style={styles.texto}>Ano: {veiculo.year}</Text>
        <Text style={styles.texto}>Placa: {veiculo.plate}</Text>
        <Text style={styles.km}>{veiculo.currentKm} km</Text>
      </View>

      <View style={styles.cartao}>
        <Text style={styles.titulo}>Status geral</Text>
        {/* Texto fixo por enquanto: o status real vem do módulo de manutenções. */}
        <Text style={styles.texto}>Troca de óleo se aproxima</Text>
      </View>

      <Pressable style={styles.botao} onPress={() => navigation.navigate('VehicleList')}>
        <Text style={styles.botaoTexto}>Meus veículos</Text>
      </Pressable>
      <Pressable style={styles.botao} onPress={() => navigation.navigate('VehicleForm')}>
        <Text style={styles.botaoTexto}>Adicionar veículo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, padding: 16, backgroundColor: '#F4F7FA' },
  cartao: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 16 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 6 },
  texto: { fontSize: 16, color: '#475569', marginBottom: 4 },
  km: { fontSize: 32, fontWeight: 'bold', color: '#0B1F3A', marginTop: 8 },
  botao: { backgroundColor: '#14B8A6', padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  botaoTexto: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
