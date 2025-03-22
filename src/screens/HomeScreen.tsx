import React, { useContext } from "react";
import { View, Text, Button, Alert } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

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
    <View>
      <Text>Bem-vindo à Home!</Text>
      <Button title="Sair" onPress={handleSignOut} />
    </View>
  );
};

export default HomeScreen;