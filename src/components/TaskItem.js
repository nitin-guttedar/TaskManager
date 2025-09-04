import React from 'react';
import { Pressable, View, Text } from 'react-native';
import dayjs from 'dayjs';

const badgeColor = priority =>
  ({
    High: '#ff3b30',
    Medium: '#ff9500',
    Low: '#34c759',
  }[priority] || '#999');

export default function TaskItem({ task, onPress, onToggle, onDelete }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 14,
        backgroundColor: '#fff',
        marginBottom: 8,
        borderRadius: 12,
        elevation: 1,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Pressable
          onPress={onToggle}
          style={{
            width: 22,
            height: 22,
            borderRadius: 11,
            borderWidth: 2,
            borderColor: task.completed ? '#34c759' : '#999',
            backgroundColor: task.completed ? '#34c759' : 'transparent',
            marginRight: 12,
          }}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              textDecorationLine: task.completed ? 'line-through' : 'none',
            }}
          >
            {task.title}
          </Text>
          <Text style={{ fontSize: 12, opacity: 0.7 }}>
            Due {dayjs(task.dueDateISO).format('DD MMM, HH:mm')}
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
            backgroundColor: badgeColor(task.priority),
          }}
        >
          <Text style={{ fontSize: 12, color: '#fff' }}>{task.priority}</Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 8,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Pressable onPress={onDelete} style={{ padding: 6 }}>
          <Text style={{ color: '#ff3b30' }}>Delete</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
