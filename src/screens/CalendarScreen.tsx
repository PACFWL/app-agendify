import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { AuthContext } from "../contexts/AuthContext";
import { getAllEvents } from "../api/event";
import { useNavigation } from "@react-navigation/native";


type EventType = {
  id: string;
  name: string;
  day: string; 
  startTime: string;
  endTime: string;
  mode: string;
  location: { name: string; floor: string };
};

const CalendarScreen = () => {
  const auth = useContext(AuthContext);
  const navigation = useNavigation();
  const [events, setEvents] = useState<EventType[]>([]); 
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [markedDates, setMarkedDates] = useState<{ [key: string]: { marked: boolean; dotColor: string } }>({});

  useEffect(() => {
    const fetchEvents = async () => {
      if (!auth?.user) return;
      try {
        const data: EventType[] = await getAllEvents(auth.user.token);
        setEvents(data);
        markEventDates(data);
      } catch (error) {
        console.error("Erro ao carregar eventos", error);
      }
    };
    fetchEvents();
  }, [auth]);

  
  const markEventDates = (events: EventType[]) => {
    let marks: { [key: string]: { marked: boolean; dotColor: string } } = {};
    events.forEach((event) => {
      marks[event.day] = { marked: true, dotColor: "blue" };
    });
    setMarkedDates(marks);
  };

 
  const eventsForSelectedDate = events.filter((event) => event.day === selectedDate);

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          ...markedDates,
          [selectedDate]: { selected: true, selectedColor: "blue" },
        }}
      />
      <Text style={styles.title}>Eventos do Dia</Text>
      <FlatList
        data={eventsForSelectedDate}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Text style={styles.eventName}>{item.name}</Text>
            <Text>{`${item.startTime} - ${item.endTime} - ${item.mode} - ${item.location.name} - ${item.location.floor}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  eventCard: { padding: 10, backgroundColor: "#ddd", marginVertical: 5, borderRadius: 5 },
  eventName: { fontSize: 16, fontWeight: "bold" },
});

export default CalendarScreen;
