from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.category_list, name='category-list'),
    path('products/', views.product_list, name='product-list'),
    path('products/<int:pk>/', views.product_detail, name='product-detail'),
    path('cart/', views.getCartItems, name='get-cart'),
    path('cart/add/', views.addToCart, name='add-to-cart'),
    path('cart/update/', views.updateCart, name='update-cart'),
    path('orders/', views.create_order, name='create-order'),
    path('profile/', views.profile, name='profile'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
]