import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { dh, dw } from '../constants/Dimensions'

const TaskCard = ({ title, description, priority, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <View style={styles.priorityRow}>
                        <Text style={styles.priorityLabel}>Priority :</Text>
                        <Text style={styles.priority}>  {priority}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default TaskCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        borderRadius: 7,
        padding: 10,
        width: dw / 1.3,
        minHeight: dh / 8,
        alignSelf: 'center',
        marginVertical: dh * 0.01
    },
    content: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 4,
    },
    title: {
        fontSize: 17,
        fontWeight: '500',
        color: '#000F28'
    },
    description: {
        fontSize: 14,
        color: 'black',
    },
    priorityRow: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    priorityLabel: {
        color: 'black',
    },
    priority: {
        fontSize: 13,
        fontWeight: '400',
        color: 'red',
        alignSelf: 'flex-end'
    }
})
