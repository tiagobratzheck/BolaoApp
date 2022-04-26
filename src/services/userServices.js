import db from './dbConnection'
import firebase from "firebase";

export const saveUser = (email, data) => {
    return new Promise((resolve, reject) => {
        db.collection("usuarios")
            .doc(email)
            .set(data)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const updateUser = (email, data) => {
    return new Promise((resolve, reject) => {
        db.collection("usuarios")
            .doc(email)
            .update(data)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const updateFieldUser = (email) => {
    return new Promise((resolve, reject) => {
        db.collection("usuarios")
            .doc(email)
            .update({
                fez_aposta: true
            })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getUser = (email) => {
    return new Promise((resolve, reject) => {
        db.collection("usuarios")
            .doc(email)
            .get()
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
    })
};

export const getImageProfileUser = (image) => {
    return new Promise((resolve, reject) => {
        firebase
            .storage()
            .ref(`imagens/${image}`)
            .getDownloadURL()
            .then((url) => {
                resolve(url)
            }).catch((err) => {
                reject(err)
            })
    })
}

const getPictureBlob = (imageUri) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {        
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', imageUri, true);
        xhr.send(null);
    });
};

export const saveImageProfileUser = async (imageName, url) => {
    let blob;
    try {
        blob = await getPictureBlob(url);
        const ref = firebase.storage().ref(`imagens/${imageName}`);
        const snapshot = await ref.put(blob);

        return await snapshot.ref.getDownloadURL();
                
    } catch (e) {
        console.log(e.message)
    } finally {
        blob.close();

    }
};

// deprecated function
//export const saveImageProfileUser = (imageName, url) => {
//    return new Promise((resolve, reject) => {
//        firebase
//            .storage()
//            .ref(`imagens/${imageName}`)
//            .put(url)
//            .then(() => {
//                resolve()
//            }).catch((err) => {
//                reject(err)
//            })
//    })
//}

export const saveUserBet = (email, data) => {
    return new Promise((resolve, reject) => {
        db.collection("apostas")
            .doc(email)
            .set(data)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getUserBet = (email) => {
    return new Promise((resolve, reject) => {
        db.collection("apostas")
            .doc(email)
            .get()
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
    })
};

export const getAllBets = () => {
    return new Promise((resolve, reject) => {
        db.collection("apostas")
            .get()
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
    })
}
