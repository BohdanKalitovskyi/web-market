from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order
from .serializers import OrderSerializer


def index(request):
    return render(request, 'store/index.html')

def payment_view(request):
    return render(request, 'store/payment.html')

class OrderCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
def orders_view(request):

    orders = Order.objects.all()
    return render(request, 'store/orders.html', {'orders': orders})