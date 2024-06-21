import bot from '../bot';
import { formatTime, localDbName } from '../utils';
import { LightRecords } from '../schemas';
import { ILightRecord } from '../interfaces';
import { setValue } from 'node-global-storage';

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

const onLightStatusChange = async (record: ILightRecord): Promise<void> => {
  const { lastTimestamp, status, userIds, ipToPing } = record;

  const delta = new Date().getTime() - new Date(lastTimestamp).getTime();
  const timeFormatted = formatTime(delta);

  const message = status
    ? '🟢 Світло увімкнене.\n' + ipToPing
     + '\nСвітла не було ' + timeFormatted
    : '🔴 Світло вимкнене.\n' + ipToPing
     + '\nСвітло було ' + timeFormatted;

  userIds.forEach((id: number) => bot.sendMessage(id, message));

  try {
    console.log({ status, lastTimestamp });
    await LightRecords.updateOne({ ipToPing }, { status, lastTimestamp });

    updateLightRecords();
  } catch {
    console.error('Failed to update light status');
  }
};

export default onLightStatusChange;
