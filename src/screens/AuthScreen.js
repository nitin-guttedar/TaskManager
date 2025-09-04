import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { login, signup } from '../store/authSlice';
const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

export default function AuthScreen() {
    const dispatch = useDispatch();
    const { loading } = useSelector(s => s.auth);

    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('eve.holt@reqres.in');
    const [password, setPassword] = useState('cityslicka');

    const onSubmit = async () => {
        if (!email || !password)
            return Alert.alert('Missing fields', 'Enter email & password');
        try {
            if (mode === 'login') {
                await dispatch(login({ email, password })).unwrap();
            } else {
                await dispatch(signup({ email, password })).unwrap();
            }
        } catch (e) {
            Alert.alert('Auth error', e?.error || 'Failed');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleText}>Task Manager</Text>
            <Text style={styles.subtitle}>
                {mode === 'login' ? 'Login to continue' : 'Create an account'}
            </Text>

            <View style={styles.cardContainer}>
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                />

                <TouchableOpacity style={styles.buttonContainer} onPress={onSubmit}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>
                            {mode === 'login' ? 'Login' : 'Sign Up'}
                        </Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}
                    style={styles.switchMode}
                >
                    <Text style={styles.switchText}>
                        {mode === 'login'
                            ? "Don't have an account? Sign up"
                            : 'Already have an account? Log in'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    cardContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 30,
        fontWeight: '700',
        color: '#000F28',
    },
    subtitle: {
        fontSize: 14,
        color: '#555',
        marginTop: 8,
    },
    input: {
        height: dh / 15,
        width: dw / 1.3,
        backgroundColor: '#F7F8FA',
        marginVertical: 10,
        borderRadius: 5,
        color: 'black',
        paddingLeft: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: '#152E5C',
        padding: dw / 20,
        marginVertical: dh / 40,
        borderRadius: 7,
        width: dw / 1.3,
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
        fontWeight: '600',
    },
    switchMode: {
        marginTop: 10,
    },
    switchText: {
        color: '#0066cc',
        fontSize: 14,
    },
});
