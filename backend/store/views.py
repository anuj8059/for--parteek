from django.shortcuts import render
from .models import Category, Product, Order, OrderItem
from .serializer import CategorySerializer, ProductSerializer, OrderSerializer, OrderItemSerializer, RegisterSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Cart, CartItem
from .serializer import CartSerializer, CartItemSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.db import transaction
from django.shortcuts import get_object_or_404

# Create your views here.
@api_view(['GET'])
def category_list(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def product_detail(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=404)
    
    serializer = ProductSerializer(product)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCartItems(request):
    cart = get_object_or_404(Cart, user=request.user)
    cart_items = CartItem.objects.filter(cart=cart)
    serializer = CartItemSerializer(cart_items, many=True)
    return Response({'carts': serializer.data})

@api_view(['POST'])
def addToCart(request):
    product_id = request.data.get('product_id')
    product = get_object_or_404(Product, id=product_id)
    cart, created = Cart.objects.get_or_create(user=request.user)
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        cart_item.quantity += 1
        cart_item.save()
    serializer = CartItemSerializer(cart_item)
    return Response({'cartItem': serializer.data})

@api_view(['POST'])
def updateCart(request):
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity')
    cart = get_object_or_404(Cart, user=request.user)
    cart_item = get_object_or_404(CartItem, cart=cart, product=product_id)
    if quantity > 0:
        cart_item.quantity = quantity
        cart_item.save()
    else:
        cart_item.delete()
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@transaction.atomic
def create_order(request):

    cart = get_object_or_404(Cart, user=request.user)

    cart_items = CartItem.objects.filter(cart=cart)

    if not cart_items.exists():
        return Response({'error': 'Cart is empty'}, status=400)

    total_price = cart.total_price

    order = Order.objects.create(
        user=request.user,
        total_price=total_price
    )

    for item in cart_items:

        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price
        )

    cart_items.delete()

    return Response({
        "message": "Order created successfully",
        "order_id": order.id
    })

@api_view(["POST"])
def register(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created", "user": serializer.data['username']})

    return Response(serializer.errors , status=400)



@api_view(['POST'])
def login(request):

    print('login api hit')

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if not user:
        return Response({"error": "Invalid credentials"}, status=401)

    token, created = Token.objects.get_or_create(user=user)

    response = Response({"message": "Login successful"})

    response.set_cookie(
        key="auth_token",
        value=token.key,
        httponly=True,
        secure=False,   # development
        samesite="Lax",
        max_age=86400,
        path="/"
    )

    return response


@api_view(['POST'])
def logout(request):

    token = request.COOKIES.get("auth_token")

    if token:
        Token.objects.filter(key=token).delete()

    response = Response({"message": "Logged out"})
    response.delete_cookie("auth_token")

    return response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):

    return Response({
        "username": request.user.username
    })

