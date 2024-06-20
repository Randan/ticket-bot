import bot from '../bot';
import { formatTime } from '../utils';
import { LightRecords } from '../schemas';
import { ILightRecord } from '../interfaces';

const onLightStatusChange = async (record: ILightRecord): Promise<void> => {
  const { lastTimestamp, status, userIds, ipToPing } = record;

  const date = new Date(lastTimestamp);
  const now = new Date();
  const delta = now.getTime() - date.getTime();

  const timeFormatted = formatTime(delta);

  const message = status
    ? '🟢 Світло увімкнене.\n' + ipToPing
    //  + '\nСвітла не було ' + timeFormatted
    : '🔴 Світло вимкнене.\n' + ipToPing;
    //  + '\nСвітло було ' + timeFormatted;

  userIds.forEach((id: number) => bot.sendMessage(id, message));

  try {
    console.log({ status, lastTimestamp });
    await LightRecords.updateOne({ ipToPing }, { status, lastTimestamp });
  } catch {
    console.error('Failed to update light status');
  }
};

export default onLightStatusChange;
