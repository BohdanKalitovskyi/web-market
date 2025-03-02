from django.db import models

class Order(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    address = models.TextField()
    phone = models.CharField(max_length=15)
    cart = models.JSONField(default=list)

    def __str__(self):
        return f"Order {self.id} - {self.name}"

