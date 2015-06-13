from django.db import models

class Venue(models.Model):
    id = models.CharField(max_length=40, primary_key=True)
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    rating = models.IntegerField()
    price = models.IntegerField()
    lat = models.DecimalField(max_digits=10, decimal_places=8, default=0)
    lng = models.DecimalField(max_digits=10, decimal_places=8, default=0)