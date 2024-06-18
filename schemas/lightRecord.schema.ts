import mongoose, { Schema } from 'mongoose';
import { dbLightCollection } from '../utils';
import { ILightRecord } from '../interfaces';

const lightRecordSchema = new Schema<ILightRecord>({
  status: Boolean,
  lastTimestamp: String,
  userIds: [Number],
  ipToPing: { type: String, unique: true },
});

const LightRecords = mongoose.model(dbLightCollection, lightRecordSchema);

export default LightRecords;
