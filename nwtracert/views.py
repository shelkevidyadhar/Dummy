from django.http import HttpResponse
from django.shortcuts import render
from .models import Db10
from .utils import gokul


def index(request):
    return HttpResponse('Welcome to Index page.. <br><br><a href="app/home">Home</a>')


def tracert(request):
    return render(request, 'tracert.html')


def map(request):
    return render(request, 'tracert_gmap.html')


def home(request):
    return HttpResponse('<h1> Welcome to nwsec class </h1>')


def ip2loc(request):
    #ip = '127.0.0.1'
    ip = request.GET.get('ip', '')
    print(ip)
    iplong = gokul.ip2long(ip)
    data = Db10.objects.filter(ipstart__lte=iplong).filter(ipend__gte=iplong)
    q = str(data[0]).split(',')
    ip += ',' + q[2] + "," + q[3]
    print(ip)
    return HttpResponse(ip)

 
def traceroute(request):
    domain = request.GET.get('ip', '')
    ips = gokul.trace(domain)
    return HttpResponse(ips)
