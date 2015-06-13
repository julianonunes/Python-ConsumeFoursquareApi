from django.shortcuts import render
from rest_framework import generics
from models import Venue
from serializers import VenueSerializer
import requests
import keyring

# Create your views here.
def index(request):
    return render(request, 'map/index.html', {})


class VenueList(generics.ListCreateAPIView):
    serializer_class = VenueSerializer

    def get_queryset(self):
        lat = self.kwargs['lat']
        lng = self.kwargs['lng']

        result = []

        r = requests.get(
            'https://api.foursquare.com/v2/venues/explore?section=food&ll={0},{1}&client_id={2}&client_secret={3}&v={4}'
            .format(
                lat,
                lng,
                keyring.get_password('WebApp', 'client_id'),
                keyring.get_password('WebApp', 'client_secret'),
                '20150608'))

        if r.status_code == 200:
            # Loop through results
            for item in r.json()['response']['groups'][0]['items']:
                json_venue = item['venue']
                if 'location' in json_venue and 'address' in json_venue['location']:
                    venue = Venue(
                        id=json_venue['id'],
                        name=json_venue['name'],
                        address=json_venue['location']['address'],
                        rating=json_venue['rating'],
                        price=json_venue['price']['tier'] if 'price' in json_venue else 0,
                        lat=json_venue['location']['lat'],
                        lng=json_venue['location']['lng'])

                    result.append(venue)

                    venue.save()

        queryset = result


class VenueDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Venue.objects.all
    serializer_class = VenueSerializer
