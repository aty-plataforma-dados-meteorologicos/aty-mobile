import json
import random

def generate_sensor(sensor_id):
    return {
        "id": sensor_id,
        "name": f"Sensor {sensor_id}",
        "unidadeMedida": random.choice(["Celsius", "mm/h", "m/s", "Pa"]),
        "valorMinimo": random.uniform(-20, 0),
        "valorMaximo": random.uniform(20, 100),
        "acuracia": round(random.uniform(0.1, 5), 2),
        "tipoSensor": random.choice(["Temperatura", "Precipitação", "Velocidade do Vento", "Pressão"])
    }

def generate_station(station_id):
    num_sensors = random.randint(5, 20)
    sensors = [generate_sensor(sensor_id) for sensor_id in range(1, num_sensors + 1)]
    
    is_private = random.choice([True, False])
    access_valid = random.choice([True, False]) if is_private else False
    
    return {
        "id": station_id,
        "name": f"Estação {station_id}",
        "latitude": round(random.uniform(-35, 5), 6),
        "longitude": round(random.uniform(-75, -30), 6),
        "alturaAMS": random.randint(50, 1500),
        "photo": None,
        "isFavorite": random.choice([True, False]),
        "isPrivate": is_private,
        "accessValid": access_valid,
        "sensors": sensors
    }

stations = [generate_station(station_id) for station_id in range(1, 41)]

with open("weatherstations.json", "w", encoding="utf-8") as outfile:
    json.dump(stations, outfile, indent=4, ensure_ascii=False)
