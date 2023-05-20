import { useState, useEffect } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import classNames from "classnames";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isExit, setIsExit] = useState(false);

  async function verifyAvaiableAuthentication() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    console.log(compatible);

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(
      types.map((type) => LocalAuthentication.AuthenticationType[type])
    );
  }

  async function handleAuthentication() {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
    console.log(isBiometricEnrolled);

    if (!isBiometricEnrolled) {
      return Alert.alert(
        "Autenticação",
        "Nenhuma biometria encontrada. Por favor, cadastre no dispositivo!"
      );
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Presença efetuada com biometria",
      fallbackLabel: "Biometria não reconhecida",
    });

    setIsAuthenticated(auth.success);
  }

  async function ExitAuthentication() {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
    console.log(isBiometricEnrolled);

    if (!isBiometricEnrolled) {
      return Alert.alert(
        "Autenticação",
        "Nenhuma biometria encontrada. Por favor, cadastre no dispositivo!"
      );
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Saida efetuada com biometria",
      fallbackLabel: "Biometria não reconhecida",
    });

    setIsExit(auth.success);
  }

  useEffect(() => {
    verifyAvaiableAuthentication();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require("./assets/lhvr.png")} />
      <Text style={styles.title}>
        Autenticação biométrica para controle de presença na escola
      </Text>
      <View style={styles.row}>
        <Text style={styles.titleStatus}>Presença:</Text>
        <Text style={isAuthenticated ? styles.statusOK : styles.statusFail}>
          {isAuthenticated ? "Efetuada" : "não efetuada"}{" "}
        </Text>
      </View>

      {isAuthenticated ? (
        <TouchableOpacity
          style={[styles.btn, styles.btnDanger]}
          onPress={ExitAuthentication}
        >
          <Text style={styles.textWhite}>Estou de saida</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.btn} onPress={handleAuthentication}>
          <Text style={styles.textWhite}>Minha presença</Text>
        </TouchableOpacity>
      )}
      <View style={[styles.row, styles.row]}>
        <Text>Aula 1:</Text>
        {isAuthenticated ? (
          <AntDesign name="checkcircle" size={18} color="green" />
        ) : (
          <AntDesign name="closecircle" size={18} color="red" />
        )}
      </View>

      <View style={styles.row}>
        <Text>Aula 2:</Text>
        {isAuthenticated ? (
          <AntDesign name="checkcircle" size={18} color="green" />
        ) : (
          <AntDesign name="closecircle" size={18} color="red" />
        )}
      </View>

      <View style={styles.row}>
        <Text>Aula 3:</Text>
        {isAuthenticated ? (
          <AntDesign name="checkcircle" size={18} color="green" />
        ) : (
          <AntDesign name="closecircle" size={18} color="red" />
        )}
      </View>

      <View style={styles.row}>
        <Text>Aula 4:</Text>
        {isAuthenticated ? (
          <AntDesign name="checkcircle" size={18} color="green" />
        ) : (
          <AntDesign name="closecircle" size={18} color="red" />
        )}
      </View>

      <View style={styles.row}>
        <Text>Aula 5:</Text>
        {isAuthenticated && !isExit ? (
          <AntDesign name="checkcircle" size={18} color="green" />
        ) : (
          <AntDesign name="closecircle" size={18} color="red" />
        )}
      </View>

      <View style={styles.row}>
        <Text>Aula 6:</Text>
        {isAuthenticated && !isExit ? (
          <AntDesign name="checkcircle" size={18} color="green" />
        ) : (
          <AntDesign name="closecircle" size={18} color="red" />
        )}
      </View>

      <View style={styles.row}>
        <Text>Aula 7:</Text>
        {isAuthenticated && !isExit ? (
          <AntDesign name="checkcircle" size={18} color="green" />
        ) : (
          <AntDesign name="closecircle" size={18} color="red" />
        )}
      </View>

      <View style={styles.row}>
        <Text>Aula 8:</Text>
        {isAuthenticated && !isExit ? (
          <AntDesign name="checkcircle" size={18} color="green" />
        ) : (
          <AntDesign name="closecircle" size={18} color="red" />
        )}
      </View>

      <View style={styles.row}>
        <Text>Aula 9:</Text>
        {isAuthenticated && !isExit ? (
          <AntDesign name="checkcircle" size={18} color="green" />
        ) : (
          <AntDesign name="closecircle" size={18} color="red" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 80,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 40,
  },
  img: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 18,
    marginHorizontal: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
  titleStatus: {
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
  statusOK: { color: "green", textTransform: "uppercase", fontWeight: "bold" },
  statusFail: { color: "red", textTransform: "uppercase", fontWeight: "bold" },
  btn: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "green",
    width: "80%",
    borderRadius: 7,
    marginHorizontal: 20,
  },
  textWhite: { color: "#fff" },
  btnDanger: {
    backgroundColor: "red",
  },
});
