import { useEffect } from 'react';

function PushNotificationRegistration() {
  useEffect(() => {
    const handlePermission = () => {
      window.clevertap.notifications.register();
    };

    window.clevertap.notifications.push(function() {
      clevertap.notifications.push({
        "type": "web",
        "titleText":'popupTitleText',
        "bodyText":'popupBodyText',
        "okButtonText":'okButtonText',
        "rejectButtonText":'rejectButtonText',
        "okButtonColor":'#00bfff',
        "askAgainTimeInSeconds":5
      });
    });

    window.addEventListener('notificationPermission', handlePermission);

    return () => {
      window.removeEventListener('notificationPermission', handlePermission);
    };
  }, []);

  return null;
}

export default PushNotificationRegistration;
