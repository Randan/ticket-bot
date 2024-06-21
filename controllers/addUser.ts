import { setValue } from 'node-global-storage';
import bot from '../bot';
import { checkIPFormat, localDbName, passphrase } from '../utils';
import { LightRecords } from '../schemas';
import { ILightRecord } from '../interfaces';

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

    const [ipAdress, password] = ip.split('-');

    if ((ipAdress.startsWith('192.168') && password === passphrase) || !ipAdress.startsWith('192.168')) {
      if (!checkIPFormat(ipAdress)) {
        bot.sendMessage(id, 'Введіть коректну IP адресу');
        return;
      }

      const existingLightRecord: ILightRecord | null =
        await LightRecords.findOne({
          ipToPing: ipAdress,
        });

      if (existingLightRecord && existingLightRecord.userIds.includes(id)) {
        bot.sendMessage(id, 'Ви вже відслідковуєте цю адресу.');
      } else if (existingLightRecord) {
        await LightRecords.findOneAndUpdate(
          {
            ipToPing: ipAdress,
          },
          {
            status: true,
            lastTimestamp: new Date(),
            $push: { userIds: id },
          }
        );

        updateLightRecords();
        bot.sendMessage(id, 'Тепер ви відслідковуєте адресу ' + ipAdress);
      } else {
        await LightRecords.create({
          status: true,
          lastTimestamp: new Date(),
          userIds: [id],
          ipToPing: ipAdress,
        });

        updateLightRecords();
        bot.sendMessage(id, 'Тепер ви відслідковуєте адресу ' + ipAdress);
      }
    } else {
      bot.sendMessage(id, '192.168.x.x можна відслідковувати тільки з паролем');
    }
  } catch (err) {
    console.error('Failed to add user', err);
  }
};

export default addUser;
