import React from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStack } from './RootNavigation';
import TaskListScreen from '../screens/TaskListScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import AddEditTaskScreen from '../screens/AddEditTaskScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const isAuthenticated = useSelector(s => !!s.auth.token);

  if (!isAuthenticated) return <AuthStack />;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TaskList"
        component={TaskListScreen}
        options={{ title: 'Your Tasks' }}
      />
      <Stack.Screen
        name="AddEditTask"
        component={AddEditTaskScreen}
        options={{ title: 'Task' }}
      />
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetailScreen}
        options={{ title: 'Task Details' }}
      />
    </Stack.Navigator>
  );
}
