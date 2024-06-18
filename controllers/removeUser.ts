import mongoose from 'mongoose';
import bot from '../bot';
import { dbMongooseUri } from '../utils';
import { LightRecords } from '../schemas';

const removeUser = async (id: number, ip?: string): Promise<void> => {
  if (!id) {
    console.error('User id is required');
  }

  try {
    mongoose.connect(dbMongooseUri);

    if (ip) {
      await LightRecords.findOneAndUpdate(
        {
          ipToPing: ip,
        },
        {
          $pull: { userIds: id },
        }
      );

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

      bot.sendMessage(id, 'Ви більше не відслідковуєте жодну адресу');
    }
  } catch {
    console.error('Failed to remove user');
  }
};

export default removeUser;
