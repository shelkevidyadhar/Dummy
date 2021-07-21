from django.conf.urls import url
import nwtracert

urlpatterns = [
	url(r'^tracert/', nwtracert.views.tracert, name='home'),
	url(r'^map/', nwtracert.views.map, name='map'),
		
	#services
	url(r'^location', nwtracert.views.ip2loc, name='location'),
	url(r'^tracedomain', nwtracert.views.traceroute, name='tracedomain'),
]

#