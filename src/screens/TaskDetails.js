import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { dh, dw } from '../constants/Dimensions'
import { useNavigation } from '@react-navigation/native'

const backIcon = require('../assets/back.png')

const TaskDetails = ({ route }) => {
    const { task } = route.params
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={backIcon} style={styles.backIcon} resizeMode="contain" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Task Details</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <Text style={styles.description}>{task.description}</Text>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Due Date</Text>
                        <Text style={styles.infoValue}>{task.dueDate || "N/A"}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Priority</Text>
                        <Text style={[styles.infoValue, styles.priority]}>{task.priority}</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton}>
                    <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TaskDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
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
    scrollContent: {
        padding: 20,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    taskTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000F28',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#4B5563',
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    infoLabel: {
        fontSize: 16,
        color: '#6B7280',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
    },
    priority: {
        color: 'red',
        fontWeight: '700',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: 'white',
        borderTopWidth: 0.5,
        borderTopColor: '#E5E7EB',
    },
    editButton: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: '#000F28',
        paddingVertical: 14,
        borderRadius: 10,
        marginRight: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 2,
    },
    deleteButton: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: 'red',
        paddingVertical: 14,
        borderRadius: 10,
        marginLeft: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 2,
    },
    editText: {
        color: '#000F28',
        fontSize: 16,
        fontWeight: '600',
    },
    deleteText: {
        color: 'red',
        fontSize: 16,
        fontWeight: '600',
    },
})
