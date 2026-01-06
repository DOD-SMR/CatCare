import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function PantallaDespedida(){

  return (
    <View style={styles.container}>
      <MaterialIcons name="pets" size={80} color="#FF6B6B" />
      <Text style={styles.texto}>¡Buen trabajo hoy! 🐾</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  texto: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginTop: 15,
    textAlign: "center"
  }
});
