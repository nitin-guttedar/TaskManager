import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  StyleSheet,
} from 'react-native';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask, markReminderScheduled } from '../store/tasksSlice';
import {
  scheduleTaskReminder,
  cancelTaskReminder,
} from '../utils/notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dh, dw } from '../constants/Dimensions';

const backIcon = require('../assets/back.png');
const priorities = ['Low', 'Medium', 'High'];

export default function AddEditTaskScreen({ route, navigation }) {
  const editingId = route?.params?.id || null;
  const { tasks } = useSelector(s => s.tasks);
  const existing = useMemo(
    () => tasks.find(t => t.id === editingId),
    [tasks, editingId],
  );

  const [title, setTitle] = useState(existing?.title || '');
  const [description, setDescription] = useState(existing?.description || '');
  const [priority, setPriority] = useState(existing?.priority || 'Low');
  const [dueDate, setDueDate] = useState(
    existing?.dueDateISO
      ? dayjs(existing.dueDateISO).toDate()
      : dayjs().add(1, 'hour').toDate(),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      setShowTimePicker(true);
    }
    setDueDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || dueDate;
    setShowTimePicker(false);
    setDueDate(currentTime);
  };

  const save = () => {
    if (!title.trim()) {
      return Alert.alert('Validation', 'Title is required');
    }
    const dueISO = dayjs(dueDate).toISOString();

    if (editingId) {
      dispatch(
        editTask({
          id: editingId,
          updates: {
            title,
            description,
            priority,
            dueDateISO: dueISO,
            reminderScheduled: false,
          },
        }),
      );
      cancelTaskReminder(editingId);
      maybeScheduleReminder(editingId, title, dueISO);
    } else {
      const action = addTask({
        title,
        description,
        priority,
        dueDateISO: dueISO,
      });
      const result = dispatch(action);
      const id = result.payload.id;
      maybeScheduleReminder(id, title, dueISO);
    }
    navigation.goBack();
  };

  const maybeScheduleReminder = (id, taskTitle, dueISO) => {
    const dueAtMs = dayjs(dueISO).valueOf();
    if (dueAtMs <= Date.now()) return;
    scheduleTaskReminder({ id, title: taskTitle, dueAtMs });
    dispatch(markReminderScheduled(id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backIcon} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {editingId ? 'Edit Task' : 'Add Task'}
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: dh * 0.12 }]}
        placeholder="Description"
        placeholderTextColor="#888"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity
        style={styles.row}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.label}>Due Date</Text>
        <Text style={styles.value}>{dayjs(dueDate).format('YYYY-MM-DD HH:mm')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          const idx = priorities.indexOf(priority);
          const next = priorities[(idx + 1) % priorities.length];
          setPriority(next);
        }}
      >
        <Text style={styles.label}>Priority</Text>
        <Text style={styles.value}>{priority}  ›</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {showTimePicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={dueDate}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}

      {Platform.OS === 'ios' && showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="datetime"
          display="spinner"
          onChange={onDateChange}
        />
      )}
      <TouchableOpacity style={styles.saveButton} onPress={save}>
        <Text style={styles.saveText}>
          {editingId ? 'Save Changes' : 'Create Task'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: dw * 0.05,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    marginBottom: 20,
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
});
