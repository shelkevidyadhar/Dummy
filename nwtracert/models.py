from django.db import models


class Db10(models.Model):
    ipstart = models.BigIntegerField(primary_key=True)
    ipend = models.BigIntegerField()
    country_code = models.CharField(max_length=10, blank=True, null=True)
    country = models.CharField(max_length=30, blank=True, null=True)
    region = models.CharField(max_length=30, blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    lat = models.CharField(max_length=30, blank=True, null=True)
    longi = models.CharField(max_length=30, blank=True, null=True)
    zip = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return "{},{},{},{}".format(self.ipstart, self.ipend, self.lat, self.longi)

    class Meta:
        managed = False
        db_table = 'db10'
