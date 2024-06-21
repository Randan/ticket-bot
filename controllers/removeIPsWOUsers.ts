import { setValue } from 'node-global-storage';
import { ILightRecord } from '../interfaces';
import { LightRecords } from '../schemas';
import { localDbName } from '../utils';

const updateLightRecords = async (): Promise<void> => {
  try {
    const response: ILightRecord[] = await LightRecords.find({
      userIds: { $not: { $size: 0 } },
    });

    setValue(localDbName, response);
  } catch (err) {
    console.error('Failed to update light records', err);
  }
};

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
