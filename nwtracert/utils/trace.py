import os
import sys
import re

ips = []
i =  0
if len(sys.argv) >= 2:
    domain = sys.argv[1]
else:
    domain = "coursera.org"

print("Performing Traceroute on " + domain + " ..\nKindly wait for few seconds....")
trace = os.popen("sudo traceroute " + domain).read()
for line in trace.split('\n'):
	ls = re.findall("\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}", line)
	if len(ls) > 0:
		print(ls[0])
		ips.append(ls[0])
		i += 1
   #print(line)

print(ips)	