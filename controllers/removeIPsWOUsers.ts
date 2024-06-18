import { LightRecords } from '../schemas';
import { updateLightRecords } from '../utils';

const removeIPsWOUsers = async (): Promise<void> => {
  try {
    await LightRecords.deleteMany({
      userIds: { $size: 0 },
    });

    updateLightRecords();
  } catch {
    console.error('Failed to remove IPs without users');
  }
};

export default removeIPsWOUsers;
