import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { dh, dw } from '../constants/Dimensions'

const TaskCard = ({ title, description, priority }) => {
    // dynamic color style based on priority
    const getPriorityColor = () => {
        switch (priority.toLowerCase()) {
            case 'high':
                return styles.priorityHigh
            case 'medium':
                return styles.priorityMedium
            case 'low':
                return styles.priorityLow
            default:
                return styles.priorityDefault
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <View style={styles.priorityRow}>
                    <Text style={styles.priorityLabel}>Priority :</Text>
                    <Text style={[styles.priority, getPriorityColor()]}>  {priority}</Text>
                </View>
            </View>
        </View >
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
        marginVertical: dh * 0.020
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
        marginVertical: dh * 0.01
    },
    priorityLabel: {
        color: 'black',
    },
    priority: {
        fontSize: 13,
        fontWeight: '400',
        alignSelf: 'flex-end'
    },

    // 🔥 new styles (added only)
    priorityHigh: {
        color: 'red',
    },
    priorityMedium: {
        color: 'orange',
    },
    priorityLow: {
        color: 'green',
    },
    priorityDefault: {
        color: 'gray',
    }
})
