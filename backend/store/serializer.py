from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Category, Product, Order, OrderItem, Cart, CartItem, UserProfile
from django.contrib.auth.models import User


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(ModelSerializer):
    category = CategorySerializer(read_only=True)
    class Meta:
        model = Product
        fields = '__all__'


class CartItemSerializer(ModelSerializer):
    product = ProductSerializer(read_only=True)
    class Meta:
        model = CartItem
        fields = '__all__'

class CartSerializer(ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    class Meta:
        model = Cart
        fields = '__all__'


class OrderItemSerializer(ModelSerializer):
    product = ProductSerializer(read_only=True)
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = '__all__'




class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    phone_number = serializers.CharField(write_only=True)
    address = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'phone_number', 'address']

    def create(self, validated_data):

        phone_number = validated_data.pop('phone_number')
        address = validated_data.pop('address')

        user = User.objects.create_user(**validated_data)

        UserProfile.objects.create(
            user=user,
            phone_number=phone_number,
            address=address
        )

        return user
