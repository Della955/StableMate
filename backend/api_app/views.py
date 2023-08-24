from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import requests # <== import requests so we can utilize it within our CBV to make API calls
from requests_oauthlib import OAuth1
from dotenv import dotenv_values
import pprint 

# Create your views here.
class Noun_Project(APIView):
    def get(self, request):
        env = dotenv_values(".env") # sets the value of `env` to an OrderedDictionary
        # let's grab this body from the `get started` documentation from the NounAPI 
        auth = OAuth1(env.get("noun_project_key"), env.get("noun_secret_key")) #<== for now place your corresponding keys here
        endpoint = 'https://api.thenounproject.com/v2/icon/4412073' 
        pp = pprint.PrettyPrinter(indent=2, depth=2)
        response = requests.get(endpoint, auth=auth) # notice with axios we had to wait for the promise to be completed, with requests it know to pause the program and wait until it receives a response
        # print(response.content) # we can see that the content within this response comes back as a binary string lets fix that
        responseJSON = response.json() # by calling the .json() method we are turning this request into a Python Dictionary that we can manipulate
        pp.pprint(responseJSON)
        return Response(responseJSON['icon']['thumbnail_url'])

#generates a barn image
class Barn_image(APIView):
    def get(self, request):
        env = dotenv_values(".env") # sets the value of `env` to an OrderedDictionary
        auth = OAuth1(env.get("noun_project_key"), env.get("noun_secret_key")) #<== for now place your corresponding keys here
        endpoint = 'https://api.thenounproject.com/v2/icon/5966967' 
        pp = pprint.PrettyPrinter(indent=2, depth=2)
        response = requests.get(endpoint, auth=auth)
        responseJSON = response.json()
        pp.pprint(responseJSON)
        return Response(responseJSON['icon']['thumbnail_url'])
