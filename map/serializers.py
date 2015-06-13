from rest_framework import serializers
from map.models import Venue


class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = ('id', 'name', 'address', 'rating', 'price', 'lat', 'lng')
