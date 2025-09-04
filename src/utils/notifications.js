import { PermissionsAndroid, Platform } from 'react-native';
import { Notifications } from 'react-native-notifications';

const ANDROID_CHANNEL_ID = 'tasks_reminders';
const ANDROID_CHANNEL_NAME = 'Task Reminders';

export function initNotifications() {
  Notifications.registerRemoteNotifications();

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannel({
      channelId: ANDROID_CHANNEL_ID,
      name: ANDROID_CHANNEL_NAME,
      importance: 4,
      description: 'Reminders for due tasks',
      enableVibration: true,
      enableLights: true,
    });
  }

  Notifications.events().registerNotificationOpened(
    (notification, completion) => {
      completion();
    },
  );
}

export async function requestAndroidPostNotificationsPermission() {
  if (Platform.OS !== 'android') return true;
  try {
    const granted = await PermissionsAndroid.request(
      'android.permission.POST_NOTIFICATIONS',
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch {
    return false;
  }
}

export function scheduleTaskReminder({ id, title, dueAtMs }) {
  const payload = {
    taskId: id,
    screen: 'TaskDetail',
  };

  if (typeof Notifications.scheduleNotification === 'function') {
    return Notifications.scheduleNotification({
      identifier: `task-${id}`,
      title: 'Task due',
      body: `${title} is due now`,
      payload,
      android: {
        channelId: ANDROID_CHANNEL_ID,
        autoCancel: true,
        smallIcon: 'ic_launcher',
      },
      trigger: { type: 'timestamp', timestamp: dueAtMs },
    });
  }

  const delay = Math.max(0, dueAtMs - Date.now());
  setTimeout(() => {
    Notifications.postLocalNotification({
      title: 'Task due',
      body: `${title} is due now`,
      payload,
      android: { channelId: ANDROID_CHANNEL_ID },
    });
  }, delay);
}

export function cancelTaskReminder(id) {
  if (typeof Notifications.cancelScheduledNotification === 'function') {
    Notifications.cancelScheduledNotification(`task-${id}`);
  }
}
