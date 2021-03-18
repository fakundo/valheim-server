import React, { useRef, useEffect } from 'react'
import { useTheme } from '@material-ui/core/styles'
import Chart from 'chart.js'

const defaultDataOptions = {
  data: new Array(30).fill(0),
  clip: 2,
  fill: false,
  borderWidth: 2,
}

export default ({ perf }) => {
  const theme = useTheme()
  const chartRef = useRef()
  const canvasRef = useRef()

  useEffect(() => {
    Chart.defaults.global.defaultFontSize = theme.typography.fontSize * 0.8
    Chart.defaults.global.defaultFontColor = theme.palette.text.secondary
    Chart.defaults.global.defaultFontFamily = theme.typography.fontFamily
    Chart.defaults.global.defaultFontWeight = theme.typography.fontWeightRegular

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: new Array(30).fill(''),
        datasets: [
          {
            ...defaultDataOptions,
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.main,
            label: 'CPU, %',
            yAxisID: 'cpu-axis',
          },
          {
            ...defaultDataOptions,
            borderColor: theme.palette.secondary.main,
            backgroundColor: theme.palette.secondary.main,
            label: 'Memory, MB',
            yAxisID: 'mem-axis',
          },
        ],
      },
      options: {
        responsive: true,
        animation: {
          duration: 0,
        },
        elements: {
          point: {
            radius: 0,
            borderWidth: 0,
            hitRadius: 10,
            hoverRadius: 3,
          },
        },
        tooltips: {
          caretSize: 0,
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              id: 'cpu-axis',
              position: 'left',
              gridLines: {
                display: false,
              },
              ticks: {
                min: 0,
                max: 100,
                maxTicksLimit: 6,
              },
              scaleLabel: {
                display: true,
                labelString: 'CPU, %',
                fontColor: theme.palette.primary.light,
              },
            },
            {
              id: 'mem-axis',
              position: 'right',
              gridLines: {
                display: false,
              },
              ticks: {
                min: 0,
                suggestedMax: 2000,
                maxTicksLimit: 6,
              },
              scaleLabel: {
                display: true,
                labelString: 'Memory, MB',
                fontColor: theme.palette.secondary.light,
              },
            },
          ],
        },
      },
    })
  }, [])

  useEffect(() => {
    const cpu = []
    const mem = []
    perf.forEach((val) => {
      cpu.push(val.CPU)
      mem.push(Math.round(val.MEM / 1024))
    })
    chartRef.current.data.datasets[0].data = cpu
    chartRef.current.data.datasets[1].data = mem
    chartRef.current.update()
  }, [perf])

  return (
    <canvas
      ref={canvasRef}
      style={{ transform: 'translateY(0)' }}
    />
  )
}
