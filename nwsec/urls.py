from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from nwtracert import views

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^$', views.tracert, name='tracert'),
    path('', include('nwtracert.urls')),
]
