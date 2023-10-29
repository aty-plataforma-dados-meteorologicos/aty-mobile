import React from 'react';
import { ScrollView, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import WeatherStationSensorData from "../../interfaces/weatherStation/WeatherStationSensorData";

type Props = {
    data: WeatherStationSensorData
};

export function Graph({ data }: Props) {

    const chartWidth = 1000; // Definindo uma largura fixa grande para o gráfico

    const processedData = data?.measurements?.map((item: { measurementValue: number, timeStamp: string }) => {
        const hour = new Date(item.timeStamp).getHours();
        return {
            x: `${hour}:00`,
            y: item.measurementValue,
        };
    }) || [];

    const labels = processedData.map(item => item.x);
    const values = processedData.map(item => item.y);

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <LineChart
                data={{
                    labels: labels,
                    datasets: [{
                        data: values,
                    }]
                }}
                width={chartWidth}
                height={220}
                chartConfig={{
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                onDataPointClick={({ index }) => {
                    Alert.alert(`Hora: ${labels[index]}`, `Valor: ${values[index]} ${data.sensor.measurementUnit}`);
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </ScrollView>
    );
}
