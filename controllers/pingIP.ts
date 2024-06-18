import { ILightRecord } from '../interfaces';
import ping from 'ping';
import { getValue } from 'node-global-storage';
import onLightStatusChange from './onLightStatusChange';


const pingIP = () => {
  const lightRecords: ILightRecord[] = getValue('light');

  lightRecords.forEach((record: ILightRecord) => {
    ping.sys.probe(record.ipToPing, (isAlive) => {
      if (record.status === isAlive) {
        return;
      }

      onLightStatusChange({ ...record, status: Boolean(isAlive) });
    });
  });
};

export default pingIP;
