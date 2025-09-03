import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { dh, dw } from '../constants/Dimensions'
import { SafeAreaView } from 'react-native-safe-area-context'
const backIcon = require('../assets/back.png')

const AddTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('2024-04-30');
    const [priority, setPriority] = useState('Low');

    const navigation = useNavigation()
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'white',
            padding: dw * 0.05,
        }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={backIcon} style={styles.backIcon} resizeMode="contain" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Task Details</Text>
            </View>
            <Text style={styles.header}>Add Task</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                placeholderTextColor="#888"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, { height: dh * 0.1 }]}
                placeholder="Description"
                placeholderTextColor="#888"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <View style={styles.row}>
                <Text style={styles.label}>Due Date</Text>
                <Text style={styles.value}>{dueDate}</Text>
            </View>
            <TouchableOpacity style={styles.row}>
                <Text style={styles.label}>Priority</Text>
                <Text style={styles.value}>{priority}  ›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default AddTask

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: '#E5E7EB',
    },
    backIcon: {
        width: dw / 18,
        height: dh / 35,
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000F28',
    },
    header: {
        fontSize: dw * 0.07,
        fontWeight: '600',
        color: '#000F28',
        marginBottom: dh * 0.03,
        flexDirection: 'row'
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: dw * 0.04,
        paddingVertical: dh * 0.015,
        fontSize: dw * 0.045,
        color: 'black',
        backgroundColor: '#F9F9F9',
        marginBottom: dh * 0.02,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: dw * 0.04,
        paddingVertical: dh * 0.018,
        backgroundColor: '#F9F9F9',
        marginBottom: dh * 0.02,
    },
    label: {
        fontSize: dw * 0.045,
        color: '#000F28',
    },
    value: {
        fontSize: dw * 0.045,
        color: '#000F28',
        fontWeight: '500',
    },
    saveButton: {
        marginTop: 'auto',
        backgroundColor: '#000F28',
        paddingVertical: dh * 0.02,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveText: {
        color: 'white',
        fontSize: dw * 0.05,
        fontWeight: '600',
    },
})