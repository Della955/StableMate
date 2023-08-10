from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import requests # <== import requests so we can utilize it within our CBV to make API calls
from requests_oauthlib import OAuth1
import pprint 
# Create your views here.
class Noun_Project(APIView):
    def get(self, request):
        # let's grab this body from the `get started` documentation from the NounAPI 
        auth = OAuth1("noun_project_key", "noun_secret_key") #<== for now place your corresponding keys here
        endpoint = f'https://api.thenounproject.com/v2/icon/1023751' 
        pp = pprint.PrettyPrinter(indent=2, depth=2)
        response = requests.get(endpoint, auth=auth) # notice with axios we had to wait for the promise to be completed, with requests it know to pause the program and wait until it receives a response
        # print(response.content) # we can see that the content within this response comes back as a binary string lets fix that
        responseJSON = response.json() # by calling the .json() method we are turning this request into a Python Dictionary that we can manipulate
        pp.pprint(responseJSON)
        return Response(responseJSON['icon']['icon_url'])
