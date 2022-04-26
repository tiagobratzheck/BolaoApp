import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase";

export const login = (email, senha, checked) => {
    return new Promise((resolve, reject) => {
        if (!checked) {
            AsyncStorage.removeItem("email");
            AsyncStorage.removeItem("senha");
        }    
        firebase
            .auth()
            .signInWithEmailAndPassword(email, senha)
            .then(() => {
                if (checked) {
                    AsyncStorage.setItem("email", email);
                    AsyncStorage.setItem("senha", senha);
                }
                resolve();
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};

export const createUser = (email, password) => {
    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};

export const forgotPassword = (email) => {
    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};


export const logout = () => {
    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};
