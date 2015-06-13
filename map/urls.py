from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^api/@(?P<lat>(-)?\d{0,2}.(\d)*),(?P<lng>(-)?\d{0,2}.(\d)*)', views.VenueList.as_view()),
    url(r'^api/(?P<pk>[0-9a-zA-Z]+)/$', views.VenueDetails.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
