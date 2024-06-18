import mongoose from 'mongoose';
import bot from '../bot';
import { formatTime, dbMongooseUri } from '../utils';
import { LightRecords } from '../schemas';

const onLightStatusChange = async (
  ids: string[],
  timeStamp: string,
  isLightOn: boolean,
  ip: string
): Promise<void> => {
  const date = new Date(timeStamp);
  const now = new Date();
  const delta = now.getTime() - date.getTime();

  const timeFormatted = formatTime(delta);

  const message = isLightOn
    ? 'Світло увімкнене.\n' + 'Світла не було ' + timeFormatted
    : 'Світло вимкнене.\n' + 'Світло було ' + timeFormatted;

  ids.forEach((id) => bot.sendMessage(id, message));

  try {
    mongoose.connect(dbMongooseUri);

    await LightRecords.updateOne(
      { ipToPing: ip },
      { status: isLightOn, lastTimestamp: timeStamp }
    );
  } catch {
    console.error('Failed to update light status');
  }
};

export default onLightStatusChange;
