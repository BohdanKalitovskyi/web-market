from django.urls import path
from . import views
from .views import OrderCreateView

urlpatterns = [
    path('', views.index, name='home'),
    path('payment/', views.payment_view, name='payment'),
    path('api/v1/orders/', OrderCreateView.as_view(), name='order-create'),
    path('orders/', views.orders_view, name='orders'),

]