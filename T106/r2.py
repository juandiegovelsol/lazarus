import pandas as pd
import folium

def load_weather_data(data):
    """Load weather data into a Pandas DataFrame."""
    return pd.DataFrame(data)

def calculate_average_temperature(df):
    """Calculate the average temperature from the weather data."""
    return df['temperature'].mean()

def calculate_average_humidity(df):
    """Calculate the average humidity from the weather data."""
    return df['humidity'].mean()

def create_weather_map(df):
    """Create a Folium map with weather data points."""
    # Create a base map centered on the US
    weather_map = folium.Map(location=[40, -100], zoom_start=4)
    
    # Add the satellite tile layer with proper attribution
    folium.TileLayer(
        tiles='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attr='Esri, Maxar, Earthstar Geographics, and the GIS User Community',
        name='Esri Satellite',
        overlay=False,
        control=True
    ).add_to(weather_map)
    
    # Add markers for each location
    for index, row in df.iterrows():
        # Split the location string and convert to floats
        coordinates = row['location'].split(', ')
        lat = float(coordinates[0])
        lon = float(coordinates[1])
        
        folium.Marker(
            location=[lat, lon],
            popup=f"Temperature: {row['temperature']}°C<br>Humidity: {row['humidity']}%",
            tooltip=f"Location: {lat}, {lon}"
        ).add_to(weather_map)
    
    return weather_map

# Example usage
if __name__ == "__main__":
    # Sample weather data
    data = [
        {"location": "37.7749, -122.4194", "timestamp": "2022-01-01 00:00:00", "temperature": 10.0, "humidity": None, "wind_speed": 5.0},
        {"location": "34.0522, -118.2437", "timestamp": "2022-01-01 00:00:00", "temperature": 15.0, "humidity": 50.0, "wind_speed": 3.0},
        {"location": "40.7128, -74.0060", "timestamp": "2022-01-01 00:00:00", "temperature": 8.0, "humidity": 70.0, "wind_speed": 4.0},
    ]
    
    # Load data into DataFrame
    df = load_weather_data(data)
    
    # Calculate averages using Pandas
    avg_temp = calculate_average_temperature(df)
    avg_humidity = calculate_average_humidity(df)
    
    print(f"Average Temperature: {avg_temp:.1f}°C")
    print(f"Average Humidity: {avg_humidity:.1f}%")
    
    # Create and save the map
    weather_map = create_weather_map(df)
    weather_map.save("weather_map.html")