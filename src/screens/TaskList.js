import { Image, StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { dw } from '../constants/Dimensions'
import TaskCard from '../components/TaskCard'

const AddIcon = require('../assets/Add.png')

const TaskList = () => {
    const tasks = [
        { id: '1', title: 'Buy groceries', description: 'Milk, Bread, Eggs, Fruits', priority: 'high' },
        { id: '2', title: 'Finish project', description: 'Complete React Native task manager', priority: 'medium' },
        { id: '3', title: 'Workout', description: '1 hour at the gym', priority: 'low' },
        { id: '4', title: 'Call Mom', description: 'Weekly catch-up call', priority: 'high' },
        { id: '5', title: 'Read a book', description: 'Continue reading React Native guide', priority: 'medium' },
        { id: '6', title: 'Plan weekend', description: 'Decide on hiking trip', priority: 'low' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Tasks</Text>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskCard
                        title={item.title}
                        description={item.description}
                        priority={item.priority}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            />
            <Image
                source={AddIcon}
                style={styles.addIcon}
            />
        </SafeAreaView>
    )
}

export default TaskList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 30,
        color: '#000F28',
        fontWeight: "600",
        margin: dw / 20
    },
    addIcon: {
        width: 50,
        height: 50,
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 0,
        margin: dw / 10
    }
})
