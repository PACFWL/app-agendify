import React, { useContext } from "react";
import { View, Text, Button, Alert } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import styles from "../styles/HomeScreenStyles"

const HomeScreen = () => {
  const auth = useContext(AuthContext);

  const handleSignOut = async () => {
    if (!auth) {
      Alert.alert("Erro", "Erro ao sair. Tente novamente.");
      return;
    }

    await auth.signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem-vindo à Home!</Text>
      <View style={styles.button}>
      <Button title="Sair" onPress={handleSignOut} />
      </View>
    </View>
  );
};

export default HomeScreen;