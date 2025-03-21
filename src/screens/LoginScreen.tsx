import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/Routes";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ navigation }: Props) => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!auth) return;

    try {
      await auth.signIn(email, password);
      navigation.replace("Home");
    } catch (error) {
      Alert.alert("Erro", "Erro ao fazer login!");
    }
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Senha:</Text>
      <TextInput secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
      <Text onPress={() => navigation.navigate("Register")}>Criar conta</Text>
    </View>
  );
};

export default LoginScreen;
