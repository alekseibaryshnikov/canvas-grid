export type GridType = {
  columnDefinition: ColumnsDefinition;
  container: HTMLCanvasElement;
  style?: CSSStyleDeclaration;
};

export enum DataType {
  Object,
  Number,
  String,
  Date,
  SignedNumber,
}

export type Column = {
  key: string;
  type: DataType;
  title: string;
  visible?: boolean;
  style?: CSSStyleDeclaration;
};

export type ColumnsDefinition = {
  columns: Column[];
};

export type ColumnWithCoordinates = {
  x: number;
  y: number;
  width: number;
  height: number;
} & Column;

export enum MeasurementType {
  ABSOLUTE,
  RELATIVE,
}

export type MeasurementUnitType = {
  type: MeasurementType;
  value: number;
};
