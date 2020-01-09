import geopy
import pandas
from geopy.geocoders import Nominatim, GoogleV3

def main():
    io = pandas.read_csv('census.csv', index_col=None, header=0, sep=",")

    def get_latitude(x):
        return float(x.latitude)

    def get_longitude(x):
        return float(x.longitude)
    def get_geometry(x):
        return (float(x.longitude), float(x.latitude))

    geolocator = Nominatim(timeout=5)
    #geolocator = GoogleV3(timeout=5)
    # uncomment the geolocator you want to use
    io['City'] = "London"
    io['Country'] = "United Kingdom"
    io['Address'] = io['Area_Name'].map(str) + " " + io['City'].map(str) + " " + io['Country'].map(str)
    geometry = io['Address'].apply(geolocator.geocode)
    io['geometry'] = geometry.apply(get_geometry)
    io['latitude'] = geometry.apply(get_latitude)
    io['longitude'] = geometry.apply(get_longitude)

    io.to_csv("census_with_geom.csv")
    print(io.head())

if __name__ == "__main__":
    main()