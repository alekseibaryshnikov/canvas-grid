import { MeasurementUnitType, MeasurementType } from './types';

const getColumnMeasurementUnit = (
  value: string | undefined,
): MeasurementUnitType => ({
  type:
    value && value.indexOf('%') >= 0
      ? MeasurementType.RELATIVE
      : MeasurementType.ABSOLUTE,
  value: value ? parseInt(value.replace(/[/D]/gm, value)) : 0,
});

const getMeasurementValue = (
  measurementObject: MeasurementUnitType,
  containerSize: DOMRect,
): number =>
  measurementObject.type === MeasurementType.ABSOLUTE
    ? measurementObject.value
    : Math.round((measurementObject.value / 100) * containerSize.width);

export { getColumnMeasurementUnit, getMeasurementValue };
