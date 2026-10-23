// vehicleStorage.js — salva e lê os veículos no celular.
// É parecido com o localStorage do navegador, mas do React Native (AsyncStorage).
// OBS: esta parte é do Integrante 1 (Daniel). Isto aqui é uma versão provisória
// só para as minhas telas funcionarem. Os nomes das funções foram combinados.
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@movion_vehicles';

// Função para consultar/listar todos os veículos salvos
export async function getVehicles() {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao buscar veículos:', error);
    return [];
  }
}

// Função para cadastrar/salvar um novo veículo
export async function saveVehicle(newVehicle) {
  try {
    const vehicles = await getVehicles();
    const vehicleWithId = { id: Date.now().toString(), ...newVehicle };
    vehicles.push(vehicleWithId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
    return true;
  } catch (error) {
    console.error('Erro ao salvar veículo:', error);
    return false;
  }
}