import React, { useMemo, useLayoutEffect, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTask,
  setFilters,
  sortInPlace,
  toggleComplete,
  clearSyncQueue,
} from '../store/tasksSlice';
import { logout } from '../store/authSlice';
import TaskItem from '../components/TaskItem';
import EmptyState from '../components/EmptyState';

import { dw } from '../constants/Dimensions';

const AddIcon = require('../assets/Add.png');

export default function TaskListScreen({ navigation }) {
  const dispatch = useDispatch();
  const { tasks, filters } = useSelector(s => s.tasks);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => dispatch(logout())} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const display = useMemo(() => {
    let list = tasks.slice();
    if (!filters.showCompleted) list = list.filter(t => !t.completed);
    if (filters.priority !== 'All')
      list = list.filter(t => t.priority === filters.priority);
    return list;
  }, [tasks, filters]);

  const onDelete = id => dispatch(deleteTask(id));
  const onToggle = id => dispatch(toggleComplete(id));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      <View style={styles.filtersRow}>
        <TouchableOpacity
          onPress={() =>
            dispatch(setFilters({ showCompleted: !filters.showCompleted }))
          }
          style={styles.filterBtn}
        >
          <Text style={styles.filterText}>
            {filters.showCompleted ? 'Hide Completed' : 'Show Completed'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            const next =
              { All: 'Low', Low: 'Medium', Medium: 'High', High: 'All' }[
              filters.priority
              ] || 'All';
            dispatch(setFilters({ priority: next }));
          }}
          style={styles.filterBtn}
        >
          <Text style={styles.filterText}>Priority: {filters.priority}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            const order = [
              'dueDateAsc',
              'dueDateDesc',
              'priority',
              'createdAt',
            ];
            const idx = order.indexOf(filters.sort);
            const next = order[(idx + 1) % order.length];
            dispatch(setFilters({ sort: next }));
            dispatch(sortInPlace());
          }}
          style={styles.filterBtn}
        >
          <Text style={styles.filterText}>Sort: {filters.sort}</Text>
        </TouchableOpacity>
      </View>
      {display.length === 0 ? (
        <EmptyState message="No tasks yet. Create one!" />
      ) : (
        <FlatList
          data={display}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onPress={() => navigation.navigate('TaskDetail', { id: item.id })}
              onToggle={() => onToggle(item.id)}
              onDelete={() => onDelete(item.id)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate('AddEditTask')}
        style={styles.addBtn}
      >
        <Image source={AddIcon} style={styles.addIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    color: '#000F28',
    fontWeight: '600',
    margin: dw / 20,
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: dw / 20,
    marginBottom: 10,
  },
  filterBtn: {
    padding: 6,
  },
  filterText: {
    fontSize: 14,
    color: '#152E5C',
  },
  logoutBtn: {
    marginRight: 12,
  },
  logoutText: {
    color: '#ff3b30',
    fontWeight: '500',
  },
  addBtn: {
    position: 'absolute',
    right: dw / 10,
    bottom: dw / 10,
  },
  addIcon: {
    width: 50,
    height: 50,
  },
});
