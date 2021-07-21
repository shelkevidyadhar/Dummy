import socket
import struct
import os
import sys
import re


def ip2long(ip):
    packedIP = socket.inet_aton(ip)
    return struct.unpack("!L", packedIP)[0]


def long2ip(ip):
    return socket.inet_ntoa(struct.pack('!L', ip))


def trace(domain):
    ips = ""
    if not domain:
        return ips

    print("Performing Traceroute on " + domain + " ..\nKindly wait for few seconds....")
    trace_ = os.popen("sudo traceroute " + domain).read()
    for line in trace_.split('\n'):
        ls = re.findall("\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}", line)
        if len(ls) > 0:
            print(ls[0])
            ips += str(ls[0]) + ","
    # print(line)
    print(ips)
    return ips
