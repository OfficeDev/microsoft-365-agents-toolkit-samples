import {
  AdaptiveCard,
  VerticalBarChart,
  LineChart,
  HorizontalBarChart,
  PieChart,
  TextBlock,
  Table
} from '@microsoft/teams.cards';
import { cardAttachment, CardAttachmentTypes } from '@microsoft/teams.api';

export function generateChartCard(
  chartType: 'line' | 'verticalBar' | 'horizontalBar' | 'pie' | 'table',
  rows: any[][],
  options?: {
    title?: string;
    xAxisTitle?: string;
    yAxisTitle?: string;
    colorSet?: string;
    color?: string;
    showBarValues?: boolean;
  }
): CardAttachmentTypes['adaptive'] {
  const card = new AdaptiveCard();
  card.version = '1.5';

  console.log('Generating chart card:', chartType, rows, options);
  const {
    title = 'Chart',
    xAxisTitle = options?.xAxisTitle,
    yAxisTitle = options?.yAxisTitle,
    showBarValues
  } = options || {};

  let chart;
  if (chartType === 'verticalBar') {
    chart = new VerticalBarChart({
      title,
      xAxisTitle,
      yAxisTitle,
      showBarValues,
      data: rows.map(row => ({
        x: row[0],
        y: row[1],
      }))
    });
  } else if (chartType === 'line') {
    chart = new LineChart({
      title,
      xAxisTitle,
      yAxisTitle,
      data: [
        {
          legend: title,
          values: rows.map(row => ({
            x: row[0],
            y: row[1]
          })),
        }
      ]
    });
  } else if (chartType === 'horizontalBar') {
    chart = new HorizontalBarChart({
      title,
      xAxisTitle,
      yAxisTitle,
      data: rows.map(row => ({
        x: String(row[0]), // ensure x is always a string
        y: row[1],
      }))
    });
  } else if (chartType === 'pie') {
    chart = new PieChart({
      title,
      data: rows.map(row => ({
        legend: row[0],
        value: row[1],
      })),
      colorSet: "categorical"
    });
  } else if (chartType === 'table') {
    chart = new Table({
      firstRowAsHeaders: true,
      columns: rows.map(r => ({})), // let autoformatting handle column widths
      rows: rows.map(row => ({
        type: 'TableRow',
        cells: row.map((cell: any) => ({
          type: 'TableCell',
          items: [{ type: 'TextBlock', text: String(cell) }]
        }))
      }))
    });
  } else {
    throw new Error('Unsupported chart type');
  }

  card.body.push(new TextBlock(title, { weight: 'Bolder', size: 'Medium' }));
  card.body.push(chart);
  console.log('Generated card:', card);
  return cardAttachment('adaptive', card);
}
