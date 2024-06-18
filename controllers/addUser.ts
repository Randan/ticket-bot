import bot from '../bot';
import { checkIPFormat, updateLightRecords } from '../utils';
import { LightRecords } from '../schemas';
import { ILightRecord } from '../interfaces';

const addUser = async (id: number, ip?: string): Promise<void> => {
  try {
    if (!id) {
      console.error('User id is required');
      return;
    }

    if (!ip) {
      bot.sendMessage(id, 'Введіть адресу для відслідковування');
      return;
    }

    if (!checkIPFormat(ip)) {
      bot.sendMessage(id, 'Введіть коректну IP адресу');
      return;
    }

    const existingLightRecord: ILightRecord | null = await LightRecords.findOne(
      {
        ipToPing: ip,
      }
    );

    if (existingLightRecord && existingLightRecord.userIds.includes(id)) {
      bot.sendMessage(id, 'Ви вже відслідковуєте цю адресу.');
    } else if (existingLightRecord) {
      const updatedIds = new Array(
        new Set([...existingLightRecord.userIds, id])
      );

      await LightRecords.findOneAndUpdate(
        {
          ipToPing: ip,
        },
        {
          status: true,
          lastTimestamp: new Date().toISOString(),
          $push: { userIds: id },
        }
      );

      updateLightRecords();
      bot.sendMessage(id, 'Тепер ви відслідковуєте адресу ' + ip);
    } else {
      await LightRecords.create({
        status: true,
        lastTimestamp: new Date().toISOString(),
        userIds: [id],
        ipToPing: ip,
      });

      updateLightRecords();
      bot.sendMessage(id, 'Тепер ви відслідковуєте адресу ' + ip);
    }
  } catch (err) {
    console.error('Failed to add user', err);
  }
};

export default addUser;
