from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserSerializer

# Create your views here.


class RegisterView(CreateAPIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    queryset = User.objects.all()
    serializer_class = UserSerializer


class BlacklistRefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.data.get("refresh_token")
        token = RefreshToken(refresh_token)
        token.blacklist()
        print(token)
        return Response({"message": "Token has been blacklisted"}, status=200)


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response({"error": str(e)}, status=400)

        user = serializer.user  # access the user from serializer.
        return Response({
            "access": serializer.validated_data.get("access"),
            "refresh": serializer.validated_data.get("refresh"),
            # check if user exists.
            "username": user.username if user else None,
        }, status=200)
