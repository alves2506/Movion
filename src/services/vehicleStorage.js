// vehicleStorage.js — salva e lê os veículos no celular.
// É parecido com o localStorage do navegador, mas do React Native (AsyncStorage).
// OBS: esta parte é do Integrante 1 (Daniel). Isto aqui é uma versão provisória
// só para as minhas telas funcionarem. Os nomes das funções foram combinados.
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = '@movion:veiculos';

// Devolve a lista de veículos salvos (ou lista vazia).
export async function getVehicles() {
  const texto = await AsyncStorage.getItem(CHAVE);
  return texto ? JSON.parse(texto) : [];
}

// Adiciona um veículo novo na lista e salva.
export async function saveVehicle(veiculo) {
  const lista = await getVehicles();
  const novo = { ...veiculo, id: String(Date.now()) };
  await AsyncStorage.setItem(CHAVE, JSON.stringify([...lista, novo]));
}
