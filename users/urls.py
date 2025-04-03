from django.urls import path

from .views import CustomTokenObtainPairView, RegisterView, BlacklistRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", BlacklistRefreshView.as_view(), name="logout")
]
