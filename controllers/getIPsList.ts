import bot from '../bot';
import { LightRecords } from '../schemas';
import { ILightRecord } from '../interfaces';

const getIPsList = async (id: number): Promise<void> => {
  try {
    if (!id) {
      console.error('User id is required');
      return;
    }

    const lightRecords: ILightRecord[] = await LightRecords.find({
      userIds: { $in: id },
    });

    if (lightRecords.length) {
      const ips = lightRecords.map((record) =>
        `${record.ipToPing} - ${record.status ? 'увімкнено' : 'вимкнено'}`
      ).join('\n');
      bot.sendMessage(id, 'Ви відслідковуєте наступні адреси:\n' + ips);
    } else {
      bot.sendMessage(id, 'Ви не відслідковуєте жодної адреси');
    }
  } catch (err) {
    console.error('Failed to get IP list', err);
  }
};

export default getIPsList;
