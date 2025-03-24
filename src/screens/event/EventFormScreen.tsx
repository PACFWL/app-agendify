import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { createEvent } from "../../api/event";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/Routes";
import styles from "../../styles/EventFormScreenStyles";

type Props = NativeStackScreenProps<RootStackParamList, "EventForm">;

const EventFormScreen = ({ navigation }: Props) => {
  const auth = useContext(AuthContext);
  
  const [eventData, setEventData] = useState({
    name: "",
    day: "",
    startTime: "",
    endTime: "",
    theme: "",
    targetAudience: "",
    mode: "",
    environment: "",
    organizer: "",
    resourcesDescription: "",
    disclosureMethod: "",
    relatedSubjects: "",
    teachingStrategy: "",
    authors: "",
    disciplinaryLink: "",
    locationName: "",
    locationFloor: "",
    status: "",
    priority: "",
    cleanupDuration: "",
    observation: "",
  });

  const handleChange = (field: string, value: string) => {
    setEventData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!auth?.user) return;
    
    try {
      const formattedData = {
        ...eventData,
        day: new Date(eventData.day).toISOString().split("T")[0],
        startTime: eventData.startTime + ":00",
        endTime: eventData.endTime + ":00",
        resourcesDescription: eventData.resourcesDescription.split(","),
        relatedSubjects: eventData.relatedSubjects.split(","),
        authors: eventData.authors.split(","),
        location: { name: eventData.locationName, floor: eventData.locationFloor },
        cleanupDuration: `PT${eventData.cleanupDuration}M`,
      };

      await createEvent(auth.user.token, formattedData);
      Alert.alert("Sucesso", "Evento criado com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Erro ao criar evento.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Criar Novo Evento</Text>

      <TextInput style={styles.input} placeholder="Nome" onChangeText={(text) => handleChange("name", text)} />
      <TextInput style={styles.input} placeholder="Data (YYYY-MM-DD)" onChangeText={(text) => handleChange("day", text)} />
      <TextInput style={styles.input} placeholder="Horário de Início (HH:MM)" onChangeText={(text) => handleChange("startTime", text)} />
      <TextInput style={styles.input} placeholder="Horário de Término (HH:MM)" onChangeText={(text) => handleChange("endTime", text)} />
      <TextInput style={styles.input} placeholder="Tema" onChangeText={(text) => handleChange("theme", text)} />
      <TextInput style={styles.input} placeholder="Público-alvo" onChangeText={(text) => handleChange("targetAudience", text)} />
      <TextInput style={styles.input} placeholder="Modalidade" onChangeText={(text) => handleChange("mode", text)} />
      <TextInput style={styles.input} placeholder="Ambiente" onChangeText={(text) => handleChange("environment", text)} />
      <TextInput style={styles.input} placeholder="Organizador" onChangeText={(text) => handleChange("organizer", text)} />
      <TextInput style={styles.input} placeholder="Recursos (separados por vírgula)" onChangeText={(text) => handleChange("resourcesDescription", text)} />
      <TextInput style={styles.input} placeholder="Forma de Divulgação" onChangeText={(text) => handleChange("disclosureMethod", text)} />
      <TextInput style={styles.input} placeholder="Disciplinas (separadas por vírgula)" onChangeText={(text) => handleChange("relatedSubjects", text)} />
      <TextInput style={styles.input} placeholder="Estratégia de Ensino" onChangeText={(text) => handleChange("teachingStrategy", text)} />
      <TextInput style={styles.input} placeholder="Autores (separados por vírgula)" onChangeText={(text) => handleChange("authors", text)} />
      <TextInput style={styles.input} placeholder="Vínculo Disciplinar" onChangeText={(text) => handleChange("disciplinaryLink", text)} />
      <TextInput style={styles.input} placeholder="Local do Evento" onChangeText={(text) => handleChange("locationName", text)} />
      <TextInput style={styles.input} placeholder="Andar do Local" onChangeText={(text) => handleChange("locationFloor", text)} />
      <TextInput style={styles.input} placeholder="Status do Evento" onChangeText={(text) => handleChange("status", text)} />
      <TextInput style={styles.input} placeholder="Prioridade" onChangeText={(text) => handleChange("priority", text)} />
      <TextInput style={styles.input} placeholder="Duração da Limpeza (min)" onChangeText={(text) => handleChange("cleanupDuration", text)} />
      <TextInput style={styles.input} placeholder="Observação" onChangeText={(text) => handleChange("observation", text)} />

      <Button title="Criar Evento" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default EventFormScreen;
