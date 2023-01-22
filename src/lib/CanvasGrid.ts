import { ColumnsDefinition, ColumnWithCoordinates, GridType } from './types';
import { getColumnMeasurementUnit, getMeasurementValue } from './utils';

class CanvasGrid {
  private columnDefinition: ColumnsDefinition;
  private container: HTMLCanvasElement;
  private containerSize: DOMRect;
  private style?: CSSStyleDeclaration;

  constructor(args: GridType) {
    const { columnDefinition, container, style } = args;
    this.columnDefinition = columnDefinition;
    this.container = container;
    this.containerSize = this.container.getBoundingClientRect();
    this.style = style;
  }

  render = () => {
    if (!this.container.getContext) {
      throw Error('Canvas is unsopported on this client.');
    }

    const context = this.container.getContext('2d');

    if (!context) {
      throw Error('Canvas context is not found!');
    }

    this.drawHeader(context);
  };

  /**
   * Takes given columns definitions, calculate coordinates
   * and sizes for header cells.
   *
   * @returns ColumnsDefinition[]
   */
  private getHeader = () =>
    this.columnDefinition.columns.map((column, index, self) => {
      const previousItem = self[index - 1] as ColumnWithCoordinates;
      const [widthObject, heightObject] = [
        getColumnMeasurementUnit(column.style?.width),
        getColumnMeasurementUnit(column.style?.height),
      ];
      const width =
        index * getMeasurementValue(widthObject, this.containerSize);
      const height =
        index * getMeasurementValue(heightObject, this.containerSize);
      const x = previousItem?.width ?? 0;
      const y = previousItem?.height ?? 0;

      return { ...column, width, height, x, y };
    });

  /**
   * Draws a header for given columns defenitions.
   *
   * @param context CanvasRenderingContext2D
   */
  private drawHeader = (context: CanvasRenderingContext2D) => {
    const headerColumnsDef = this.getHeader();

    headerColumnsDef.forEach(column => {
      const { width, height, x, y } = column;
      const borderColor = this.style?.borderColor ?? 'black';
      const lineWidth = this.style?.borderWidth
        ? parseInt(this.style?.borderWidth)
        : 1;

      context.strokeStyle = borderColor;
      context.lineWidth = lineWidth;
      context.strokeRect(x, y, width, height);
    });
  };
}

export default CanvasGrid;
