from django.contrib import admin
from .models import Order
import json

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'phone', 'created_at', 'cart_summary')
    list_filter = ('created_at',)
    search_fields = ('name', 'email')
    readonly_fields = ('created_at', 'cart_display') 
    fields = ('name', 'email', 'address', 'phone', 'cart_display', 'created_at') 

    def cart_summary(self, obj):
        cart = obj.cart
        if cart:
            return f"{len(cart)} items"
        return "Empty"
    cart_summary.short_description = "Cart"

    def cart_display(self, obj):
        return json.dumps(obj.cart, indent=2, ensure_ascii=False)
    cart_display.short_description = "Cart Contents"