import { StyleSheet } from "react-native"

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    secondContainer: {
        flex: 1
    },
    imageAposta: {
        marginTop: 90,
        width: 150,
        height: 150
    },
    title: {
        padding: 5,
        fontSize: 20
    },
    inputAndroid: {
        width: 350,
        height: 55,
        fontSize: 12,
        marginBottom: 5,
        paddingHorizontal: 1,
        paddingVertical: 1,
        borderWidth: 1,
        borderColor: "#0db337",
        borderRadius: 5,
        color: '#010A1C',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    button: {
        width: 350,
        height: 50,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
        justifyContent: 'center'
    },
    mainContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    secondContainer: {
        flex: 1,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        padding: 2
    },
    thirdContainer: {
        flex: 4,
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    forthContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tableRow: {
        width: 340,
        flexDirection: "row",    
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 7
    },
    image: {
        width: 65,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    text: {
        fontSize: 15,      
    },
    backButton: {
        width: 340,
        marginTop: 10,
        marginBottom: 10
    },
    tableStyle: {      
        alignItems: "center",
        alignContent: "center",
        justifyContent: "flex-start"
    },
    tableStyleEnd: {
        marginLeft: 18,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    headerTableText: {
        fontSize: 13,
    },
    headerTableTextEnd: {
        marginLeft: 65,
        fontSize: 13,
    },
})