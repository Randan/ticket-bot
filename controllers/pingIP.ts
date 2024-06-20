import ping from 'ping';
import { getValue } from 'node-global-storage';
import { ILightRecord } from '../interfaces';
import onLightStatusChange from './onLightStatusChange';
import { localDbName } from '../utils';

const pingIP = (): void => {
  const lightRecords: ILightRecord[] = getValue(localDbName);

  Object.values(lightRecords).forEach((record: ILightRecord) => {
    ping.sys.probe(record.ipToPing, isAlive => {
      if (record.status === isAlive) {
        return;
      }

      record.status = Boolean(isAlive);
      record.lastTimestamp = new Date().toISOString();

      onLightStatusChange(record);
    });
  });
};

export default pingIP;
