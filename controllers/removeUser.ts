import bot from '../bot';
import { checkIPFormat, updateLightRecords } from '../utils';
import { LightRecords } from '../schemas';

const removeUser = async (id: number, ip?: string): Promise<void> => {
  if (!id) {
    console.error('User id is required');
    return;
  }

  try {
    if (ip && !checkIPFormat(ip)) {
      bot.sendMessage(id, 'Введіть коректну IP адресу');
      return;
    } else if (ip) {
      await LightRecords.findOneAndUpdate(
        {
          ipToPing: ip,
        },
        {
          $pull: { userIds: id },
        }
      );

      updateLightRecords();

      bot.sendMessage(id, 'Ви більше не відслідковуєте адресу ' + ip);
    } else {
      await LightRecords.updateMany(
        {
          userIds: { $in: id },
        },
        {
          $pull: { userIds: id },
        }
      );

      updateLightRecords();

      bot.sendMessage(id, 'Ви більше не відслідковуєте жодну адресу');
    }
  } catch {
    console.error('Failed to remove user');
  }
};

export default removeUser;
