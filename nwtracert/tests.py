from django.test import TestCase

from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
# from .models import Songs
# from .serializers import SongsSerializer

# # tests for views

# class GetAllSongsTest():

#     def test_get_all_songs(self):
#         client = APIClient()
#         response = self.client.get(
#             reverse("songs-all", kwargs={"version": "v1"})
#         )
#         # fetch the data from db
#         expected = Songs.objects.all()
#         serialized = SongsSerializer(expected, many=True)
#         self.assertEqual(response.data, serialized.data)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

