import { FC } from 'react'
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'
import { useTheme } from '@mui/material'

interface EnergySavingChartProps {
  data: any[]
  labels: string[]
}

const EnergySavingChart: FC<EnergySavingChartProps> = ({ data: dataProp, labels, ...rest }) => {
  const theme = useTheme()

  const data = () => ({
    datasets: [
      {
        data: dataProp,
        borderWidth: 3,
        backgroundColor: 'transparent',
        borderColor: theme.colors.alpha.trueWhite[100],
        borderCapStyle: 'round',
        pointBorderWidth: 0,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
    labels,
  })

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    layout: {
      padding: 5,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      ],
    },
    tooltips: {
      enabled: true,
      mode: 'nearest',
      intersect: false,
      caretSize: 6,
      displayColors: false,
      yPadding: 8,
      xPadding: 16,
      borderWidth: 4,
      borderColor: theme.palette.common.black,
      backgroundColor: theme.palette.common.black,
      titleFontColor: theme.palette.common.white,
      bodyFontColor: theme.palette.common.white,
      footerFontColor: theme.palette.common.white,
      callbacks: {
        title: () => {},
        label: (tooltipItem: any) => `${tooltipItem.xLabel} savings: -${tooltipItem.yLabel} kW h`,
      },
    },
  }

  return (
    <div {...rest}>
      <Line data={data} options={options} />
    </div>
  )
}

EnergySavingChart.propTypes = {
  data: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
}

export default EnergySavingChart
