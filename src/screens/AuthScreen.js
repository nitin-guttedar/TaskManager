import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { dh, dw } from '../constants/Dimensions'
import { useNavigation } from '@react-navigation/native'

const AuthScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleText}>LOGIN</Text>
            <View style={styles.cardContainer}>
                <TextInput
                    placeholder='Email'
                    onChangeText={(text) => setEmail(text)}
                    style={styles.Input}
                />
                <TextInput
                    placeholder='Password'
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                    style={styles.Input}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('TaskList')}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default AuthScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    cardContainer: {
        // borderWidth: 1
    },
    titleText: {
        fontSize: 30,
        fontWeight: '700',
        color: '#000F28'
    },
    Input: {
        padding: dw / 20,
        height: dh / 15,
        width: dw / 1.3,
        backgroundColor: '#F7F8FA',
        marginVertical: 10,
        borderRadius: 5,
        color: 'black',
        paddingLeft: 10

    },
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: '#152E5C',
        padding: dw / 20,
        marginVertical: dh / 40,
        borderRadius: 7
    },
    buttonText: {
        fontSize: 15,
        color: 'white'
    }

})