import { setValue } from 'node-global-storage';
import { ILightRecord } from '../interfaces';
import { LightRecords } from '../schemas';

const updateLightRecords = async (): Promise<void> => {
  try {
    setValue('light', []);

    const response: ILightRecord[] = await LightRecords.find({
      userIds: { $not: { $size: 0 } },
    });

    console.log(response);

    setValue('light', response);
  } catch (err) {
    console.error('Failed to update light records', err);
  }
};

export default updateLightRecords;
